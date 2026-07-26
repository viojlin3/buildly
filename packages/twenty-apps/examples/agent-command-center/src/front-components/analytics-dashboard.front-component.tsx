import { defineFrontComponent } from 'twenty-sdk/define';
import { useColorScheme } from 'twenty-sdk/front-component';

import { ANALYTICS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import {
  type CompetitorBenchmarkRecord,
  type SiteTrafficSnapshotRecord,
} from 'src/front-components/analytics-dashboard.types';
import {
  getLatestBenchmarksByBusiness,
  getLatestSearchSummary,
  getTrafficSummary,
} from 'src/front-components/analytics-dashboard.utils';
import { useAnalyticsDashboardData } from 'src/front-components/use-analytics-dashboard-data';

type Palette = {
  background: string;
  surface: string;
  raised: string;
  border: string;
  text: string;
  muted: string;
  subtle: string;
  accent: string;
  positive: string;
  negative: string;
};

const getPalette = (colorScheme: 'light' | 'dark'): Palette =>
  colorScheme === 'dark'
    ? {
        background: '#141414',
        surface: '#1d1d1d',
        raised: '#252525',
        border: '#343434',
        text: '#f4f4f4',
        muted: '#b0b0b0',
        subtle: '#7c7c7c',
        accent: '#74c0fc',
        positive: '#69db7c',
        negative: '#ff8787',
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
        positive: '#2b8a3e',
        negative: '#c92a2a',
      };

const numberFormatter = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const fullNumberFormatter = new Intl.NumberFormat();

const formatNumber = (value: number | null | undefined) =>
  value == null ? '—' : numberFormatter.format(value);

const formatFullNumber = (value: number | null | undefined) =>
  value == null ? '—' : fullNumberFormatter.format(value);

const formatPercent = (value: number | null | undefined) =>
  value == null ? '—' : `${value.toFixed(1)}%`;

const formatCurrency = (value: number | null | undefined) =>
  value == null
    ? '—'
    : new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value);

const formatDate = (value: string | null | undefined) => {
  const date = new Date(value ?? '');

  return Number.isNaN(date.getTime())
    ? 'No reporting date'
    : date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
};

