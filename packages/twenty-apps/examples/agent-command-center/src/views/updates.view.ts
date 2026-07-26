import { defineView, ViewType } from 'twenty-sdk/define';

import {
  AGENT_UPDATE_MESSAGE_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OCCURRED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
  UPDATE_RUN_FIELD_UNIVERSAL_IDENTIFIER,
  UPDATES_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: UPDATES_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent updates',
  objectUniversalIdentifier: AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconTimelineEvent',
  position: 0,
  fields: [
    {
      universalIdentifier: '2acf81b0-2164-446e-977c-380c004c26d4',
      fieldMetadataUniversalIdentifier:
        AGENT_UPDATE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '233b32b3-c1e0-4869-9bd3-9d8d05447f4e',
      fieldMetadataUniversalIdentifier:
        AGENT_UPDATE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '464818d3-51cb-487c-8334-cef24ee0c080',
      fieldMetadataUniversalIdentifier:
        AGENT_UPDATE_MESSAGE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 380,
    },
    {
      universalIdentifier: 'a66f8c2c-44f6-4939-b2d2-8091a3bebd97',
      fieldMetadataUniversalIdentifier:
        UPDATE_RUN_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '5310677b-72db-4009-b070-126d98ec14d8',
      fieldMetadataUniversalIdentifier:
        AGENT_UPDATE_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 100,
    },
    {
      universalIdentifier: '85da4c4d-f14b-4c60-869c-0f71fb93e873',
      fieldMetadataUniversalIdentifier:
        AGENT_UPDATE_OCCURRED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 170,
    },
  ],
});

