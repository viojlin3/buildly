import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  TASK_DELIVERABLES_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: TASK_DELIVERABLES_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'deliverables',
  label: 'Deliverables',
  icon: 'IconPackageExport',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    DELIVERABLE_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    DELIVERABLE_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

