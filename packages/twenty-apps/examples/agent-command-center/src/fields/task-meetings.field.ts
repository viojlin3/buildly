import { defineField, FieldType, RelationType } from 'twenty-sdk/define';

import {
  AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: TASK_MEETINGS_FIELD_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: AGENT_TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'scheduledMeetings',
  label: 'Scheduled meetings',
  icon: 'IconCalendarEvent',
  isNullable: true,
  relationTargetObjectMetadataUniversalIdentifier:
    SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetFieldMetadataUniversalIdentifier:
    MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});

