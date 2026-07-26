import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASKS_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: AGENT_TASKS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'assignedTasks',
  label: 'Assigned tasks',
  icon: 'IconChecklist',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    TASK_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

