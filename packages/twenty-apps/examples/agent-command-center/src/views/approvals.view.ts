import { defineView, ViewType } from 'twenty-sdk/define';

import {
  APPROVAL_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  APPROVAL_REQUESTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_REQUEST_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVALS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: APPROVALS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Agent approvals',
  objectUniversalIdentifier: APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconUserCheck',
  position: 0,
  fields: [
    {
      universalIdentifier: '63ca936a-c33b-4f06-8aa8-056226c8918f',
      fieldMetadataUniversalIdentifier:
        APPROVAL_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '45f639ec-b68e-4cbe-b619-42a8d0eaa9fc',
      fieldMetadataUniversalIdentifier:
        APPROVAL_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '51386aba-b815-46c8-98be-a65edc3d8f94',
      fieldMetadataUniversalIdentifier:
        APPROVAL_REQUEST_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 360,
    },
    {
      universalIdentifier: '308a96d8-d950-4b8d-8e7c-e83b370777c1',
      fieldMetadataUniversalIdentifier:
        APPROVAL_TASK_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '985be418-1a50-4b77-8ba5-a2ab465fcaf7',
      fieldMetadataUniversalIdentifier:
        APPROVAL_REQUESTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 170,
    },
  ],
});

