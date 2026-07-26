import { defineView, ViewType } from 'twenty-sdk/define';

import {
  AGENTS_VIEW_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_ACTIVITY_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_HEARTBEAT_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_ROLE_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_RUN_ID_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: AGENTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent roster',
  objectUniversalIdentifier: MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconRobot',
  position: 0,
  fields: [
    {
      universalIdentifier: '610808f3-73e3-4e3b-a726-ff850ec07347',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'd4a280a3-b88d-4a4e-81c4-a323afb55a38',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_ROLE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: 'c9ffed31-dc1a-48bb-85ba-270b29f0899e',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: 'db60f07b-afc9-47ff-8f91-cb74f250711f',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_ACTIVITY_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 320,
    },
    {
      universalIdentifier: 'f5479c4f-7fc6-4ac1-a609-f2f89ae360ae',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 110,
    },
    {
      universalIdentifier: '96624c91-3ed1-46aa-9de6-684c0b0817f9',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_RUN_ID_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '3ef7dfd9-bfed-4de9-8316-95718243c157',
      fieldMetadataUniversalIdentifier:
        MANAGED_AGENT_HEARTBEAT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 170,
    },
  ],
});

