# Agent Command Center

Agent Command Center turns Twenty into an operations console for a multi-agent
team. It installs with no predefined agents: names, roles, models, instructions,
and runtime implementations are all supplied by your team.

The command center answers four practical questions:

- Which agent is working right now?
- Which task and execution instance is it working on?
- What changed recently, and is the heartbeat still fresh?
- Which blockers, deliverables, or approval requests need human attention?

## What the app adds

- A live command-center dashboard that refreshes every five seconds.
- An agent roster with role, state, current action, progress, run ID, model, and
  last heartbeat.
- Projects, tasks, individual run instances, timestamped updates, deliverables,
  approvals, budgets, actual spend, links, and uploaded files.
- Table views plus a task Kanban board.
- A `report-agent-status` AI tool and workflow action.
- An authenticated HTTP endpoint for external agent runtimes.
- Automatic registration when a custom agent sends its first heartbeat.
- A default least-privilege application role.

## Data flow

An Agent Task describes the work and its owner. Every execution attempt creates
or updates a separate Agent Run identified by `runExternalId`. Heartbeats append
Agent Update records and synchronize the roster card and associated task. Final
files or links belong in Agent Deliverables; decisions that require a person
belong in Agent Approvals.

This separation makes retries visible. For example, `design:homepage-01` and
`design:homepage-02` can point to the same task without overwriting each other.

## Run it on a local Twenty installation

Start Twenty first from `packages/twenty-docker`, then install this app:

```bash
cd packages/twenty-apps/examples/agent-command-center
yarn install
yarn twenty dev
```

The Twenty CLI will guide you through connecting the app to the local workspace.
Open Twenty and use **Agent Command Center** in the left navigation. The other
navigation entries expose the complete records and views.

## Custom agents

The roster starts empty and does not restrict agents to preset roles. Add a
custom Twenty agent, add an agent manually in **Agent Roster**, or let any
external agent register itself by sending its first status report. Assign the
app's role and Agent Coordination skill to custom Twenty agents that should use
the included status tool. The `agentKey` is the stable runtime identity;
`agentName`, `agentRole`, `model`, and `instructions` describe that agent and
can be updated in later reports.

Examples of valid roles include `PM`, `Design`, `Legal`, `Frontend`,
`Accessibility QA`, `Procurement`, or any other responsibility your team uses.

## Report an external agent heartbeat

External runtimes can call the app's authenticated `POST` route:

```text
/agent-command-center/report-status
```

Use the installed app's route URL and a Twenty API key with access to the
application. A typical payload is:

```json
{
  "agentKey": "a11y-review",
  "agentName": "Accessibility Reviewer",
  "agentRole": "Accessibility QA",
  "model": "custom-runtime/v2",
  "runExternalId": "a11y-review:homepage-01",
  "taskId": "f57ec312-5926-4d85-9ecf-ec427cfd5873",
  "status": "RUNNING",
  "message": "Auditing keyboard navigation",
  "progress": 35,
  "costUsd": 0.18,
  "tokens": 8420,
  "metadata": {
    "worker": "design-worker-2"
  }
}
```

Supported statuses are `QUEUED`, `RUNNING`, `WAITING`, `BLOCKED`, `COMPLETED`,
`FAILED`, and `CANCELLED`. Send an update when a run starts, its current action
changes, it becomes blocked, it hands work off, and it finishes. Reusing the
same `runExternalId` updates that execution instance; using a new ID creates a
new run. If `agentKey` is not already in the roster, the first report creates
the agent automatically.

The route updates four pieces of state atomically from the caller's perspective:

1. The Agent Run and its heartbeat.
2. A timestamped Agent Update.
3. The roster agent's current status and activity.
4. The linked task's status, progress, result, or blocker.

## Useful commands

```bash
yarn lint
yarn typecheck
yarn test
yarn twenty dev:build
```

## Scope

This app is the control plane and record of work. It does not itself launch
arbitrary third-party agent processes. Twenty's native agents can use the
included status tool, while external frameworks should call the HTTP endpoint
from their own workers.
