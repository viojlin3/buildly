import { defineView, ViewType } from 'twenty-sdk/define';

import {
  PROJECT_BUDGET_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_SPEND_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_TARGET_DATE_FIELD_UNIVERSAL_IDENTIFIER,
  PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: PROJECTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent projects',
  objectUniversalIdentifier: PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconBriefcase',
  position: 0,
  fields: [
    {
      universalIdentifier: '32334c53-11cf-4b25-b391-d196ba94ab18',
      fieldMetadataUniversalIdentifier:
        PROJECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: 'ad37a275-4e8c-4c15-8bd0-e348ba6c3ff4',
      fieldMetadataUniversalIdentifier:
        PROJECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: 'e73ee83f-91bc-45f6-91af-305a6635e374',
      fieldMetadataUniversalIdentifier:
        PROJECT_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '62870ec9-5dbf-4fbe-b77b-28a8917e9fb0',
      fieldMetadataUniversalIdentifier:
        PROJECT_BUDGET_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '1cf6b98e-ae34-4d6d-93f6-30fe3494128a',
      fieldMetadataUniversalIdentifier:
        PROJECT_SPEND_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '0861e7f7-5b07-4c0e-8de7-3c29517442a9',
      fieldMetadataUniversalIdentifier:
        PROJECT_TARGET_DATE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 160,
    },
  ],
});

