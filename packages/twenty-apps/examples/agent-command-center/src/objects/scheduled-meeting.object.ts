import { defineObject, FieldType } from 'twenty-sdk/define';

import {
  SCHEDULED_MEETING_ATTENDEE_EMAIL_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ATTENDEE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_CURRENCY_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ENDS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_LOCATION_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ORGANIZER_EMAIL_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_ORGANIZER_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_RAW_PAYLOAD_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_SOURCE_EVENT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_STARTS_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_SYNCED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_UID_FIELD_UNIVERSAL_IDENTIFIER,
  SCHEDULED_MEETING_URL_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export const SCHEDULED_MEETING_STATUS_OPTIONS = [
  {
    id: '9d6aa694-dbad-4ac7-8645-8f8504f63ada',
    value: 'ACCEPTED',
    label: 'Accepted',
    position: 0,
    color: 'green',
  },
  {
    id: '71b948f1-ecaf-4021-8f1f-7e9f8c1f9d66',
    value: 'PENDING',
    label: 'Pending',
    position: 1,
    color: 'orange',
  },
  {
    id: '96e35f21-2422-410b-b4b0-80d5bd7fef20',
    value: 'CANCELLED',
    label: 'Cancelled',
    position: 2,
    color: 'red',
  },
  {
    id: '09c5e35e-afe1-4413-ac5c-445057193bd2',
    value: 'REJECTED',
    label: 'Rejected',
    position: 3,
    color: 'red',
  },
] as const;

export default defineObject({
  universalIdentifier: SCHEDULED_MEETING_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'scheduledMeeting',
  namePlural: 'scheduledMeetings',
  labelSingular: 'Calendar event',
  labelPlural: 'Calendar',
  description:
    'A Cal.diy booking synchronized into the workspace calendar.',
  icon: 'IconCalendarEvent',
  labelIdentifierFieldMetadataUniversalIdentifier:
    SCHEDULED_MEETING_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: SCHEDULED_MEETING_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'name',
      label: 'Event',
      icon: 'IconCalendarEvent',
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_EXTERNAL_ID_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'externalId',
      label: 'Cal.diy booking ID',
      icon: 'IconId',
      isUnique: true,
    },
    {
      universalIdentifier: SCHEDULED_MEETING_UID_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'bookingUid',
      label: 'Booking UID',
      icon: 'IconFingerprint',
      isNullable: true,
    },
    {
      universalIdentifier: SCHEDULED_MEETING_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'bookingStatus',
      label: 'Status',
      icon: 'IconProgress',
      defaultValue: "'ACCEPTED'",
      options: [...SCHEDULED_MEETING_STATUS_OPTIONS],
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_SOURCE_EVENT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'sourceEvent',
      label: 'Cal.diy event',
      icon: 'IconWebhook',
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_STARTS_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'startsAt',
      label: 'Starts at',
      icon: 'IconCalendarTime',
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_ENDS_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'endsAt',
      label: 'Ends at',
      icon: 'IconCalendarTime',
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_ATTENDEE_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'attendeeName',
      label: 'Attendee',
      icon: 'IconUser',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_ATTENDEE_EMAIL_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'attendeeEmail',
      label: 'Attendee email',
      icon: 'IconMail',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_ORGANIZER_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'organizerName',
      label: 'Organizer',
      icon: 'IconUserCheck',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_ORGANIZER_EMAIL_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'organizerEmail',
      label: 'Organizer email',
      icon: 'IconMail',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_LOCATION_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'location',
      label: 'Location',
      icon: 'IconMapPin',
      isNullable: true,
    },
    {
      universalIdentifier: SCHEDULED_MEETING_URL_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'meetingUrl',
      label: 'Meeting URL',
      icon: 'IconVideo',
      isNullable: true,
    },
    {
      universalIdentifier: SCHEDULED_MEETING_NOTES_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
      isNullable: true,
    },
    {
      universalIdentifier: SCHEDULED_MEETING_PRICE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.NUMBER,
      name: 'price',
      label: 'Price',
      icon: 'IconCurrencyDollar',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_CURRENCY_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'bookingCurrency',
      label: 'Currency',
      icon: 'IconCoins',
      isNullable: true,
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_SYNCED_AT_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.DATE_TIME,
      name: 'syncedAt',
      label: 'Synced at',
      icon: 'IconRefresh',
    },
    {
      universalIdentifier:
        SCHEDULED_MEETING_RAW_PAYLOAD_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.RAW_JSON,
      name: 'rawPayload',
      label: 'Webhook payload',
      icon: 'IconBraces',
      isNullable: true,
    },
  ],
});
