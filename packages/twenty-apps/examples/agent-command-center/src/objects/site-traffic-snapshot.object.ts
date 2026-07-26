import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  TRAFFIC_SNAPSHOT_AVERAGE_SESSION_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_BOUNCE_RATE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_PAGE_VIEWS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_SESSIONS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_VISITORS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'siteTrafficSnapshot',
  namePlural: 'siteTrafficSnapshots',
  labelSingular: 'Site traffic snapshot',
  labelPlural: 'Site traffic',
  description:
    'A dated website analytics snapshot imported manually or by a workflow.',
  icon: 'IconChartLine',
  labelIdentifierFieldMetadataUniversalIdentifier:
    TRAFFIC_SNAPSHOT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Snapshot',
      icon: 'IconChartLine',
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE,
      name: 'snapshotDate',
      label: 'Reporting date',
      icon: 'IconCalendar',
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'analyticsSource',
      label: 'Analytics source',
      icon: 'IconDatabase',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_VISITORS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'uniqueVisitors',
      label: 'Unique visitors',
      icon: 'IconUsers',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_SESSIONS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'sessions',
      label: 'Sessions',
      icon: 'IconActivity',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_PAGE_VIEWS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'pageViews',
      label: 'Page views',
      icon: 'IconEye',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'conversions',
      label: 'Conversions',
      icon: 'IconTargetArrow',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'conversionRate',
      label: 'Conversion rate (%)',
      icon: 'IconPercentage',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_BOUNCE_RATE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'bounceRate',
      label: 'Bounce rate (%)',
      icon: 'IconArrowBounce',
      isNullable: true,
    },
    {
      universalIdentifier:
        TRAFFIC_SNAPSHOT_AVERAGE_SESSION_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'averageSessionSeconds',
      label: 'Average session (seconds)',
      icon: 'IconClock',
      isNullable: true,
    },
  ],
});
