import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: AGENT_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'runs',
  label: 'Runs',
  icon: 'IconPlayerPlay',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

