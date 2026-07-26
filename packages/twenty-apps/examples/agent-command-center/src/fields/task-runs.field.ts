import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  RUN_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: TASK_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'runs',
  label: 'Runs',
  icon: 'IconPlayerPlay',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    RUN_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

