import { NextResponse } from 'next/server';
import {
  createAdminSession,
  clearAdminSession,
  getClientIp,
  loginRateLimiter,
  RATE_LIMIT,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (!loginRateLimiter.isAllowed(ip, 60_000, RATE_LIMIT.loginPerIpPerMinute)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const submittedPassword = typeof body.password === 'string' ? body.password : '';
    const expectedPassword = process.env.ADMIN_SMS_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'Admin password is not configured.' },
        { status: 500 }
      );
    }

    if (submittedPassword !== expectedPassword) {
      return NextResponse.json(
        { error: 'Invalid password.' },
        { status: 401 }
        );
    }

    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed.' },
      { status: 500 }
    );
  }
}
