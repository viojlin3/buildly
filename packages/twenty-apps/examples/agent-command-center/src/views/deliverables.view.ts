import { defineView, ViewType } from 'twenty-sdk/define';

import {
  DELIVERABLE_FILES_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_URL_FIELD_UNIVERSAL_IDENTIFIER,
  DELIVERABLES_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: DELIVERABLES_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent deliverables',
  objectUniversalIdentifier: DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconPackageExport',
  position: 0,
  fields: [
    {
      universalIdentifier: 'cd9035c0-01e4-4eca-b7af-fb39bb52e1a0',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: 'a9ebae8a-3824-46c6-8728-7ec253fda3a5',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '7d542b34-38f5-4b1f-8827-02cd7a625724',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: 'b54a56b6-9215-4793-a28f-dfb948001045',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'e918586b-f485-4fe0-98ac-a78f4952b765',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_FILES_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: 'e892290b-1d40-4c25-9e92-32a04a16d9d2',
      fieldMetadataUniversalIdentifier:
        DELIVERABLE_URL_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 260,
    },
  ],
});