const DataLink = ({
  href,
  children,
  palette,
}: {
  href: string;
  children: string;
  palette: Palette;
}) => (
  <a
    href={href}
    target="_top"
    style={{
      border: `1px solid ${palette.border}`,
      borderRadius: 8,
      color: palette.text,
      fontSize: 12,
      fontWeight: 600,
      padding: '7px 10px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </a>
);

const MetricCard = ({
  label,
  value,
  detail,
  change,
  palette,
}: {
  label: string;
  value: string;
  detail: string;
  change?: number | null;
  palette: Palette;
}) => (
  <article
    style={{
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 12,
      minWidth: 0,
      padding: 16,
    }}
  >
    <div
      style={{
        color: palette.muted,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
    <div
      style={{
        color: palette.text,
        fontSize: 28,
        fontWeight: 700,
        marginTop: 9,
      }}
    >
      {value}
    </div>
    <div
      style={{
        color:
          change == null
            ? palette.subtle
            : change >= 0
              ? palette.positive
              : palette.negative,
        fontSize: 11,
        marginTop: 5,
      }}
    >
      {change == null
        ? detail
        : `${change >= 0 ? '+' : ''}${change.toFixed(1)}% · ${detail}`}
    </div>
  </article>
);

const EmptyState = ({
  title,
  description,
  href,
  action,
  palette,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  palette: Palette;
}) => (
  <div
    style={{
      background: palette.surface,
      border: `1px dashed ${palette.border}`,
      borderRadius: 12,
      padding: 24,
      textAlign: 'center',
    }}
  >
    <div style={{ color: palette.text, fontSize: 14, fontWeight: 700 }}>
      {title}
    </div>
    <p
      style={{
        color: palette.muted,
        fontSize: 12,
        lineHeight: 1.5,
        margin: '7px auto 15px',
        maxWidth: 540,
      }}
    >
      {description}
    </p>
    <DataLink href={href} palette={palette}>
      {action}
    </DataLink>
  </div>
);

const TrafficTrend = ({
  snapshots,
  palette,
}: {
  snapshots: SiteTrafficSnapshotRecord[];
  palette: Palette;
}) => {
  const visible = snapshots.slice(-14);
  const maximum = Math.max(
    1,
    ...visible.map((snapshot) => snapshot.uniqueVisitors ?? 0),
  );

  return (
    <div
      style={{
        alignItems: 'end',
        display: 'grid',
        gap: 5,
        gridTemplateColumns: `repeat(${Math.max(visible.length, 1)}, minmax(8px, 1fr))`,
        height: 190,
        paddingTop: 12,
      }}
      aria-label="Unique visitor trend"
    >
      {visible.map((snapshot) => {
        const height = Math.max(
          3,
          ((snapshot.uniqueVisitors ?? 0) / maximum) * 100,
        );

        return (
          <div
            key={snapshot.id}
            title={`${formatDate(snapshot.snapshotDate)}: ${formatFullNumber(snapshot.uniqueVisitors)} unique visitors`}
            style={{
              alignItems: 'end',
              display: 'flex',
              height: '100%',
            }}
          >
            <div
              style={{
                background: palette.accent,
                borderRadius: '5px 5px 2px 2px',
                height: `${height}%`,
                minHeight: 4,
                opacity: 0.82,
                width: '100%',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ComparisonValue = ({
  label,
  ownValue,
  competitorValue,
  formatter,
  palette,
}: {
  label: string;
  ownValue: number | null | undefined;
  competitorValue: number | null | undefined;
  formatter: (value: number | null | undefined) => string;
  palette: Palette;
}) => (
  <div>
    <div
      style={{
        color: palette.subtle,
        fontSize: 10,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
    <div
      style={{
        color: palette.text,
        fontSize: 12,
        fontWeight: 650,
        marginTop: 4,
      }}
    >
      {formatter(ownValue)} <span style={{ color: palette.subtle }}>vs</span>{' '}
      {formatter(competitorValue)}
    </div>
  </div>
);

const CompetitorCard = ({
  ownBusiness,
  competitor,
  palette,
}: {
  ownBusiness: CompetitorBenchmarkRecord;
  competitor: CompetitorBenchmarkRecord;
  palette: Palette;
}) => (
  <article
    style={{
      background: palette.surface,
      border: `1px solid ${palette.border}`,
      borderRadius: 12,
      padding: 16,
    }}
  >
    <div
      style={{
        alignItems: 'baseline',
        display: 'flex',
        gap: 8,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ color: palette.text, fontSize: 14, fontWeight: 700 }}>
        {ownBusiness.name ?? 'Your business'} vs{' '}
        {competitor.name ?? 'Competitor'}
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 8,
        }}
      >
        <span style={{ color: palette.subtle, fontSize: 10 }}>
          {formatDate(competitor.benchmarkDate)}
        </span>
        {competitor.evidenceUrl ? (
          <a
            href={competitor.evidenceUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: palette.accent, fontSize: 10 }}
          >
            Evidence
          </a>
        ) : null}
      </div>
    </div>
    <div
      style={{
        display: 'grid',
        gap: 14,
        gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
        marginTop: 16,
      }}
    >
      <ComparisonValue
        label="Monthly visits"
        ownValue={ownBusiness.monthlyVisits}
        competitorValue={competitor.monthlyVisits}
        formatter={formatNumber}
        palette={palette}
      />
      <ComparisonValue
        label="Search visibility"
        ownValue={ownBusiness.searchVisibilityScore}
        competitorValue={competitor.searchVisibilityScore}
        formatter={formatPercent}
        palette={palette}
      />
      <ComparisonValue
        label="Conversion rate"
        ownValue={ownBusiness.conversionRate}
        competitorValue={competitor.conversionRate}
        formatter={formatPercent}
        palette={palette}
      />
      <ComparisonValue
        label="Starting price"
        ownValue={ownBusiness.startingPriceUsd}
        competitorValue={competitor.startingPriceUsd}
        formatter={formatCurrency}
        palette={palette}
      />
      <ComparisonValue
        label="Market share"
        ownValue={ownBusiness.marketSharePercent}
        competitorValue={competitor.marketSharePercent}
        formatter={formatPercent}
        palette={palette}
      />
    </div>
  </article>
);

const SectionHeader = ({
  title,
  description,
  href,
  action,
  palette,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  palette: Palette;
}) => (
  <div
    style={{
      alignItems: 'start',
      display: 'flex',
      gap: 16,
      justifyContent: 'space-between',
      marginBottom: 12,
    }}
  >
    <div>
      <h2
        style={{
          color: palette.text,
          fontSize: 16,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: palette.subtle,
          fontSize: 11,
          marginTop: 4,
        }}
      >
        {description}
      </div>
    </div>
    <DataLink href={href} palette={palette}>
      {action}
    </DataLink>
  </div>
);

const AnalyticsDashboard = () => {
  const colorScheme = useColorScheme();
  const palette = getPalette(colorScheme);
  const { data, error, isLoading, lastRefreshedAt, refresh } =
    useAnalyticsDashboardData();
  const traffic = getTrafficSummary(data.traffic);
  const benchmarks = getLatestBenchmarksByBusiness(data.benchmarks);
  const search = getLatestSearchSummary(data.searches);
  const latestTraffic = traffic.latest;

  return (
    <main
      style={{
        background: palette.background,
        boxSizing: 'border-box',
        color: palette.text,
        minHeight: '100%',
        padding: 22,
      }}
    >
      <header
        style={{
          alignItems: 'start',
          display: 'flex',
          gap: 18,
          justifyContent: 'space-between',
          marginBottom: 22,
        }}
      >
        <div>
          <div
            style={{
              color: palette.accent,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Analytics
          </div>
          <h1
            style={{
              color: palette.text,
              fontSize: 24,
              margin: '5px 0 4px',
            }}
          >
            Business performance
          </h1>
          <div style={{ color: palette.muted, fontSize: 12 }}>
            Website audience, market position, and customer search demand.
          </div>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 8,
            color: palette.text,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 650,
            padding: '8px 11px',
          }}
        >
          Refresh
        </button>
      </header>

      {error ? (
        <div
          role="alert"
          style={{
            background: `${palette.negative}12`,
            border: `1px solid ${palette.negative}55`,
            borderRadius: 10,
            color: palette.negative,
            fontSize: 12,
            marginBottom: 18,
            padding: 12,
          }}
        >
          {error}
        </div>
      ) : null}

      <section aria-labelledby="traffic-heading">
        <SectionHeader
          title="Website traffic"
          description={
            latestTraffic
              ? `${latestTraffic.analyticsSource ?? 'Analytics source'} · ${formatDate(latestTraffic.snapshotDate)}`
              : 'How many people visited the site and what they did'
          }
          href="/objects/siteTrafficSnapshots"
          action="Manage traffic data"
          palette={palette}
        />

        {isLoading && data.traffic.length === 0 ? (
          <div style={{ color: palette.muted, padding: 24 }}>
            Loading analytics…
          </div>
        ) : !latestTraffic ? (
          <EmptyState
            title="No website traffic data yet"
            description="Add a daily or weekly snapshot from GA4, Plausible, PostHog, or another provider. A scheduled Workflow can automate this later."
            href="/objects/siteTrafficSnapshots"
            action="Add traffic snapshot"
            palette={palette}
          />
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(155px, 1fr))',
              }}
            >
              <MetricCard
                label="Unique visitors"
                value={formatFullNumber(latestTraffic.uniqueVisitors)}
                detail="vs previous snapshot"
                change={traffic.visitorChangePercent}
                palette={palette}
              />
              <MetricCard
                label="Sessions"
                value={formatFullNumber(latestTraffic.sessions)}
                detail="visits in reporting period"
                palette={palette}
              />
              <MetricCard
                label="Page views"
                value={formatFullNumber(latestTraffic.pageViews)}
                detail="pages viewed"
                palette={palette}
              />
              <MetricCard
                label="Conversions"
                value={formatFullNumber(latestTraffic.conversions)}
                detail={formatPercent(latestTraffic.conversionRate)}
                palette={palette}
              />
            </div>
            <div
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                marginTop: 10,
                padding: '14px 16px 12px',
              }}
            >
              <div
                style={{
                  color: palette.muted,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Unique visitor trend · last {Math.min(14, data.traffic.length)}{' '}
                snapshots
              </div>
              <TrafficTrend snapshots={traffic.sorted} palette={palette} />
            </div>
          </>
        )}
      </section>

      <section
        aria-labelledby="competitor-heading"
        style={{ marginTop: 28 }}
      >
        <SectionHeader
          title="Business vs competitors"
          description="Latest benchmark for your business compared with each competitor"
          href="/objects/competitorBenchmarks"
          action="Manage benchmarks"
          palette={palette}
        />
        {!benchmarks.ownBusiness || benchmarks.competitors.length === 0 ? (
          <EmptyState
            title="Add your business and at least one competitor"
            description="Create benchmark records for the same reporting period. Mark one record as “Your business” and include evidence URLs so comparisons remain auditable."
            href="/objects/competitorBenchmarks"
            action="Add benchmark"
            palette={palette}
          />
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {benchmarks.competitors.map((competitor) => (
              <CompetitorCard
                key={competitor.id}
                ownBusiness={benchmarks.ownBusiness!}
                competitor={competitor}
                palette={palette}
              />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="search-heading" style={{ marginTop: 28 }}>
        <SectionHeader
          title="Search insights"
          description={
            search.reportingDate
              ? `Latest reporting period · ${formatDate(search.reportingDate)}`
              : 'Optional, but useful for discovering demand and missing content'
          }
          href="/objects/searchInsights"
          action="Manage search data"
          palette={palette}
        />
        {data.searches.length === 0 ? (
          <EmptyState
            title="Search tracking is optional"
            description="It becomes useful when your site has internal search or when you import search-query data. Top terms reveal demand; no-result terms show missing products, features, or content."
            href="/objects/searchInsights"
            action="Add search insight"
            palette={palette}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gap: 10,
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(260px, 0.6fr)',
            }}
          >
            <div
              style={{
                background: palette.surface,
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {search.topSearches.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    alignItems: 'center',
                    borderTop:
                      index === 0 ? 'none' : `1px solid ${palette.border}`,
                    display: 'grid',
                    gap: 12,
                    gridTemplateColumns: 'minmax(0, 1fr) 80px 80px',
                    padding: '11px 14px',
                  }}
                >
                  <div
                    style={{
                      color: palette.text,
                      fontSize: 12,
                      fontWeight: 600,
                      minWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.name ?? 'Unnamed search'}
                    {item.hadNoResults ? (
                      <span
                        style={{
                          color: palette.negative,
                          fontSize: 9,
                          marginLeft: 7,
                        }}
                      >
                        NO RESULTS
                      </span>
                    ) : null}
                  </div>
                  <div style={{ color: palette.muted, fontSize: 11 }}>
                    {formatFullNumber(item.searchCount)} searches
                  </div>
                  <div style={{ color: palette.muted, fontSize: 11 }}>
                    {formatFullNumber(item.clickCount)} clicks
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              }}
            >
              <MetricCard
                label="Searches"
                value={formatFullNumber(search.totalSearches)}
                detail="latest period"
                palette={palette}
              />
              <MetricCard
                label="Click rate"
                value={formatPercent(search.clickThroughRate)}
                detail={`${formatFullNumber(search.totalClicks)} clicks`}
                palette={palette}
              />
              <MetricCard
                label="No-result terms"
                value={formatFullNumber(search.noResultTerms)}
                detail="content gaps"
                palette={palette}
              />
              <MetricCard
                label="Conversions"
                value={formatFullNumber(search.totalConversions)}
                detail="from search"
                palette={palette}
              />
            </div>
          </div>
        )}
      </section>

      <footer
        style={{
          color: palette.subtle,
          fontSize: 10,
          marginTop: 22,
          textAlign: 'right',
        }}
      >
        Refreshes every 60 seconds
        {lastRefreshedAt
          ? ` · updated ${lastRefreshedAt.toLocaleTimeString()}`
          : ''}
      </footer>
    </main>
  );
};

export default defineFrontComponent({
  universalIdentifier: ANALYTICS_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'analytics-dashboard',
  description:
    'Website traffic, competitor benchmarking, and optional search-demand analytics.',
  component: AnalyticsDashboard,
});
