import { describe, expect, it, vi } from 'vitest';

import {
  parseReportAgentStatusInput,
  reportAgentStatus,
} from 'src/logic-functions/utils/report-agent-status';

const TASK_ID = 'f57ec312-5926-4d85-9ecf-ec427cfd5873';

describe('parseReportAgentStatusInput', () => {
  it('normalizes identifiers, statuses, and progress', () => {
    expect(
      parseReportAgentStatusInput({
        agentKey: ' Design ',
        runExternalId: 'design:homepage-01',
        status: 'running',
        message: '  Exploring three visual directions  ',
        progress: 126.4,
        taskId: TASK_ID,
      }),
    ).toEqual({
      agentKey: 'design',
      agentName: undefined,
      agentRole: undefined,
      model: undefined,
      instructions: undefined,
      runExternalId: 'design:homepage-01',
      status: 'RUNNING',
      message: 'Exploring three visual directions',
      progress: 100,
      taskId: TASK_ID,
      output: undefined,
      error: undefined,
      costUsd: undefined,
      tokens: undefined,
      metadata: undefined,
      occurredAt: undefined,
    });
  });

  it('rejects unknown statuses', () => {
    expect(() =>
      parseReportAgentStatusInput({
        agentKey: 'pm',
        runExternalId: 'pm-01',
        status: 'PAUSED',
        message: 'Waiting',
      }),
    ).toThrow('status must be one of');
  });
});

describe('reportAgentStatus', () => {
  it('creates a run and synchronizes its agent, update, and task', async () => {
    const client = {
      get: vi
        .fn()
        .mockResolvedValueOnce({
          data: {
            managedAgents: [{ id: 'agent-record-id', name: 'Design Agent' }],
          },
        })
        .mockResolvedValueOnce({ data: { agentRuns: [] } }),
      post: vi
        .fn()
        .mockResolvedValueOnce({
          data: {
            createAgentRun: {
              id: 'run-record-id',
              externalId: 'design:homepage-01',
            },
          },
        })
        .mockResolvedValueOnce({ data: { createAgentUpdate: {} } }),
      patch: vi.fn().mockResolvedValue({ data: {} }),
    };

    const result = await reportAgentStatus(
      {
        agentKey: 'design',
        runExternalId: 'design:homepage-01',
        status: 'RUNNING',
        message: 'Creating a component inventory',
        progress: 35,
        taskId: TASK_ID,
        occurredAt: '2026-07-25T12:00:00.000Z',
      },
      client as never,
    );

    expect(result).toMatchObject({
      success: true,
      agentId: 'agent-record-id',
      runId: 'run-record-id',
      status: 'RUNNING',
      progress: 35,
      registeredNewAgent: false,
    });
    expect(client.post).toHaveBeenNthCalledWith(
      2,
      '/rest/agentUpdates',
      expect.objectContaining({
        updateType: 'STATUS',
        runId: 'run-record-id',
        progress: 35,
      }),
    );
    expect(client.patch).toHaveBeenCalledWith(
      '/rest/managedAgents/agent-record-id',
      expect.objectContaining({
        status: 'WORKING',
        currentRunExternalId: 'design:homepage-01',
      }),
    );
    expect(client.patch).toHaveBeenCalledWith(
      `/rest/agentTasks/${TASK_ID}`,
      expect.objectContaining({
        status: 'IN_PROGRESS',
        progress: 35,
      }),
    );
  });

  it('automatically registers an unknown custom agent', async () => {
    const client = {
      get: vi
        .fn()
        .mockResolvedValueOnce({ data: { managedAgents: [] } })
        .mockResolvedValueOnce({ data: { agentRuns: [] } }),
      post: vi
        .fn()
        .mockResolvedValueOnce({
          data: {
            createManagedAgent: {
              id: 'custom-agent-record-id',
              name: 'Accessibility Reviewer',
            },
          },
        })
        .mockResolvedValueOnce({
          data: {
            createAgentRun: {
              id: 'custom-run-record-id',
              externalId: 'a11y-review:run-01',
            },
          },
        })
        .mockResolvedValueOnce({ data: { createAgentUpdate: {} } }),
      patch: vi.fn().mockResolvedValue({ data: {} }),
    };

    const result = await reportAgentStatus(
      {
        agentKey: 'a11y-review',
        agentName: 'Accessibility Reviewer',
        agentRole: 'Accessibility QA',
        model: 'custom-runtime/v2',
        runExternalId: 'a11y-review:run-01',
        status: 'RUNNING',
        message: 'Auditing keyboard navigation',
        progress: 10,
        occurredAt: '2026-07-25T12:00:00.000Z',
      },
      client as never,
    );

    expect(result.registeredNewAgent).toBe(true);
    expect(client.post).toHaveBeenNthCalledWith(
      1,
      '/rest/managedAgents',
      expect.objectContaining({
        key: 'a11y-review',
        name: 'Accessibility Reviewer',
        agentRole: 'Accessibility QA',
        model: 'custom-runtime/v2',
        status: 'WORKING',
      }),
    );
  });
});
