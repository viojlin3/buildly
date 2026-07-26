import { defineLogicFunction } from 'twenty-sdk/define';
import { jsonSchemaToInputSchema } from 'twenty-sdk/logic-function';

import { REPORT_STATUS_FUNCTION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { reportAgentStatusInputSchema } from 'src/logic-functions/schemas/report-agent-status-input.schema';
import { reportAgentStatus } from 'src/logic-functions/utils/report-agent-status';

export default defineLogicFunction({
  universalIdentifier: REPORT_STATUS_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'report-agent-status',
  description:
    'Create or update an Agent Run, append a timestamped update, and refresh the agent and task status in the command center.',
  timeoutSeconds: 20,
  toolTriggerSettings: {
    inputSchema: reportAgentStatusInputSchema,
  },
  workflowActionTriggerSettings: {
    label: 'Report Agent Status',
    icon: 'IconActivityHeartbeat',
    inputSchema: jsonSchemaToInputSchema(reportAgentStatusInputSchema),
    outputSchema: [
      {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          agentId: { type: 'string' },
          runId: { type: 'string' },
          runExternalId: { type: 'string' },
          status: { type: 'string' },
          progress: { type: 'number' },
          occurredAt: { type: 'string' },
          registeredNewAgent: { type: 'boolean' },
        },
      },
    ],
  },
  handler: reportAgentStatus,
});
