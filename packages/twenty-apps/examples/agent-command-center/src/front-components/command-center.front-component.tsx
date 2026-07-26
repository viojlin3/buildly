import { defineFrontComponent } from 'twenty-sdk/define';
import { useColorScheme } from 'twenty-sdk/front-component';

import { COMMAND_CENTER_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { type ManagedAgentRecord } from 'src/front-components/command-center.types';
import { useCommandCenterData } from 'src/front-components/use-command-center-data';

const STATUS_COLOR: Record<string, string> = {
  IDLE: '#8b8b8b',
  WORKING: '#2f9e44',
  RUNNING: '#2f9e44',
  WAITING: '#1971c2',
  BLOCKED: '#e67700',
  ERROR: '#e03131',
  FAILED: '#e03131',
  OFFLINE: '#868e96',
  COMPLETED: '#2b8a3e',
  QUEUED: '#868e96',
  STATUS: '#1971c2',
  PROGRESS: '#2f9e44',
  HANDOFF: '#7048e8',
  BLOCKER: '#e67700',
  DELIVERABLE: '#1971c2',
};

const ROLE_ORDER = ['PM', 'DESIGN', 'PRICING', 'RESEARCH', 'CUSTOM'];

const getRoleRank = (role: string | null | undefined) => {
  const rank = ROLE_ORDER.indexOf((role ?? '').toUpperCase());

  return rank === -1 ? ROLE_ORDER.length : rank;
};

const normalizeProgress = (value: number | null | undefined) =>
  Math.min(100, Math.max(0, value ?? 0));

const formatRelativeTime = (value: string | null | undefined) => {
  if (!value) {
    return 'No heartbeat';
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return 'Unknown';
  }

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1_000));

  if (seconds < 10) {
    return 'Just now';
  }

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
};

const isHeartbeatStale = (agent: ManagedAgentRecord) => {
  if (!['WORKING', 'WAITING'].includes(agent.status ?? '')) {
    return false;
  }

  const timestamp = Date.parse(agent.lastHeartbeatAt ?? '');

  return !Number.isNaN(timestamp) && Date.now() - timestamp > 120_000;
};

type Palette = {
  background: string;
  surface: string;
  raised: string;
  border: string;
  text: string;
  muted: string;
  subtle: string;
  accent: string;
};

const getPalette = (colorScheme: 'light' | 'dark'): Palette =>
  colorScheme === 'dark'
    ? {
        background: '#141414',
        surface: '#1d1d1d',
        raised: '#252525',
        border: '#343434',
        text: '#f4f4f4',
        muted: '#a6a6a6',
        subtle: '#737373',
        accent: '#74c0fc',
      }
    : {
        background: '#f8f8f7',
        surface: '#ffffff',
        raised: '#f3f3f1',
        border: '#e1e1de',
        text: '#202020',
        muted: '#666664',
        subtle: '#92928f',
        accent: '#1971c2',
      };

const StatusPill = ({
  status,
  stale,
}: {
  status: string;
  stale?: boolean;
}) => {
  const displayedStatus = stale ? 'STALE' : status;
  const color = stale ? '#e67700' : (STATUS_COLOR[status] ?? '#868e96');

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        border: `1px solid ${color}55`,
        background: `${color}18`,
        color,
        borderRadius: 999,
        padding: '4px 9px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
        }}
      />
      {displayedStatus}
    </span>
  );
};

