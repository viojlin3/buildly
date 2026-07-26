import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  AGENT_TASK_BLOCKED_REASON_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_DESCRIPTION_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_DUE_AT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_RESULT_FIELD_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export const AGENT_TASK_STATUS_OPTIONS = [
  {
    id: '286ce764-937d-49a8-a326-592e404c95e2',
    value: 'BACKLOG',
    label: 'Backlog',
    position: 0,
    color: 'gray',
  },
  {
    id: '617b27ac-6a3f-4929-8340-daee44652d84',
    value: 'READY',
    label: 'Ready',
    position: 1,
    color: 'blue',
  },
  {
    id: '65aec2e3-9dbd-4e9d-9d8b-0a72fe3dccb6',
    value: 'IN_PROGRESS',
    label: 'In progress',
    position: 2,
    color: 'green',
  },
  {
    id: '20366bd9-cac8-4606-bda7-251d12ee7937',
    value: 'WAITING',
    label: 'Waiting',
    position: 3,
    color: 'blue',
  },
  {
    id: '579893ee-4299-480c-9a2f-d17bca9d47ea',
    value: 'BLOCKED',
    label: 'Blocked',
    position: 4,
    color: 'orange',
  },
  {
    id: '32733cbd-dfcf-41a7-9cfa-02653cdcbbe6',
    value: 'REVIEW',
    label: 'Review',
    position: 5,
    color: 'purple',
  },
  {
    id: '18c904ac-fdd5-4517-811c-6e6156d9d1c1',
    value: 'DONE',
    label: 'Done',
    position: 6,
    color: 'green',
  },
  {
    id: 'd9c59e88-65fe-427c-bf2c-f860286cbce7',
    value: 'CANCELLED',
    label: 'Cancelled',
    position: 7,
    color: 'red',
  },
] as const;

export const AGENT_TASK_PRIORITY_OPTIONS = [
  {
    id: '525731fd-7e97-416d-b914-0af0c699287c',
    value: 'LOW',
    label: 'Low',
    position: 0,
    color: 'gray',
  },
  {
    id: '08833b11-82f2-49a2-9413-172356535c32',
    value: 'MEDIUM',
    label: 'Medium',
    position: 1,
    color: 'blue',
  },
  {
    id: 'ed986343-03ca-4222-8489-d263add8c278',
    value: 'HIGH',
    label: 'High',
    position: 2,
    color: 'orange',
  },
  {
    id: '93046791-e497-41c3-b029-ac137cb94a50',
    value: 'URGENT',
    label: 'Urgent',
    position: 3,
    color: 'red',
  },
] as const;

export default defineObject({
  universalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'agentTask',
  namePlural: 'agentTasks',
  labelSingular: 'Agent task',
  labelPlural: 'Agent tasks',
  description: 'A unit of work assigned to a specialized agent.',
  icon: 'IconChecklist',
  labelIdentifierFieldMetadataUniversalIdentifier:
    AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: AGENT_TASK_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Task',
      icon: 'IconCheckbox',
    },
    {
      universalIdentifier: AGENT_TASK_DESCRIPTION_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RICH_TEXT,
      name: 'description',
      label: 'Instructions',
      icon: 'IconNotes',
      isNullable: true,
    },
    {
      universalIdentifier: AGENT_TASK_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      icon: 'IconProgress',
      defaultValue: "'BACKLOG'",
      options: [...AGENT_TASK_STATUS_OPTIONS],
    },
    {
      universalIdentifier: AGENT_TASK_PRIORITY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'priority',
      label: 'Priority',
      icon: 'IconFlag',
      defaultValue: "'MEDIUM'",
      options: [...AGENT_TASK_PRIORITY_OPTIONS],
    },
    {
      universalIdentifier: AGENT_TASK_PROGRESS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'progress',
      label: 'Progress (%)',
      icon: 'IconPercentage',
      isNullable: true,
    },
    {
      universalIdentifier: AGENT_TASK_DUE_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'dueAt',
      label: 'Due at',
      icon: 'IconCalendarDue',
      isNullable: true,
    },
    {
      universalIdentifier:
        AGENT_TASK_BLOCKED_REASON_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'blockedReason',
      label: 'Blocked reason',
      icon: 'IconBarrierBlock',
      isNullable: true,
    },
    {
      universalIdentifier: AGENT_TASK_RESULT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'result',
      label: 'Result',
      icon: 'IconSparkles',
      isNullable: true,
    },
  ],
});
