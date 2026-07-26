import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  RUN_UPDATES_FIELD_UNIVERSAL_IDENTIFIER,
  UPDATE_RUN_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: RUN_UPDATES_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: AGENT_RUN_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'updates',
  label: 'Updates',
  icon: 'IconTimelineEvent',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    AGENT_UPDATE_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    UPDATE_RUN_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

