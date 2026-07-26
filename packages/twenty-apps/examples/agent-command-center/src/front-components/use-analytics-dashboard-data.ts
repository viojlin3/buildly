import { useCallback, useEffect, useState } from 'react';
import { RestApiClient } from 'twenty-client-sdk/rest';

import {
  type AnalyticsDashboardData,
  type AnalyticsRestListResponse,
  type CompetitorBenchmarkRecord,
  type SearchInsightRecord,
  type SiteTrafficSnapshotRecord,
} from 'src/front-components/analytics-dashboard.types';

const EMPTY_DATA: AnalyticsDashboardData = {
  traffic: [],
  benchmarks: [],
  searches: [],
};

const getRecords = <TRecord>(
  response: AnalyticsRestListResponse<TRecord>,
  objectNamePlural: string,
): TRecord[] => response.data?.[objectNamePlural] ?? [];

export const useAnalyticsDashboardData = () => {
  const [data, setData] = useState<AnalyticsDashboardData>(EMPTY_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    const client = new RestApiClient();

    try {
      const [traffic, benchmarks, searches] = await Promise.all([
        client.get<AnalyticsRestListResponse<SiteTrafficSnapshotRecord>>(
          '/rest/siteTrafficSnapshots',
          { query: { limit: 200 } },
        ),
        client.get<AnalyticsRestListResponse<CompetitorBenchmarkRecord>>(
          '/rest/competitorBenchmarks',
          { query: { limit: 200 } },
        ),
        client.get<AnalyticsRestListResponse<SearchInsightRecord>>(
          '/rest/searchInsights',
          { query: { limit: 300 } },
        ),
      ]);

      setData({
        traffic: getRecords(traffic, 'siteTrafficSnapshots'),
        benchmarks: getRecords(benchmarks, 'competitorBenchmarks'),
        searches: getRecords(searches, 'searchInsights'),
      });
      setError(null);
      setLastRefreshedAt(new Date());
    } catch (refreshError) {
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : 'Unable to load analytics data.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const interval = setInterval(() => {
      void refresh();
    }, 60_000);

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
