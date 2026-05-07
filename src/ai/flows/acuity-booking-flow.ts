'use server';
/**
 * @fileOverview Acuity Scheduling API interaction flow.
 *
 * - getAcuityAppointmentTypes - Fetches appointment types from Acuity.
 * - getAcuityAvailableDates - Fetches available dates for one or more appointment types.
 * - getAcuityAvailableTimes - Fetches available times for a primary appointment type on a specific date.
 * - createAcuityAppointment - Creates an appointment in Acuity.
 */

import { z } from 'zod';
import { format } from 'date-fns';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';

const ACUITY_API_BASE_URL = 'https://acuityscheduling.com/api/v1';
const ACUITY_USER_ID = process.env.ACUITY_USER_ID;
const ACUITY_API_KEY = process.env.ACUITY_API_KEY;

async function fetchAcuityAPI(endpoint: string, options: RequestInit = {}) {
  if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
    throw new Error('Acuity API credentials are not configured.');
  }

  const headers = new Headers(options.headers || {});
  const encodedCredentials = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString('base64');
  headers.set('Authorization', 'Basic ' + encodedCredentials);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${ACUITY_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Acuity API Error (${response.status}) on ${endpoint}: ${errorBody}`);
    throw new Error(`Acuity API request failed: ${response.statusText} - ${errorBody}`);
  }
  return response.json();
}

const AcuityFormFieldSchema = z.object({
  id: z.number(),
  name: z.string(),
  required: z.boolean(),
  type: z.string(),
  options: z.string().nullable().optional(),
});
export type AcuityFormField = z.infer<typeof AcuityFormFieldSchema>;

const AcuityFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional().default(""),
  hidden: z.boolean(),
  appointmentTypeIDs: z.array(z.number()),
  fields: z.array(AcuityFormFieldSchema),
});
export type AcuityForm = z.infer<typeof AcuityFormSchema>;

const AcuityAppointmentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional().default(""),
  price: z.string(),
  duration: z.number(),
  category: z.string().optional().default(""),
  color: z.string().optional(),
  private: z.boolean().optional(),
  image: z.string().nullable().optional(),
  addonIDs: z.array(z.number()).optional().default([]),
});
export type AcuityAppointmentType = z.infer<typeof AcuityAppointmentTypeSchema>;

const AcuityAddonSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.number(),
  price: z.string(),
  active: z.boolean(),
  private: z.boolean(),
});
export type AcuityAddon = z.infer<typeof AcuityAddonSchema>;

const AcuityAvailableTimeSchema = z.object({
  time: z.string(),
  slotsAvailable: z.number(),
  calendarID: z.number().optional(),
});
export type AcuityAvailableTime = z.infer<typeof AcuityAvailableTimeSchema>;

const AcuityPackageSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional().default(""),
  price: z.string(),
  kind: z.string(),
  isGiftCertificate: z.boolean(),
  image: z.string().nullable().optional(),
});
export type AcuityPackage = z.infer<typeof AcuityPackageSchema>;

const FormFieldValueSchema = z.object({
  id: z.number(),
  value: z.string(),
});

const CreateAcuityAppointmentInputSchema = z.object({
  appointmentTypeID: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  addonIDs: z.array(z.number()).optional(),
  calendarID: z.number().optional(),
  fields: z.array(FormFieldValueSchema).optional(),
});
export type CreateAcuityAppointmentInput = z.infer<typeof CreateAcuityAppointmentInputSchema>;

const AcuityAppointmentSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().nullable(),
  email: z.string(),
  date: z.string(),
  time: z.string(),
  endTime: z.string(),
  dateCreated: z.string(),
  datetime: z.string(),
  price: z.string(),
  paid: z.string(),
  amountPaid: z.string(),
  type: z.string(),
  appointmentTypeID: z.number(),
  classID: z.number().nullable(),
  addonIDs: z.array(z.number()),
  category: z.string(),
  duration: z.string(),
  calendar: z.string(),
  calendarID: z.number(),
  canClientCancel: z.boolean(),
  canClientReschedule: z.boolean(),
  location: z.string(),
  notes: z.string().nullable(),
  timezone: z.string(),
  calendarTimezone: z.string(),
  confirmationPage: z.string().url(),
  formsText: z.string().optional(),
});
export type AcuityAppointment = z.infer<typeof AcuityAppointmentSchema>;

export async function getAcuityAppointmentTypes(): Promise<AcuityAppointmentType[]> {
  const data = await fetchAcuityAPI('/appointment-types');
  return z.array(AcuityAppointmentTypeSchema).parse(data);
}

export async function getAcuityAddons(): Promise<AcuityAddon[]> {
  const data = await fetchAcuityAPI('/appointment-addons');
  return z.array(AcuityAddonSchema).parse(data);
}

export async function getAcuityPackages(): Promise<AcuityPackage[]> {
  const data = await fetchAcuityAPI('/products');
  return z.array(AcuityPackageSchema).parse(data);
}

export async function getAcuityForms(): Promise<AcuityForm[]> {
  const data = await fetchAcuityAPI('/forms');
  return z.array(AcuityFormSchema).parse(data);
}

const GetAcuityAvailableDatesInputSchema = z.object({
  appointmentTypeID: z.number().describe("Primary appointment type ID"),
  addonIDs: z.array(z.number()).optional().default([]),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be in YYYY-MM format"),
});
export type GetAcuityAvailableDatesInput = z.infer<typeof GetAcuityAvailableDatesInputSchema>;

export async function getAcuityAvailableDates(input: GetAcuityAvailableDatesInput): Promise<string[]> {
  const { appointmentTypeID, addonIDs, month } = GetAcuityAvailableDatesInputSchema.parse(input);

  let endpoint = `/availability/dates?month=${month}&appointmentTypeID=${appointmentTypeID}`;

  // Append addonIDs as query params for availability calculation
  addonIDs.forEach(id => {
    endpoint += `&addonIDs[]=${id}`;
  });

  console.log(`Requesting Acuity endpoint: ${endpoint}`);
  const data = await fetchAcuityAPI(endpoint);
  console.log('Data received from Acuity (raw):', JSON.stringify(data, null, 2));

  let datesToParse: string[] = [];

  if (Array.isArray(data)) {
    if (data.length === 0) {
      datesToParse = [];
    } else if (typeof data[0] === 'object' && data[0] !== null && 'date' in data[0]) {
      try {
        datesToParse = data.map(item => {
          if (typeof item.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
            return item.date;
          }
          throw new Error(`Invalid date object in Acuity response: ${JSON.stringify(item)}`);
        });
      } catch (e) {
        console.error("Error transforming Acuity data:", e);
        throw new Error(`Failed to transform Acuity date data: ${e instanceof Error ? e.message : String(e)}`);
      }
    } else {
      console.error('Unexpected array item structure from Acuity:', JSON.stringify(data[0], null, 2));
      throw new Error('Unexpected array item structure received from Acuity for dates.');
    }
    console.log('Transformed data for Zod parsing:', JSON.stringify(datesToParse, null, 2));
  } else {
    console.error('Unexpected data structure (not an array) from Acuity:', JSON.stringify(data, null, 2));
    throw new Error('Unexpected data structure (not an array) received from Acuity for dates.');
  }

  return z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).parse(datesToParse);
}


const GetAcuityAvailableTimesInputSchema = z.object({
  appointmentTypeID: z.number().describe("The primary appointment type ID to check availability for."),
  addonIDs: z.array(z.number()).optional().default([]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});
export type GetAcuityAvailableTimesInput = z.infer<typeof GetAcuityAvailableTimesInputSchema>;

export async function getAcuityAvailableTimes(input: GetAcuityAvailableTimesInput): Promise<AcuityAvailableTime[]> {
  const { appointmentTypeID, addonIDs, date } = GetAcuityAvailableTimesInputSchema.parse(input);

  let endpoint = `/availability/times?date=${date}&appointmentTypeID=${appointmentTypeID}`;

  addonIDs.forEach(id => {
    endpoint += `&addonIDs[]=${id}`;
  });

  const data = await fetchAcuityAPI(endpoint);
  return z.array(AcuityAvailableTimeSchema).parse(data);
}

/**
 * Resolves selected appointment types to their corresponding add-on IDs.
 * Acuity treats appointment types and add-ons as separate entities with different IDs.
 * This function maps secondary services to their add-on counterparts by name.
 */
export async function resolveBookingServices(serviceIds: number[]): Promise<{
  valid: boolean;
  primaryServiceId: number;
  addonIDs: number[];
  requiresEmbed: boolean;
}> {
  const [appointmentTypes, addons] = await Promise.all([
    getAcuityAppointmentTypes(),
    getAcuityAddons(),
  ]);

  const primaryService = appointmentTypes.find(t => t.id === serviceIds[0]);
  if (!primaryService) {
    return { valid: false, primaryServiceId: 0, addonIDs: [], requiresEmbed: true };
  }

  if (serviceIds.length === 1) {
    return { valid: true, primaryServiceId: primaryService.id, addonIDs: [], requiresEmbed: false };
  }

  // Build map of addon name (lowercase trimmed) -> addon ID
  const addonMap = new Map(
    addons
      .filter(a => a.active && !a.private)
      .map(a => [a.name.toLowerCase().trim(), a.id])
  );

  const addonIDs: number[] = [];
  let allFound = true;

  for (let i = 1; i < serviceIds.length; i++) {
    const service = appointmentTypes.find(t => t.id === serviceIds[i]);
    if (!service) {
      allFound = false;
      continue;
    }

    const addonId = addonMap.get(service.name.toLowerCase().trim());
    if (addonId) {
      addonIDs.push(addonId);
    } else {
      allFound = false;
    }
  }

  return {
    valid: allFound,
    primaryServiceId: primaryService.id,
    addonIDs,
    requiresEmbed: !allFound,
  };
}

export async function createAcuityAppointment(input: CreateAcuityAppointmentInput): Promise<AcuityAppointment> {
  const { appointmentTypeID, date, time, firstName, lastName, email, phone, notes, addonIDs, calendarID, fields } = CreateAcuityAppointmentInputSchema.parse(input);

  // Construct ISO 8601 datetime with America/Chicago timezone
  const dateTimeStr = `${date}T${time}:00`;
  const utcDate = fromZonedTime(dateTimeStr, 'America/Chicago');
  const isoDatetime = formatInTimeZone(utcDate, 'America/Chicago', "yyyy-MM-dd'T'HH:mm:ssXXX");

  const payload: any = {
    appointmentTypeID,
    datetime: isoDatetime,
    firstName,
    lastName,
    email,
    calendarID: calendarID ?? 10885204,
  };

  if (phone) {
    payload.phone = phone;
  }
  if (notes) {
    payload.notes = notes;
  }
  if (addonIDs && addonIDs.length > 0) {
    payload.addonIDs = addonIDs;
  }
  if (fields && fields.length > 0) {
    payload.fields = fields;
  }

  const data = await fetchAcuityAPI('/appointments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return AcuityAppointmentSchema.parse(data);
}