const Metric = ({
  label,
  value,
  detail,
  palette,
}: {
  label: string;
  value: number;
  detail: string;
  palette: Palette;
}) => (
  <div
    style={{
      border: `1px solid ${palette.border}`,
      borderRadius: 12,
      padding: 16,
      background: palette.surface,
      minWidth: 0,
    }}
  >
    <div
      style={{
        color: palette.muted,
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
    <div style={{ color: palette.text, fontSize: 28, fontWeight: 700 }}>
      {value}
    </div>
    <div style={{ color: palette.subtle, fontSize: 11, marginTop: 4 }}>
      {detail}
    </div>
  </div>
);

const AgentCard = ({
  agent,
  palette,
}: {
  agent: ManagedAgentRecord;
  palette: Palette;
}) => {
  const progress = normalizeProgress(agent.progress);
  const stale = isHeartbeatStale(agent);

  return (
    <article
      style={{
        border: `1px solid ${palette.border}`,
        borderRadius: 14,
        padding: 18,
        background: palette.surface,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: palette.subtle,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: 5,
            }}
          >
            {agent.agentRole ?? 'CUSTOM'}
          </div>
          <div
            style={{
              color: palette.text,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {agent.name ?? agent.key ?? 'Unnamed agent'}
          </div>
        </div>
        <StatusPill status={agent.status ?? 'OFFLINE'} stale={stale} />
      </div>

      <div
        style={{
          color: palette.muted,
          fontSize: 13,
          lineHeight: 1.45,
          minHeight: 38,
          marginTop: 16,
        }}
      >
        {agent.currentActivity || 'No current assignment'}
      </div>

      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: palette.subtle,
            fontSize: 11,
            marginBottom: 6,
          }}
        >
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div
          style={{
            height: 5,
            borderRadius: 999,
            overflow: 'hidden',
            background: palette.raised,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 999,
              background:
                STATUS_COLOR[agent.status ?? ''] ?? palette.accent,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          color: palette.subtle,
          fontSize: 11,
          marginTop: 14,
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Run: {agent.currentRunExternalId || '—'}
        </span>
        <span style={{ whiteSpace: 'nowrap' }}>
          {formatRelativeTime(agent.lastHeartbeatAt)}
        </span>
      </div>
    </article>
  );
};

export const CommandCenter = () => {
  const colorScheme = useColorScheme();
  const palette = getPalette(colorScheme);
  const { data, error, isLoading, lastRefreshedAt, refresh } =
    useCommandCenterData();

  const agents = [...data.agents].sort(
    (left, right) => {
      const rankDifference =
        getRoleRank(left.agentRole) - getRoleRank(right.agentRole);

      return rankDifference !== 0
        ? rankDifference
        : (left.name ?? left.key ?? '').localeCompare(
            right.name ?? right.key ?? '',
          );
    },
  );
  const workingAgents = agents.filter((agent) =>
    ['WORKING', 'WAITING'].includes(agent.status ?? ''),
  ).length;
  const activeRuns = data.runs.filter((run) =>
    ['QUEUED', 'RUNNING', 'WAITING', 'BLOCKED'].includes(run.status ?? ''),
  ).length;
  const blockedTasks = data.tasks.filter(
    (task) => task.status === 'BLOCKED',
  ).length;
  const pendingApprovals = data.approvals.filter(
    (approval) => approval.status === 'PENDING',
  ).length;

  return (
    <main
      style={{
        minHeight: '100%',
        padding: 24,
        background: palette.background,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 18,
          marginBottom: 22,
        }}
      >
        <div>
          <div
            style={{
              color: palette.accent,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: 6,
            }}
          >
            LIVE OPERATIONS
          </div>
          <h1
            style={{
              color: palette.text,
              fontSize: 26,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Agent Command Center
          </h1>
          <p
            style={{
              color: palette.muted,
              fontSize: 13,
              margin: '7px 0 0',
            }}
          >
            Who is doing what, on which run, and what needs attention.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          style={{
            border: `1px solid ${palette.border}`,
            borderRadius: 9,
            padding: '8px 12px',
            background: palette.surface,
            color: palette.text,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Refresh
        </button>
      </header>

      {error ? (
        <div
          role="alert"
          style={{
            border: '1px solid #e0313155',
            background: '#e0313114',
            color: '#e03131',
            borderRadius: 10,
            padding: 12,
            fontSize: 12,
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      ) : null}

      <section
        aria-label="Operations summary"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <Metric
          label="Agents engaged"
          value={workingAgents}
          detail={`${agents.length} agents in roster`}
          palette={palette}
        />
        <Metric
          label="Active run instances"
          value={activeRuns}
          detail={`${data.runs.length} total runs loaded`}
          palette={palette}
        />
        <Metric
          label="Blocked tasks"
          value={blockedTasks}
          detail={`${data.tasks.length} tasks loaded`}
          palette={palette}
        />
        <Metric
          label="Pending approvals"
          value={pendingApprovals}
          detail="Human or PM decisions"
          palette={palette}
        />
      </section>

      <section aria-labelledby="agent-roster-heading">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <h2
            id="agent-roster-heading"
            style={{ color: palette.text, fontSize: 16, margin: 0 }}
          >
            Agent roster
          </h2>
          <span style={{ color: palette.subtle, fontSize: 11 }}>
            Auto-refreshes every 5 seconds
            {lastRefreshedAt
              ? ` · updated ${lastRefreshedAt.toLocaleTimeString()}`
              : ''}
          </span>
        </div>

        {isLoading && agents.length === 0 ? (
          <div style={{ color: palette.muted, padding: '28px 0' }}>
            Loading agent activity…
          </div>
        ) : agents.length === 0 ? (
          <div
            style={{
              border: `1px dashed ${palette.border}`,
              borderRadius: 12,
              color: palette.muted,
              padding: 24,
              textAlign: 'center',
            }}
          >
            No managed agents yet. Re-run the install hook or add agents in the
            Agent Roster.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 12,
            }}
          >
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} palette={palette} />
            ))}
          </div>
        )}
      </section>

      <section
        aria-labelledby="recent-updates-heading"
        style={{ marginTop: 26 }}
      >
        <h2
          id="recent-updates-heading"
          style={{
            color: palette.text,
            fontSize: 16,
            margin: '0 0 12px',
          }}
        >
          Recent updates
        </h2>
        <div
          style={{
            border: `1px solid ${palette.border}`,
            borderRadius: 12,
            overflow: 'hidden',
            background: palette.surface,
          }}
        >
          {data.updates.length === 0 ? (
            <div
              style={{
                color: palette.muted,
                fontSize: 13,
                padding: 18,
              }}
            >
              Updates will appear here when agents report progress.
            </div>
          ) : (
            data.updates.slice(0, 12).map((update, index) => (
              <div
                key={update.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px minmax(0, 1fr) 150px',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 15px',
                  borderTop:
                    index === 0 ? 'none' : `1px solid ${palette.border}`,
                }}
              >
                <StatusPill status={update.updateType ?? 'STATUS'} />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: palette.text,
                      fontSize: 13,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {update.message ?? update.name ?? 'Agent update'}
                  </div>
                  <div
                    style={{
                      color: palette.subtle,
                      fontSize: 10,
                      marginTop: 3,
                    }}
                  >
                    Run {update.run?.externalId ?? '—'}
                    {update.progress == null
                      ? ''
                      : ` · ${normalizeProgress(update.progress)}%`}
                  </div>
                </div>
                <div
                  style={{
                    color: palette.subtle,
                    fontSize: 11,
                    textAlign: 'right',
                  }}
                >
                  {formatRelativeTime(update.occurredAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default defineFrontComponent({
  universalIdentifier: COMMAND_CENTER_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'agent-command-center',
  description:
    'Live roster, run instances, blockers, approvals, and progress updates for a multi-agent team.',
  component: CommandCenter,
});
