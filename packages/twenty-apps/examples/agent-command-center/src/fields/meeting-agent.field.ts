import {
  defineField,
  FieldType,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  AGENT_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
  MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  MEETING_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: MEETING_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'assignedAgent',
  label: 'Assigned agent',
  icon: 'IconRobot',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    MANAGED_AGENT_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    AGENT_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'assignedAgentId',
  },
});

