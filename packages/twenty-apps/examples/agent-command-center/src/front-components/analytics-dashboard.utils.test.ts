import { describe, expect, it } from 'vitest';

import {
  getLatestBenchmarksByBusiness,
  getLatestSearchSummary,
  getTrafficSummary,
} from 'src/front-components/analytics-dashboard.utils';

describe('analytics dashboard summaries', () => {
  it('calculates visitor change from ordered traffic snapshots', () => {
    const summary = getTrafficSummary([
      {
        id: 'new',
        snapshotDate: '2026-07-02',
        uniqueVisitors: 150,
      },
      {
        id: 'old',
        snapshotDate: '2026-07-01',
        uniqueVisitors: 100,
      },
    ]);

    expect(summary.latest?.id).toBe('new');
    expect(summary.visitorChangePercent).toBe(50);
  });

  it('keeps the latest benchmark for each business', () => {
    const summary = getLatestBenchmarksByBusiness([
      {
        id: 'own-old',
        name: 'Buildly',
        benchmarkDate: '2026-06-01',
        isOwnBusiness: true,
      },
      {
        id: 'own-new',
        name: 'Buildly',
        benchmarkDate: '2026-07-01',
        isOwnBusiness: true,
      },
      {
        id: 'competitor',
        name: 'Competitor',
        benchmarkDate: '2026-07-01',
        isOwnBusiness: false,
      },
    ]);

    expect(summary.ownBusiness?.id).toBe('own-new');
    expect(summary.competitors).toHaveLength(1);
  });

  it('summarizes only the latest search reporting date', () => {
    const summary = getLatestSearchSummary([
      {
        id: 'old',
        snapshotDate: '2026-06-01',
        searchCount: 100,
      },
      {
        id: 'latest-a',
        snapshotDate: '2026-07-01',
        name: 'pricing',
        searchCount: 20,
        clickCount: 10,
      },
      {
        id: 'latest-b',
        snapshotDate: '2026-07-01',
        name: 'missing feature',
        searchCount: 5,
        clickCount: 0,
        hadNoResults: true,
      },
    ]);

    expect(summary.totalSearches).toBe(25);
    expect(summary.clickThroughRate).toBe(40);
    expect(summary.noResultTerms).toBe(1);
  });
});
