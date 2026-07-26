import { defineView, ViewType } from 'twenty-sdk/define';

import {
  AGENT_RUN_CURRENT_ACTION_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_HEARTBEAT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_STARTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_RUN_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  RUNS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: RUNS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent runs',
  objectUniversalIdentifier: AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconPlayerPlay',
  position: 0,
  fields: [
    {
      universalIdentifier: '9c6f1e42-0f97-4940-98c4-04de0c519d0d',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '477a5bc9-1383-4be9-a292-b782ba98217e',
      fieldMetadataUniversalIdentifier: RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: 'e18150ca-a26f-4a06-9704-0b010cb6db38',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '541729e8-56a5-4174-b2c2-43d04cf15992',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_CURRENT_ACTION_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '4d509bdd-2091-4cd0-8c33-d1e235f43a6e',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 100,
    },
    {
      universalIdentifier: '9a8d5012-a672-4c60-bf83-93047d915877',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '7494718a-c2ed-4335-b2be-c049009a4cd7',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_STARTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: 'f457e2a5-a3c2-42f0-bd31-ee801efd77f2',
      fieldMetadataUniversalIdentifier:
        AGENT_RUN_HEARTBEAT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 7,
      isVisible: true,
      size: 160,
    },
  ],
});

