import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  SEARCH_INSIGHT_CLICKS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_NO_RESULTS_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_SEARCHES_FIELD_UNIVERSAL_IDENTIFIER,
  SEARCH_INSIGHT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: SEARCH_INSIGHT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'searchInsight',
  namePlural: 'searchInsights',
  labelSingular: 'Search insight',
  labelPlural: 'Search insights',
  description:
    'A dated onsite or acquisition search term measurement. Optional when search data is unavailable.',
  icon: 'IconZoomQuestion',
  labelIdentifierFieldMetadataUniversalIdentifier:
    SEARCH_INSIGHT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: SEARCH_INSIGHT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Search term',
      icon: 'IconSearch',
    },
    {
      universalIdentifier: SEARCH_INSIGHT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'snapshotDate',
      label: 'Reporting date',
      icon: 'IconCalendar',
    },
    {
      universalIdentifier: SEARCH_INSIGHT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'searchSource',
      label: 'Search source',
      icon: 'IconDatabaseSearch',
      isNullable: true,
    },
    {
      universalIdentifier:
        SEARCH_INSIGHT_SEARCHES_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'searchCount',
      label: 'Searches',
      icon: 'IconHash',
      isNullable: true,
    },
    {
      universalIdentifier: SEARCH_INSIGHT_CLICKS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'clickCount',
      label: 'Clicks',
      icon: 'IconClick',
      isNullable: true,
    },
    {
      universalIdentifier:
        SEARCH_INSIGHT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'conversionCount',
      label: 'Conversions',
      icon: 'IconTargetArrow',
      isNullable: true,
    },
    {
      universalIdentifier:
        SEARCH_INSIGHT_NO_RESULTS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.BOOLEAN,
      name: 'hadNoResults',
      label: 'No results',
      icon: 'IconSearchOff',
      defaultValue: false,
    },
  ],
});
