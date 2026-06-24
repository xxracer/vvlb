import { NextResponse } from 'next/server';
import { getAcuityAppointmentTypes } from '@/ai/flows/acuity-booking-flow';
import { requireAdminSession, contactsRateLimiter, getClientIp, RATE_LIMIT } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(request);
  if (!contactsRateLimiter.isAllowed(ip, 60_000, RATE_LIMIT.contactsPerIpPerMinute)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please wait a minute.' }, { status: 429 });
  }

  try {
    const types = await getAcuityAppointmentTypes();
    const services = types
      .filter((t) => !t.private)
      .map((t) => ({ id: t.id, name: t.name, category: t.category }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const response = NextResponse.json(services);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    console.error('Error fetching Acuity appointment types:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
