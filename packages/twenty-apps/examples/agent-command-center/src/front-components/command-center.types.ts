export type ManagedAgentRecord = {
  id: string;
  name?: string | null;
  key?: string | null;
  role?: string | null;
  status?: string | null;
  currentActivity?: string | null;
  progress?: number | null;
  currentRunExternalId?: string | null;
  lastHeartbeatAt?: string | null;
  model?: string | null;
};

export type AgentTaskRecord = {
  id: string;
  name?: string | null;
  status?: string | null;
  progress?: number | null;
};

export type AgentRunRecord = {
  id: string;
  name?: string | null;
  externalId?: string | null;
  status?: string | null;
  progress?: number | null;
  currentAction?: string | null;
  lastHeartbeatAt?: string | null;
};

export type AgentUpdateRecord = {
  id: string;
  name?: string | null;
  type?: string | null;
  message?: string | null;
  occurredAt?: string | null;
  progress?: number | null;
  run?: {
    id?: string | null;
    name?: string | null;
    externalId?: string | null;
  } | null;
};

export type AgentApprovalRecord = {
  id: string;
  name?: string | null;
  status?: string | null;
};

export type CommandCenterData = {
  agents: ManagedAgentRecord[];
  tasks: AgentTaskRecord[];
  runs: AgentRunRecord[];
  updates: AgentUpdateRecord[];
  approvals: AgentApprovalRecord[];
};

export type RestListResponse<TRecord> = {
  data?: Record<string, TRecord[] | undefined>;
};

