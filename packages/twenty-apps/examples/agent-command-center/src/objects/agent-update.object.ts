import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  AGENT_UPDATE_MESSAGE_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_METADATA_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OCCURRED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export const AGENT_UPDATE_TYPE_OPTIONS = [
  {
    id: '6b20b84b-62e1-40b0-bee6-89f2240caa31',
    value: 'STATUS',
    label: 'Status',
    position: 0,
    color: 'blue',
  },
  {
    id: '834aa96c-12c3-4945-be83-b589876083b3',
    value: 'PROGRESS',
    label: 'Progress',
    position: 1,
    color: 'green',
  },
  {
    id: 'daee14d1-ea1b-48bf-a65f-f73c438450b0',
    value: 'HANDOFF',
    label: 'Handoff',
    position: 2,
    color: 'purple',
  },
  {
    id: '439ec6b0-8f80-4be4-8654-d6817c384f6e',
    value: 'BLOCKER',
    label: 'Blocker',
    position: 3,
    color: 'orange',
  },
  {
    id: 'acfe029c-bf16-4171-9dd6-1e71a82cff11',
    value: 'DELIVERABLE',
    label: 'Deliverable',
    position: 4,
    color: 'green',
  },
  {
    id: 'f88ec5e5-51f0-467e-8cef-93e68739b11c',
    value: 'ERROR',
    label: 'Error',
    position: 5,
    color: 'red',
  },
] as const;

export default defineObject({
  universalIdentifier: AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'agentUpdate',
  namePlural: 'agentUpdates',
  labelSingular: 'Agent update',
  labelPlural: 'Agent updates',
  description: 'A timestamped event emitted during an agent run.',
  icon: 'IconTimelineEvent',
  labelIdentifierFieldMetadataUniversalIdentifier:
    AGENT_UPDATE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: AGENT_UPDATE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Title',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: AGENT_UPDATE_TYPE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'type',
      label: 'Type',
      icon: 'IconCategory',
      defaultValue: "'PROGRESS'",
      options: [...AGENT_UPDATE_TYPE_OPTIONS],
    },
    {
      universalIdentifier: AGENT_UPDATE_MESSAGE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'message',
      label: 'Message',
      icon: 'IconMessage',
    },
    {
      universalIdentifier: AGENT_UPDATE_OCCURRED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'occurredAt',
      label: 'Occurred at',
      icon: 'IconClock',
    },
    {
      universalIdentifier: AGENT_UPDATE_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'progress',
      label: 'Progress (%)',
      icon: 'IconPercentage',
      isNullable: true,
    },
    {
      universalIdentifier: AGENT_UPDATE_METADATA_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RAW_JSON,
      name: 'metadata',
      label: 'Metadata',
      icon: 'IconBraces',
      isNullable: true,
    },
  ],
});
