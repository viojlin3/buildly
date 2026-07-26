import { type InputJsonSchema } from 'twenty-sdk/logic-function';

export const reportAgentStatusInputSchema: InputJsonSchema = {
  type: 'object',
  properties: {
    agentKey: {
      type: 'string',
      label: 'Agent key',
      description:
        'Stable command-center key, such as pm, ux-reviewer, legal, or qa-2.',
    },
    agentName: {
      type: 'string',
      label: 'Agent name',
      description:
        'Optional display name. Used when automatically registering a new agent.',
    },
    agentRole: {
      type: 'string',
      label: 'Agent role',
      description:
        'Optional free-form responsibility, such as Legal, Frontend, or QA.',
    },
    model: {
      type: 'string',
      label: 'Model',
      description: 'Optional model or runtime identifier for the agent.',
    },
    instructions: {
      type: 'string',
      label: 'Instructions',
      description:
        'Optional summary of the custom agent instructions or operating scope.',
    },
    runExternalId: {
      type: 'string',
      label: 'Run ID',
      description: 'Stable identifier for this execution instance.',
    },
    status: {
      type: 'string',
      label: 'Status',
      description:
        'QUEUED, RUNNING, WAITING, BLOCKED, COMPLETED, FAILED, or CANCELLED.',
    },
    message: {
      type: 'string',
      label: 'Update',
      description: 'A concise statement of what the agent is doing or produced.',
    },
    progress: {
      type: 'number',
      label: 'Progress',
      description: 'Completion percentage from 0 through 100.',
    },
    taskId: {
      type: 'string',
      label: 'Task ID',
      description: 'Optional Agent Task record ID associated with the run.',
    },
    output: {
      type: 'string',
      label: 'Output',
      description: 'Optional final or intermediate result.',
    },
    error: {
      type: 'string',
      label: 'Error',
      description: 'Optional failure or blocker detail.',
    },
    costUsd: {
      type: 'number',
      label: 'Cost (USD)',
      description: 'Optional cumulative model/tool cost for this run.',
    },
    tokens: {
      type: 'number',
      label: 'Tokens',
      description: 'Optional cumulative model token count.',
    },
  },
  required: ['agentKey', 'runExternalId', 'status', 'message'],
  additionalProperties: false,
};
