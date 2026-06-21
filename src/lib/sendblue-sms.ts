'use server';

/**
 * @fileOverview Sendblue SMS / iMessage helpers.
 *
 * - sendSendblueMessage - Sends a single message through Sendblue.
 * - sendBulkSendblueMessages - Sends the same message to multiple recipients,
 *                              collecting per-recipient results.
 */

export interface SendblueMessageResult {
  phone: string;
  success: boolean;
  messageHandle?: string;
  service?: string;
  status?: string;
  error?: string;
}

export interface SendblueBulkResult {
  total: number;
  sent: number;
  failed: number;
  results: SendblueMessageResult[];
}

interface SendblueSendPayload {
  number: string;
  from_number: string;
  content: string;
  status_callback?: string;
  seat_id?: string;
}

interface SendblueSendResponse {
  account_email?: string;
  content?: string;
  from_number?: string;
  number?: string;
  is_outbound?: boolean;
  status?: string;
  message_handle?: string;
  service?: string;
  was_downgraded?: boolean;
  error?: string;
  [key: string]: unknown;
}

const SENDBLUE_API_BASE_URL = 'https://api.sendblue.com';

function getSendblueCredentials(): { apiKeyId: string; apiSecretKey: string } {
  const apiKeyId = process.env.SB_API_KEY_ID;
  const apiSecretKey = process.env.SB_API_SECRET_KEY;

  if (!apiKeyId || !apiSecretKey) {
    throw new Error('SB_API_KEY_ID and SB_API_SECRET_KEY must be configured in environment variables.');
  }

  return { apiKeyId, apiSecretKey };
}

function getSendblueFromNumber(): string {
  const fromNumber = process.env.SENDBLUE_FROM_NUMBER;
  if (!fromNumber) {
    throw new Error('SENDBLUE_FROM_NUMBER is not configured in environment variables.');
  }
  return fromNumber;
}

export async function sendSendblueMessage(
  to: string,
  content: string
): Promise<SendblueMessageResult> {
  const { apiKeyId, apiSecretKey } = getSendblueCredentials();
  const fromNumber = getSendblueFromNumber();

  const payload: SendblueSendPayload = {
    number: to,
    from_number: fromNumber,
    content,
  };

  try {
    const response = await fetch(`${SENDBLUE_API_BASE_URL}/api/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sb-api-key-id': apiKeyId,
        'sb-api-secret-key': apiSecretKey,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = (await response.json()) as SendblueSendResponse;

    if (!response.ok) {
      const errorBody = JSON.stringify(data);
      console.error(`Sendblue error (${response.status}) to ${to}: ${errorBody}`);
      return {
        phone: to,
        success: false,
        error: `Sendblue API returned ${response.status}: ${data.error || errorBody || response.statusText}`,
      };
    }

    return {
      phone: to,
      success: true,
      messageHandle: data.message_handle || undefined,
      service: data.service || undefined,
      status: data.status || undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to send message to ${to}:`, message);
    return {
      phone: to,
      success: false,
      error: message,
    };
  }
}

export interface SendblueRecipient {
  phone: string;
  message: string;
}

export async function sendBulkSendblueMessages(
  recipients: string[] | SendblueRecipient[]
): Promise<SendblueBulkResult> {
  const results: SendblueMessageResult[] = [];

  // Send sequentially to avoid rate limits and to get per-message feedback.
  for (const recipient of recipients) {
    const phone = typeof recipient === 'string' ? recipient : recipient.phone;
    const content = typeof recipient === 'string' ? '' : recipient.message;

    if (!content.trim()) {
      results.push({
        phone,
        success: false,
        error: 'Empty message content.',
      });
      continue;
    }

    const result = await sendSendblueMessage(phone, content);
    results.push(result);
  }

  return {
    total: results.length,
    sent: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
    results,
  };
}
