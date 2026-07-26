import { defineLogicFunction, type RoutePayload } from 'twenty-sdk/define';
import { Response } from 'twenty-sdk/logic-function';

import { REPORT_STATUS_ROUTE_FUNCTION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { reportAgentStatus } from 'src/logic-functions/utils/report-agent-status';

const handler = async (event: RoutePayload): Promise<Response> => {
  try {
    const result = await reportAgentStatus(event.body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to report agent status.';

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export default defineLogicFunction({
  universalIdentifier: REPORT_STATUS_ROUTE_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'report-agent-status-http',
  description:
    'Authenticated HTTP endpoint for external agent runtimes to report run status and heartbeats.',
  timeoutSeconds: 20,
  handler,
  httpRouteTriggerSettings: {
    path: '/agent-command-center/report-status',
    httpMethod: 'POST',
    isAuthRequired: true,
  },
});
