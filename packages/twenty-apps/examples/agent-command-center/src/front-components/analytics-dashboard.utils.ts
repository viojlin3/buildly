import {
  type CompetitorBenchmarkRecord,
  type SearchInsightRecord,
  type SiteTrafficSnapshotRecord,
} from 'src/front-components/analytics-dashboard.types';

const toTimestamp = (value: string | null | undefined) => {
  const timestamp = Date.parse(value ?? '');

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const valueOrZero = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

export const sortTrafficSnapshots = (
  snapshots: SiteTrafficSnapshotRecord[],
) =>
  [...snapshots].sort(
    (left, right) =>
      toTimestamp(left.snapshotDate) - toTimestamp(right.snapshotDate),
  );

export const getTrafficSummary = (
  snapshots: SiteTrafficSnapshotRecord[],
) => {
  const sorted = sortTrafficSnapshots(snapshots);
  const latest = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  const currentVisitors = valueOrZero(latest?.uniqueVisitors);
  const previousVisitors = valueOrZero(previous?.uniqueVisitors);
  const visitorChangePercent =
    previousVisitors > 0
      ? ((currentVisitors - previousVisitors) / previousVisitors) * 100
      : null;

  return {
    sorted,
    latest,
    previous,
    visitorChangePercent,
  };
};

export const getLatestBenchmarksByBusiness = (
  benchmarks: CompetitorBenchmarkRecord[],
) => {
  const sorted = [...benchmarks].sort(
    (left, right) =>
      toTimestamp(right.benchmarkDate) - toTimestamp(left.benchmarkDate),
  );
  const latestByName = new Map<string, CompetitorBenchmarkRecord>();

  for (const benchmark of sorted) {
    const key = benchmark.name?.trim().toLowerCase();

    if (key && !latestByName.has(key)) {
      latestByName.set(key, benchmark);
    }
  }

  const latest = [...latestByName.values()];

  return {
    ownBusiness: latest.find((benchmark) => benchmark.isOwnBusiness) ?? null,
    competitors: latest.filter((benchmark) => !benchmark.isOwnBusiness),
  };
};

export const getLatestSearchSummary = (
  searches: SearchInsightRecord[],
) => {
  const latestTimestamp = Math.max(
    0,
    ...searches.map((search) => toTimestamp(search.snapshotDate)),
  );
  const reportingSearches = searches.filter(
    (search) => toTimestamp(search.snapshotDate) === latestTimestamp,
  );
  const totalSearches = reportingSearches.reduce(
    (total, search) => total + valueOrZero(search.searchCount),
    0,
  );
  const totalClicks = reportingSearches.reduce(
    (total, search) => total + valueOrZero(search.clickCount),
    0,
  );
  const totalConversions = reportingSearches.reduce(
    (total, search) => total + valueOrZero(search.conversionCount),
    0,
  );
  const topSearches = [...reportingSearches]
    .sort(
      (left, right) =>
        valueOrZero(right.searchCount) - valueOrZero(left.searchCount),
    )
    .slice(0, 8);

  return {
    reportingDate: reportingSearches[0]?.snapshotDate ?? null,
    totalSearches,
    totalClicks,
    totalConversions,
    clickThroughRate:
      totalSearches > 0 ? (totalClicks / totalSearches) * 100 : null,
    noResultTerms: reportingSearches.filter((search) => search.hadNoResults)
      .length,
    topSearches,
  };
};
