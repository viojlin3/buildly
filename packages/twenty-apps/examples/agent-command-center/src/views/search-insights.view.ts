import { defineView, ViewType } from 'twenty-sdk/define';

import {
  SEARCH_INSIGHT_CLICKS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_NO_RESULTS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_SEARCHES_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHTS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: SEARCH_INSIGHTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Search insights',
  objectUniversalIdentifier: SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconZoomQuestion',
  position: 0,
  fields: [
    {
      universalIdentifier: 'a29d7f63-be27-4e14-bd31-f011714a5e23',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: 'bba58494-3f4c-4787-9856-324b0955838a',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '79fbac5f-6d03-4db0-bb18-9ccd4f875ec8',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: 'b4c7c177-eca0-438a-8c12-603e3bcf8863',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_SEARCHES_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '645372ae-127a-4da1-88db-b086a716b3a5',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_CLICKS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 110,
    },
    {
      universalIdentifier: 'f3c1c7b4-1bff-4861-b45b-2c9ad958891e',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '58976e13-ec14-4f98-936e-6a3b0d9e4fa6',
      fieldMetadataUniversalIdentifier:
        SEARCH_INSIGHT_NO_RESULTS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 120,
    },
  ],
});
