export type ManagedAgentRecord = {
  id: string;
  name?: string | null;
  key?: string | null;
  agentRole?: string | null;
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
  updateType?: string | null;
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

export type ScheduledMeetingRecord = {
  id: string;
  name?: string | null;
  bookingStatus?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  attendeeName?: string | null;
  attendeeEmail?: string | null;
  meetingUrl?: string | null;
  assignedAgent?: {
    id?: string | null;
    name?: string | null;
  } | null;
  agentTask?: {
    id?: string | null;
    name?: string | null;
  } | null;
};

export type CommandCenterData = {
  agents: ManagedAgentRecord[];
  tasks: AgentTaskRecord[];
  runs: AgentRunRecord[];
  updates: AgentUpdateRecord[];
  approvals: AgentApprovalRecord[];
  meetings: ScheduledMeetingRecord[];
};

export type RestListResponse<TRecord> = {
  data?: Record<string, TRecord[] | undefined>;
};
