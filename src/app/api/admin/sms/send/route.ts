import { sendBulkSendblueMessages, SendblueRecipient } from '@/lib/sendblue-sms';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkSendQuota,
  E164_PHONE_REGEX,
  getClientIp,
  MAX_MESSAGE_LENGTH,
  RATE_LIMIT,
  requireAdminSession,
  sanitizeSmsText,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const SendSMSRequestSchema = z.object({
  items: z.array(
    z.object({
      phone: z.string().regex(E164_PHONE_REGEX, 'Invalid phone number format.'),
      message: z.string().min(1).max(MAX_MESSAGE_LENGTH, 'Message is too long.'),
    })
  )
    .min(1, 'At least one recipient is required.')
    .max(RATE_LIMIT.maxRecipientsPerRequest, `Maximum ${RATE_LIMIT.maxRecipientsPerRequest} recipients per request.`),
});

export async function POST(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = SendSMSRequestSchema.parse(body);
    const ip = getClientIp(request);
    const count = parsed.items.length;

    const quota = checkSendQuota(ip, count);
    if (!quota.allowed) {
      return NextResponse.json(
        { error: `SMS send quota exceeded for the ${quota.window}. Please wait or contact support.` },
        { status: 429 }
      );
    }

    const recipients: SendblueRecipient[] = parsed.items.map((item) => ({
      phone: item.phone,
      message: sanitizeSmsText(item.message),
    }));

    const result = await sendBulkSendblueMessages(recipients);
    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    const status = 500;
    console.error('Error sending SMS:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status });
  }
}
