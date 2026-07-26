import { useCallback, useEffect, useState } from 'react';
import { RestApiClient } from 'twenty-client-sdk/rest';

import {
  type AgentApprovalRecord,
  type AgentRunRecord,
  type AgentTaskRecord,
  type AgentUpdateRecord,
  type CommandCenterData,
  type ManagedAgentRecord,
  type RestListResponse,
} from 'src/front-components/command-center.types';

const EMPTY_DATA: CommandCenterData = {
  agents: [],
  tasks: [],
  runs: [],
  updates: [],
  approvals: [],
};

const getRecords = <TRecord>(
  response: RestListResponse<TRecord>,
  objectNamePlural: string,
): TRecord[] => response.data?.[objectNamePlural] ?? [];

const toTimestamp = (value: string | null | undefined) => {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export const useCommandCenterData = () => {
  const [data, setData] = useState<CommandCenterData>(EMPTY_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    const client = new RestApiClient();

    try {
      const [agents, tasks, runs, updates, approvals] = await Promise.all([
        client.get<RestListResponse<ManagedAgentRecord>>(
          '/rest/managedAgents',
          { query: { limit: 60 } },
        ),
        client.get<RestListResponse<AgentTaskRecord>>('/rest/agentTasks', {
          query: { limit: 60 },
        }),
        client.get<RestListResponse<AgentRunRecord>>('/rest/agentRuns', {
          query: { limit: 60 },
        }),
        client.get<RestListResponse<AgentUpdateRecord>>('/rest/agentUpdates', {
          query: { limit: 30, depth: 1 },
        }),
        client.get<RestListResponse<AgentApprovalRecord>>(
          '/rest/agentApprovals',
          { query: { limit: 60 } },
        ),
      ]);

      const nextUpdates = getRecords(updates, 'agentUpdates').sort(
        (left, right) =>
          toTimestamp(right.occurredAt) - toTimestamp(left.occurredAt),
      );

      setData({
        agents: getRecords(agents, 'managedAgents'),
        tasks: getRecords(tasks, 'agentTasks'),
        runs: getRecords(runs, 'agentRuns'),
        updates: nextUpdates,
        approvals: getRecords(approvals, 'agentApprovals'),
      });
      setError(null);
      setLastRefreshedAt(new Date());
    } catch (refreshError) {
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : 'Unable to load command-center data.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const interval = setInterval(() => {
      void refresh();
    }, 5_000);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return {
    data,
    error,
    isLoading,
    lastRefreshedAt,
    refresh,
  };
};

