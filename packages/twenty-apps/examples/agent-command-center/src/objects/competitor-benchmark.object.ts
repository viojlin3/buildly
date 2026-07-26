import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  COMPETITOR_BENCHMARK_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_EVIDENCE_URL_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_IS_OWN_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_MARKET_SHARE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_SEARCH_VISIBILITY_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_VISITS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'competitorBenchmark',
  namePlural: 'competitorBenchmarks',
  labelSingular: 'Competitor benchmark',
  labelPlural: 'Competitor benchmarks',
  description:
    'A dated business or competitor measurement with its evidence source.',
  icon: 'IconScale',
  labelIdentifierFieldMetadataUniversalIdentifier:
    COMPETITOR_BENCHMARK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Business',
      icon: 'IconBuildingStore',
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'benchmarkDate',
      label: 'Benchmark date',
      icon: 'IconCalendarStats',
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_IS_OWN_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.BOOLEAN,
      name: 'isOwnBusiness',
      label: 'Your business',
      icon: 'IconHome',
      defaultValue: false,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_VISITS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'monthlyVisits',
      label: 'Monthly website visits',
      icon: 'IconUsers',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_SEARCH_VISIBILITY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'searchVisibilityScore',
      label: 'Search visibility (0–100)',
      icon: 'IconSearch',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'conversionRate',
      label: 'Conversion rate (%)',
      icon: 'IconPercentage',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'startingPriceUsd',
      label: 'Starting price (USD)',
      icon: 'IconCurrencyDollar',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_MARKET_SHARE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'marketSharePercent',
      label: 'Market share (%)',
      icon: 'IconChartPie',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_EVIDENCE_URL_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'evidenceUrl',
      label: 'Evidence URL',
      icon: 'IconLink',
      isNullable: true,
    },
    {
      universalIdentifier:
        COMPETITOR_BENCHMARK_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RICH_TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
      isNullable: true,
    },
  ],
});
