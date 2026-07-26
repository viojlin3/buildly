import { defineView, ViewType } from 'twenty-sdk/define';

import {
  COMPETITOR_BENCHMARK_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_IS_OWN_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_SEARCH_VISIBILITY_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARK_VISITS_FIELD_UNIVERSAL_IDENTIFIER,
  COMPETITOR_BENCHMARKS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: COMPETITOR_BENCHMARKS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Competitor benchmarks',
  objectUniversalIdentifier:
    COMPETITOR_BENCHMARK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconScale',
  position: 0,
  fields: [
    {
      universalIdentifier: '1ee9f333-345c-4260-906c-6e97e4f44f3e',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '911df080-b0dc-476f-836c-eef6e4c47298',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '996a8882-096a-4652-b8cb-39391bdbceee',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_IS_OWN_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '21da91e4-14a5-4498-b6fa-c7a20423ac13',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_VISITS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '1c2e40c2-5f3b-49a1-951d-65dd804366ee',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_SEARCH_VISIBILITY_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: 'ddc86a3a-026f-4b9c-835d-cfe15aa790d0',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: 'cb887e7f-2f4b-4e3f-ac08-3291f2098d24',
      fieldMetadataUniversalIdentifier:
        COMPETITOR_BENCHMARK_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 150,
    },
  ],
});
