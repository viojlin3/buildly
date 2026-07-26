import { RestApiClient } from 'twenty-client-sdk/rest';

export const RUN_STATUSES = [
  'QUEUED',
  'RUNNING',
  'WAITING',
  'BLOCKED',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
] as const;

export type RunStatus = (typeof RUN_STATUSES)[number];

export type ReportAgentStatusInput = {
  agentKey: string;
  agentName?: string;
  agentRole?: string;
  model?: string;
  instructions?: string;
  runExternalId: string;
  status: RunStatus;
  message: string;
  progress?: number;
  taskId?: string;
  output?: string;
  error?: string;
  costUsd?: number;
  tokens?: number;
  metadata?: Record<string, unknown>;
  occurredAt?: string;
};

type RecordWithId = {
  id: string;
};

type ManagedAgentRecord = RecordWithId & {
  name?: string | null;
  key?: string | null;
  role?: string | null;
};

type AgentRunRecord = RecordWithId & {
  externalId?: string | null;
};

type RestListResponse<TRecord> = {
  data?: Record<string, TRecord[] | undefined>;
};

type RestMutationResponse<TRecord> = {
  data?: Record<string, TRecord | undefined>;
};

export type ReportAgentStatusResult = {
  success: true;
  agentId: string;
  runId: string;
  runExternalId: string;
  status: RunStatus;
  progress: number | null;
  occurredAt: string;
  registeredNewAgent: boolean;
};

const AGENT_KEY_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
const RUN_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getRecords = <TRecord>(
  response: RestListResponse<TRecord>,
  objectNamePlural: string,
): TRecord[] => response.data?.[objectNamePlural] ?? [];

const getMutationRecord = <TRecord>(
  response: RestMutationResponse<TRecord>,
): TRecord | undefined => {
  const records = Object.values(response.data ?? {});

  return records[0];
};

const clampProgress = (progress: number | undefined): number | undefined => {
  if (progress === undefined || !Number.isFinite(progress)) {
    return undefined;
  }

  return Math.min(100, Math.max(0, Math.round(progress)));
};

const isRunStatus = (value: unknown): value is RunStatus =>
  typeof value === 'string' &&
  RUN_STATUSES.includes(value.toUpperCase() as RunStatus);

export const parseReportAgentStatusInput = (
  value: unknown,
): ReportAgentStatusInput => {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Request body must be a JSON object.');
  }

  const input = value as Record<string, unknown>;
  const agentKey =
    typeof input.agentKey === 'string' ? input.agentKey.trim().toLowerCase() : '';
  const runExternalId =
    typeof input.runExternalId === 'string' ? input.runExternalId.trim() : '';
  const message =
    typeof input.message === 'string' ? input.message.trim() : '';

  if (!AGENT_KEY_PATTERN.test(agentKey)) {
    throw new Error(
      'agentKey must contain only lowercase letters, numbers, and hyphens.',
    );
  }

  if (!RUN_ID_PATTERN.test(runExternalId)) {
    throw new Error(
      'runExternalId must start with a letter or number and may contain dots, colons, underscores, and hyphens.',
    );
  }

  if (!isRunStatus(input.status)) {
    throw new Error(`status must be one of: ${RUN_STATUSES.join(', ')}.`);
  }

  if (message.length === 0 || message.length > 2_000) {
    throw new Error('message must contain between 1 and 2000 characters.');
  }

  const taskId =
    typeof input.taskId === 'string' && input.taskId.trim().length > 0
      ? input.taskId.trim()
      : undefined;

  if (taskId !== undefined && !UUID_PATTERN.test(taskId)) {
    throw new Error('taskId must be a valid UUID.');
  }

  const optionalString = (
    key:
      | 'agentName'
      | 'agentRole'
      | 'model'
      | 'instructions'
      | 'output'
      | 'error'
      | 'occurredAt',
  ) =>
    typeof input[key] === 'string' && input[key].trim().length > 0
      ? input[key].trim()
      : undefined;

  const optionalNumber = (key: 'progress' | 'costUsd' | 'tokens') =>
    typeof input[key] === 'number' && Number.isFinite(input[key])
      ? input[key]
      : undefined;

  const occurredAt = optionalString('occurredAt');
  const agentName = optionalString('agentName');
  const agentRole = optionalString('agentRole');
  const model = optionalString('model');
  const instructions = optionalString('instructions');

  if (occurredAt !== undefined && Number.isNaN(Date.parse(occurredAt))) {
    throw new Error('occurredAt must be a valid ISO date-time.');
  }

  if (agentName !== undefined && agentName.length > 120) {
    throw new Error('agentName must not exceed 120 characters.');
  }

  if (agentRole !== undefined && agentRole.length > 120) {
    throw new Error('agentRole must not exceed 120 characters.');
  }

  if (model !== undefined && model.length > 200) {
    throw new Error('model must not exceed 200 characters.');
  }

  if (instructions !== undefined && instructions.length > 10_000) {
    throw new Error('instructions must not exceed 10000 characters.');
  }

  return {
    agentKey,
    agentName,
    agentRole,
    model,
    instructions,
    runExternalId,
    status: input.status.toUpperCase() as RunStatus,
    message,
    progress: clampProgress(optionalNumber('progress')),
    taskId,
    output: optionalString('output'),
    error: optionalString('error'),
    costUsd: optionalNumber('costUsd'),
    tokens: optionalNumber('tokens'),
    metadata:
      typeof input.metadata === 'object' && input.metadata !== null
        ? (input.metadata as Record<string, unknown>)
        : undefined,
    occurredAt,
  };
};

