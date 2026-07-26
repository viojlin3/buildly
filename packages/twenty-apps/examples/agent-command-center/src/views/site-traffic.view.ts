import { defineView, ViewType } from 'twenty-sdk/define';

import {
  TRAFFIC_SNAPSHOT_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_PAGE_VIEWS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOT_VISITORS_FIELD_UNIVERSAL_IDENTIFIER,
  TRAFFIC_SNAPSHOTS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: TRAFFIC_SNAPSHOTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Site traffic',
  objectUniversalIdentifier: TRAFFIC_SNAPSHOT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconChartLine',
  position: 0,
  fields: [
    {
      universalIdentifier: 'd4ed0830-4503-4776-9c5d-cf1231619d42',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'e91ed662-12e1-4a70-b1dc-75cb85be2353',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'c533745c-aa10-44f1-87a4-15afc910ebeb',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: 'e33182d7-97b3-43ed-bc98-6cf2c18ee6ae',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_VISITORS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'd4e43d08-f9b5-4f4a-81fb-476523f00932',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_PAGE_VIEWS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '82f4c666-e6de-484d-829b-8d0c9c872cb4',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_CONVERSIONS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '1ae22159-8e3f-4751-919a-335421d232f4',
      fieldMetadataUniversalIdentifier:
        TRAFFIC_SNAPSHOT_CONVERSION_RATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 150,
    },
  ],
});
