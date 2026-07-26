import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'agentTask',
  label: 'Agent task',
  icon: 'IconChecklist',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'agentTaskId',
  },
});

