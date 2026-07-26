import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: RUN_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'agent',
  label: 'Agent',
  icon: 'IconRobot',
  relationTargetObjectMetadataUniversalIdentifier:
    MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    AGENT_RUNS_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'agentId',
  },
});

