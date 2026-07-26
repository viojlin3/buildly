import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  APPROVAL_DECIDED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_DECISION_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  APPROVAL_REQUESTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_REQUEST_FIELD_UNIVERSAL_IDENTIFIER,
  APPROVAL_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineObject({
  universalIdentifier: APPROVAL_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'agentApproval',
  namePlural: 'agentApprovals',
  labelSingular: 'Agent approval',
  labelPlural: 'Agent approvals',
  description: 'A human or PM decision required before an agent continues.',
  icon: 'IconUserCheck',
  labelIdentifierFieldMetadataUniversalIdentifier:
    APPROVAL_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: APPROVAL_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Approval',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: APPROVAL_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconProgress',
      defaultValue: "'PENDING'",
      options: [
        {
          id: '8617e65f-3668-4a4f-8474-e5f17b53d5bb',
          value: 'PENDING',
          label: 'Pending',
          position: 0,
          color: 'orange',
        },
        {
          id: 'ef39bd76-2740-4625-8181-a2a9033c6e2c',
          value: 'APPROVED',
          label: 'Approved',
          position: 1,
          color: 'green',
        },
        {
          id: '3f84c8af-b3b8-448e-9196-e1ddaf4bad22',
          value: 'CHANGES_REQUESTED',
          label: 'Changes requested',
          position: 2,
          color: 'purple',
        },
        {
          id: 'f37d72cd-cd36-4991-82a5-437b02259b2c',
          value: 'REJECTED',
          label: 'Rejected',
          position: 3,
          color: 'red',
        },
      ],
    },
    {
      universalIdentifier: APPROVAL_REQUEST_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'request',
      label: 'Request',
      icon: 'IconMessageQuestion',
    },
    {
      universalIdentifier: APPROVAL_DECISION_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'decision',
      label: 'Decision notes',
      icon: 'IconMessageCheck',
      isNullable: true,
    },
    {
      universalIdentifier: APPROVAL_REQUESTED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'requestedAt',
      label: 'Requested at',
      icon: 'IconClock',
    },
    {
      universalIdentifier: APPROVAL_DECIDED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'decidedAt',
      label: 'Decided at',
      icon: 'IconClockCheck',
      isNullable: true,
    },
  ],
});

