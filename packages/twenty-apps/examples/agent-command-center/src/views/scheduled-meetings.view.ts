import {
  defineView,
  ViewCalendarLayout,
  ViewType,
} from 'twenty-sdk/define';

import {
  MEETING_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
  MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ATTENDEE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ENDS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_SOURCE_EVENT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_STARTS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_SYNCED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_URL_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETINGS_VIEW_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: SCHEDULED_MEETINGS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Calendar',
  objectUniversalIdentifier: SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.CALENDAR,
  icon: 'IconCalendarEvent',
  position: 0,
  calendarLayout: ViewCalendarLayout.WEEK,
  calendarFieldMetadataUniversalIdentifier:
    SCHEDULED_MEETING_STARTS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  calendarEndFieldMetadataUniversalIdentifier:
    SCHEDULED_MEETING_ENDS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: '05746122-c10e-49e0-bf86-afc9e9c366be',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '82ffd0c0-555c-46a6-9863-0adce119680e',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: 'c25bdc95-5f7c-428f-99ec-313d0961ee92',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_STARTS_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '87dd7eb8-d4ae-43b8-afbb-308ed347015d',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_ENDS_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 3,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '674f0c65-233f-479f-952b-07f271bc1dfc',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_ATTENDEE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '55b87367-4051-475e-a993-8ae3372dceed',
      fieldMetadataUniversalIdentifier:
        MEETING_AGENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 5,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '7d2d908c-33b1-41d1-a606-166c2bfd7fcf',
      fieldMetadataUniversalIdentifier:
        MEETING_TASK_FIELD_UNIVERSAL_IDENTIFIER,
      position: 6,
      isVisible: true,
      size: 200,
    },
    {
      universalIdentifier: 'f5a1017e-1a9d-436e-91db-7769b1a03f37',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_URL_FIELD_UNIVERSAL_IDENTIFIER,
      position: 7,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: 'eee7804b-2cc5-4998-9d33-b81a7b813f1c',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_SOURCE_EVENT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 8,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6df71953-1cc0-42be-9f6c-739c63bd6bf9',
      fieldMetadataUniversalIdentifier:
        SCHEDULED_MEETING_SYNCED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      position: 9,
      isVisible: true,
      size: 170,
    },
  ],
});