const findOne = async <TRecord>(
  client: RestApiClient,
  path: string,
  objectNamePlural: string,
  filter: string,
): Promise<TRecord | undefined> => {
  const response = await client.get<RestListResponse<TRecord>>(path, {
    query: { filter, limit: 1 },
  });

  return getRecords(response, objectNamePlural)[0];
};

const statusToAgentStatus = (status: RunStatus) => {
  switch (status) {
    case 'RUNNING':
      return 'WORKING';
    case 'QUEUED':
    case 'WAITING':
      return 'WAITING';
    case 'BLOCKED':
      return 'BLOCKED';
    case 'FAILED':
      return 'ERROR';
    case 'COMPLETED':
    case 'CANCELLED':
      return 'IDLE';
  }
};

const statusToTaskStatus = (status: RunStatus) => {
  switch (status) {
    case 'QUEUED':
      return 'READY';
    case 'RUNNING':
      return 'IN_PROGRESS';
    case 'WAITING':
      return 'WAITING';
    case 'BLOCKED':
    case 'FAILED':
      return 'BLOCKED';
    case 'COMPLETED':
      return 'DONE';
    case 'CANCELLED':
      return 'CANCELLED';
  }
};

const statusToUpdateType = (status: RunStatus) => {
  switch (status) {
    case 'BLOCKED':
      return 'BLOCKER';
    case 'FAILED':
      return 'ERROR';
    case 'COMPLETED':
      return 'DELIVERABLE';
    case 'QUEUED':
    case 'RUNNING':
    case 'WAITING':
    case 'CANCELLED':
      return 'STATUS';
  }
};

const isTerminalStatus = (status: RunStatus) =>
  ['COMPLETED', 'FAILED', 'CANCELLED'].includes(status);

const formatAgentName = (agentKey: string) =>
  agentKey
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');

export const reportAgentStatus = async (
  rawInput: unknown,
  client = new RestApiClient(),
): Promise<ReportAgentStatusResult> => {
  const input = parseReportAgentStatusInput(rawInput);
  const occurredAt = input.occurredAt ?? new Date().toISOString();
  const progress =
    input.status === 'COMPLETED' ? 100 : (input.progress ?? null);

  let agent = await findOne<ManagedAgentRecord>(
    client,
    '/rest/managedAgents',
    'managedAgents',
    `key[eq]:"${input.agentKey}"`,
  );
  const registeredNewAgent = agent === undefined;

  if (!agent) {
    const createAgentResponse = await client.post<
      RestMutationResponse<ManagedAgentRecord>
    >('/rest/managedAgents', {
      name: input.agentName ?? formatAgentName(input.agentKey),
      key: input.agentKey,
      role: input.agentRole ?? 'Custom',
      status: statusToAgentStatus(input.status),
      currentActivity: input.message,
      progress,
      currentRunExternalId: input.runExternalId,
      lastHeartbeatAt: occurredAt,
      model: input.model,
      instructions: input.instructions,
    });

    agent = getMutationRecord(createAgentResponse);
  }

  if (!agent) {
    throw new Error('Twenty did not return the newly registered agent.');
  }

  let run = await findOne<AgentRunRecord>(
    client,
    '/rest/agentRuns',
    'agentRuns',
    `externalId[eq]:"${input.runExternalId}"`,
  );

  const runPayload: Record<string, unknown> = {
    status: input.status,
    lastHeartbeatAt: occurredAt,
    progress,
    currentAction: input.message,
    output: input.output,
    error: input.error,
    costUsd: input.costUsd,
    tokens: input.tokens,
    agentId: agent.id,
    taskId: input.taskId,
    ...(isTerminalStatus(input.status) ? { endedAt: occurredAt } : {}),
  };

  if (!run) {
    const createResponse = await client.post<
      RestMutationResponse<AgentRunRecord>
    >('/rest/agentRuns', {
      name: `${agent.name ?? input.agentKey} — ${input.runExternalId}`,
      externalId: input.runExternalId,
      startedAt: occurredAt,
      ...runPayload,
    });

    run = getMutationRecord(createResponse);
  } else {
    const updateResponse = await client.patch<
      RestMutationResponse<AgentRunRecord>
    >(`/rest/agentRuns/${run.id}`, runPayload);

    run = getMutationRecord(updateResponse) ?? run;
  }

  if (!run) {
    throw new Error('Twenty did not return the created or updated Agent Run.');
  }

  await client.post('/rest/agentUpdates', {
    name: `${agent.name ?? input.agentKey} · ${input.status.toLowerCase()}`,
    type: statusToUpdateType(input.status),
    message: input.message,
    occurredAt,
    progress,
    metadata: input.metadata,
    runId: run.id,
  });

  await client.patch(`/rest/managedAgents/${agent.id}`, {
    ...(input.agentName ? { name: input.agentName } : {}),
    ...(input.agentRole ? { role: input.agentRole } : {}),
    ...(input.model ? { model: input.model } : {}),
    ...(input.instructions ? { instructions: input.instructions } : {}),
    status: statusToAgentStatus(input.status),
    currentActivity: input.message,
    progress,
    currentRunExternalId: input.runExternalId,
    lastHeartbeatAt: occurredAt,
  });

  if (input.taskId) {
    await client.patch(`/rest/agentTasks/${input.taskId}`, {
      status: statusToTaskStatus(input.status),
      progress,
      blockedReason:
        input.status === 'BLOCKED' || input.status === 'FAILED'
          ? (input.error ?? input.message)
          : null,
      result: input.status === 'COMPLETED' ? input.output : undefined,
    });
  }

  return {
    success: true,
    agentId: agent.id,
    runId: run.id,
    runExternalId: input.runExternalId,
    status: input.status,
    progress,
    occurredAt,
    registeredNewAgent,
  };
};
