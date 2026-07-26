import { defineView, ViewType } from 'twenty-sdk/define';

import {
  AGENT_TASK_DUE_AT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_PROJECT_FIELD_UNIVERSAL_IDENTIFIER,
  TASKS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: TASKS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'All agent tasks',
  objectUniversalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconListCheck',
  position: 0,
  fields: [
    {
      universalIdentifier: '5d93ecba-86cf-4f26-8f80-2759b8ed43b1',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '2f67496c-57b0-4c35-ae4e-58ff8c57dffc',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: 'b615fa70-ee3a-4bc3-945a-5423af81691d',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '64018f0a-a7a6-4979-b652-4410114a8ee1',
      fieldMetadataUniversalIdentifier: TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '1f899134-3110-4155-9cf1-497807e86ff7',
      fieldMetadataUniversalIdentifier: TASK_PROJECT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '7e940c5f-2045-433f-b092-9f17215b0a2f',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 110,
    },
    {
      universalIdentifier: 'aac298c9-44a0-4860-9521-27304b112d36',
      fieldMetadataUniversalIdentifier:
        AGENT_TASK_DUE_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 160,
    },
  ],
});

