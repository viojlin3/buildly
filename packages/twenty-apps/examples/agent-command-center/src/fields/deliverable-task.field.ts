import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_DELIVERABLES_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'task',
  label: 'Task',
  icon: 'IconCheckbox',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_DELIVERABLES_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'taskId',
  },
});

