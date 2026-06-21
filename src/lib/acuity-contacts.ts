'use server';

/**
 * @fileOverview Acuity Scheduling contacts extraction.
 *
 * - getAcuityContacts - Fetches appointments from Acuity and deduplicates client records.
 */

import { fetchAcuityAPI, AcuityAppointment } from '@/ai/flows/acuity-booking-flow';
import { format, subDays, startOfMonth, endOfMonth, isValid, parseISO } from 'date-fns';

export interface AcuityContact {
  id: string;          // stable id derived from normalized phone
  firstName: string;
  lastName: string;
  phone: string;       // E.164 format, e.g. +15125551234
  email: string;
  lastAppointmentDate: string | null;
  /** Name of the appointment type of the most recent appointment. */
  lastAppointmentType: string | null;
  /** Acuity appointment type ID of the most recent appointment. */
  lastAppointmentTypeID: number | null;
}

function normalizeUSPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;

  // Strip everything that is not a digit.
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // International numbers with more digits are left untouched (E.164 already).
  if (digits.length >= 7) {
    return `+${digits}`;
  }

  return null;
}

function stableContactId(phone: string): string {
  return phone.replace(/\+/g, '').replace(/\D/g, '');
}

export interface GetAcuityContactsOptions {
  /**
   * Filter by a specific month. Provide year (e.g. 2025) and month (1-12).
   * When provided, daysBack is ignored.
   */
  year?: number;
  month?: number;
  /** Number of days back from today to look for appointments. Default 90. */
  daysBack?: number;
  /** Maximum number of appointments to fetch. Default 1000. */
  limit?: number;
}

function resolveDateRange(options: GetAcuityContactsOptions): { minDate: string; maxDate: string } {
  const today = new Date();

  if (options.year != null && options.month != null) {
    const year = options.year;
    const month = options.month;

    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12.');
    }

    const monthDate = parseISO(`${year}-${String(month).padStart(2, '0')}-01`);
    if (!isValid(monthDate)) {
      throw new Error(`Invalid year/month combination: ${year}-${month}.`);
    }

    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    return {
      minDate: format(start, 'yyyy-MM-dd'),
      maxDate: format(end, 'yyyy-MM-dd'),
    };
  }

  const daysBack = options.daysBack ?? 90;
  return {
    minDate: format(subDays(today, daysBack), 'yyyy-MM-dd'),
    maxDate: format(today, 'yyyy-MM-dd'),
  };
}

export async function getAcuityContacts(options: GetAcuityContactsOptions = {}): Promise<AcuityContact[]> {
  const { limit = 1000 } = options;

  const { minDate, maxDate } = resolveDateRange(options);

  const contactsByPhone = new Map<string, AcuityContact>();
  const contactsByEmail = new Map<string, AcuityContact>();
  let offset = 0;
  const pageSize = 1000;

  while (offset < limit) {
    const batchLimit = Math.min(pageSize, limit - offset);
    const endpoint = `/appointments?minDate=${minDate}&maxDate=${maxDate}&limit=${batchLimit}&offset=${offset}`;

    const data = await fetchAcuityAPI(endpoint);
    const appointments = Array.isArray(data) ? (data as AcuityAppointment[]) : [];

    if (appointments.length === 0) break;

    for (const appt of appointments) {
      const normalizedPhone = normalizeUSPhone(appt.phone);
      const email = (appt.email || '').toLowerCase().trim();

      if (!normalizedPhone && !email) continue;

      const contactId = normalizedPhone ? stableContactId(normalizedPhone) : email;
      const existingByPhone = normalizedPhone ? contactsByPhone.get(normalizedPhone) : undefined;
      const existingByEmail = email ? contactsByEmail.get(email) : undefined;
      const existing = existingByPhone || existingByEmail;

      const candidateDate = appt.date || null;
      const candidateType = appt.type || existing?.lastAppointmentType || null;
      const candidateTypeID = appt.appointmentTypeID ?? existing?.lastAppointmentTypeID ?? null;

      const shouldUpdate = !existing || (
        candidateDate && existing.lastAppointmentDate && candidateDate > existing.lastAppointmentDate
      ) || !existing.lastAppointmentDate;

      if (shouldUpdate) {
        const contact: AcuityContact = {
          id: contactId,
          firstName: appt.firstName || existing?.firstName || '',
          lastName: appt.lastName || existing?.lastName || '',
          phone: normalizedPhone || existing?.phone || '',
          email: email || existing?.email || '',
          lastAppointmentDate: candidateDate || existing?.lastAppointmentDate || null,
          lastAppointmentType: candidateType,
          lastAppointmentTypeID: candidateTypeID,
        };

        if (contact.phone) contactsByPhone.set(contact.phone, contact);
        if (contact.email) contactsByEmail.set(contact.email, contact);
      }
    }

    if (appointments.length < batchLimit) break;
    offset += batchLimit;
  }

  // Deduplicate by phone first; if the same email points to two phones, keep the one with the latest appointment.
  const uniqueByPhone = Array.from(contactsByPhone.values());
  const emailOnlyContacts = Array.from(contactsByEmail.values()).filter(c => !c.phone);

  return [...uniqueByPhone, ...emailOnlyContacts].sort((a, b) => {
    const dateA = a.lastAppointmentDate || '';
    const dateB = b.lastAppointmentDate || '';
    return dateB.localeCompare(dateA);
  });
}
