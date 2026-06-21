import { getAcuityContacts } from '@/lib/acuity-contacts';
import { NextResponse } from 'next/server';
import {
  contactsRateLimiter,
  getClientIp,
  RATE_LIMIT,
  requireAdminSession,
} from '@/lib/admin-auth';

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
    const { searchParams } = new URL(request.url);

    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    const daysBack = parseInt(searchParams.get('daysBack') || '90', 10);
    const limit = parseInt(searchParams.get('limit') || '1000', 10);

    const options: { year?: number; month?: number; daysBack?: number; limit?: number } = { daysBack, limit };

    if (yearParam && monthParam) {
      const year = parseInt(yearParam, 10);
      const month = parseInt(monthParam, 10);

      if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12) {
        return NextResponse.json({ error: 'Invalid year or month.' }, { status: 400 });
      }

      options.year = year;
      options.month = month;
    }

    const contacts = await getAcuityContacts(options);
    const response = NextResponse.json(contacts);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    console.error('Error fetching Acuity contacts:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
