'use server';

/**
 * @fileOverview Brevo (formerly Sendinblue) transactional SMS helpers.
 *
 * - sendBrevoSMS - Sends a single transactional SMS through Brevo.
 * - sendBulkBrevoSMS - Sends the same message to multiple recipients, collecting per-recipient results.
 */

export interface BrevoSMSResult {
  phone: string;
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface BrevoBulkSMSResult {
  total: number;
  sent: number;
  failed: number;
  results: BrevoSMSResult[];
}

interface BrevoSMSPayload {
  sender: string;
  recipient: {
    to: string;
  };
  content: string;
}

interface BrevoSMSResponse {
  reference?: string;
  messageId?: string;
  [key: string]: unknown;
}

const BREVO_API_BASE_URL = 'https://api.brevo.com/v3';

function getBrevoApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    throw new Error('BREVO_API_KEY is not configured in environment variables.');
  }
  return key;
}

function getSenderName(): string {
  return (process.env.SMS_SENDER_NAME || 'VivaLaBeauty').replace(/\s/g, '').slice(0, 11);
}

export async function sendBrevoSMS(to: string, content: string): Promise<BrevoSMSResult> {
  const apiKey = getBrevoApiKey();
  const sender = getSenderName();

  const payload: BrevoSMSPayload = {
    sender,
    recipient: { to },
    content,
  };

  try {
    const response = await fetch(`${BREVO_API_BASE_URL}/transactionalSMS/sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Brevo SMS error (${response.status}) to ${to}: ${errorBody}`);
      return {
        phone: to,
        success: false,
        error: `Brevo API returned ${response.status}: ${errorBody || response.statusText}`,
      };
    }

    const data = (await response.json()) as BrevoSMSResponse;
    return {
      phone: to,
      success: true,
      messageId: data.reference || data.messageId || undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to send SMS to ${to}:`, message);
    return {
      phone: to,
      success: false,
      error: message,
    };
  }
}

export async function sendBulkBrevoSMS(
  recipients: string[],
  content: string
): Promise<BrevoBulkSMSResult> {
  const results: BrevoSMSResult[] = [];

  // Send sequentially to avoid rate limits and to get per-message feedback.
  for (const phone of recipients) {
    const result = await sendBrevoSMS(phone, content);
    results.push(result);
  }

  return {
    total: results.length,
    sent: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results,
  };
}
