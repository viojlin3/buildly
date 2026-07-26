import { defineLogicFunction, type RoutePayload } from 'twenty-sdk/define';
import { Response } from 'twenty-sdk/logic-function';

import { CALDIY_WEBHOOK_FUNCTION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import {
  syncCalDiyBooking,
  verifyCalDiyWebhookSignature,
} from 'src/logic-functions/utils/sync-cal-diy-booking';

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const handler = async (event: RoutePayload): Promise<Response> => {
  const secret = process.env.CALDIY_WEBHOOK_SECRET?.trim();

  if (!secret) {
    return jsonResponse(
      {
        success: false,
        error:
          'CALDIY_WEBHOOK_SECRET is not configured in the Agent Command Center app settings.',
      },
      503,
    );
  }

  if (
    typeof event.rawBody !== 'string' ||
    !verifyCalDiyWebhookSignature({
      rawBody: event.rawBody,
      signature: event.headers['x-cal-signature-256'],
      secret,
    })
  ) {
    return jsonResponse(
      { success: false, error: 'Invalid Cal.diy webhook signature.' },
      401,
    );
  }

  try {
    return jsonResponse(await syncCalDiyBooking(event.body), 200);
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to synchronize the Cal.diy booking.',
      },
      400,
    );
  }
};

export default defineLogicFunction({
  universalIdentifier: CALDIY_WEBHOOK_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'cal-diy-booking-webhook',
  description:
    'Verify and synchronize Cal.diy booking webhooks into Scheduled Meetings.',
  timeoutSeconds: 20,
  handler,
  httpRouteTriggerSettings: {
    path: '/agent-command-center/cal-diy-webhook',
    httpMethod: 'POST',
    isAuthRequired: false,
    forwardedRequestHeaders: ['x-cal-signature-256'],
  },
});

