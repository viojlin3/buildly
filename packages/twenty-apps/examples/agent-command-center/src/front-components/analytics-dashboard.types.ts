export type SiteTrafficSnapshotRecord = {
  id: string;
  name?: string | null;
  snapshotDate?: string | null;
  analyticsSource?: string | null;
  uniqueVisitors?: number | null;
  sessions?: number | null;
  pageViews?: number | null;
  conversions?: number | null;
  conversionRate?: number | null;
  bounceRate?: number | null;
  averageSessionSeconds?: number | null;
};

export type CompetitorBenchmarkRecord = {
  id: string;
  name?: string | null;
  benchmarkDate?: string | null;
  isOwnBusiness?: boolean | null;
  monthlyVisits?: number | null;
  searchVisibilityScore?: number | null;
  conversionRate?: number | null;
  startingPriceUsd?: number | null;
  marketSharePercent?: number | null;
  evidenceUrl?: string | null;
};

export type SearchInsightRecord = {
  id: string;
  name?: string | null;
  snapshotDate?: string | null;
  searchSource?: string | null;
  searchCount?: number | null;
  clickCount?: number | null;
  conversionCount?: number | null;
  hadNoResults?: boolean | null;
};

export type AnalyticsDashboardData = {
  traffic: SiteTrafficSnapshotRecord[];
  benchmarks: CompetitorBenchmarkRecord[];
  searches: SearchInsightRecord[];
};

export type AnalyticsRestListResponse<TRecord> = {
  data?: Record<string, TRecord[] | undefined>;
};
