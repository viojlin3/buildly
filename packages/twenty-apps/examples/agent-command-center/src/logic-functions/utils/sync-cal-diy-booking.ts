import { createHmac, timingSafeEqual } from 'crypto';

import { RestApiClient } from 'twenty-client-sdk/rest';

const SUPPORTED_TRIGGER_EVENTS = [
  'BOOKING_CREATED',
  'BOOKING_REQUESTED',
  'BOOKING_RESCHEDULED',
  'BOOKING_CANCELLED',
  'BOOKING_REJECTED',
] as const;

type SupportedTriggerEvent = (typeof SUPPORTED_TRIGGER_EVENTS)[number];
type JsonRecord = Record<string, unknown>;

type RestListResponse<TRecord> = {
  data?: Record<string, TRecord[] | undefined>;
};

type RestMutationResponse<TRecord> = {
  data?: Record<string, TRecord | undefined>;
};

type ScheduledMeetingRecord = {
  id: string;
  externalId?: string | null;
};

export type ParsedCalDiyBooking = {
  externalId: string;
  name: string;
  bookingUid?: string;
  bookingStatus: 'ACCEPTED' | 'PENDING' | 'CANCELLED' | 'REJECTED';
  sourceEvent: SupportedTriggerEvent;
  startsAt: string;
  endsAt: string;
  attendeeName?: string;
  attendeeEmail?: string;
  organizerName?: string;
  organizerEmail?: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  price?: number;
  currency?: string;
  assignedAgentId?: string;
  agentTaskId?: string;
  rawPayload: JsonRecord;
};

export type SyncCalDiyBookingResult = {
  success: true;
  meetingId: string;
  externalId: string;
  status: ParsedCalDiyBooking['bookingStatus'];
  action: 'created' | 'updated';
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const asRecord = (value: unknown): JsonRecord | undefined =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : undefined;

const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined;

const asNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

const asIsoDate = (value: unknown, fieldName: string): string => {
  const dateValue = asString(value);

  if (!dateValue || Number.isNaN(Date.parse(dateValue))) {
    throw new Error(`${fieldName} must be a valid ISO date-time.`);
  }

  return new Date(dateValue).toISOString();
};

const isSupportedTriggerEvent = (
  value: unknown,
): value is SupportedTriggerEvent =>
  typeof value === 'string' &&
  SUPPORTED_TRIGGER_EVENTS.includes(value as SupportedTriggerEvent);

const statusForTrigger = (
  triggerEvent: SupportedTriggerEvent,
): ParsedCalDiyBooking['bookingStatus'] => {
  switch (triggerEvent) {
    case 'BOOKING_CREATED':
    case 'BOOKING_RESCHEDULED':
      return 'ACCEPTED';
    case 'BOOKING_REQUESTED':
      return 'PENDING';
    case 'BOOKING_CANCELLED':
      return 'CANCELLED';
    case 'BOOKING_REJECTED':
      return 'REJECTED';
  }
};

const getResponseValue = (
  responses: JsonRecord | undefined,
  key: string,
): unknown => asRecord(responses?.[key])?.value;

const getFirstString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    const stringValue = asString(value);

    if (stringValue) {
      return stringValue;
    }
  }

  return undefined;
};

const getRelationshipId = ({
  metadata,
  customInputs,
  responses,
  keys,
}: {
  metadata: JsonRecord | undefined;
  customInputs: JsonRecord | undefined;
  responses: JsonRecord | undefined;
  keys: string[];
}): string | undefined => {
  for (const key of keys) {
    const value = getFirstString(
      metadata?.[key],
      customInputs?.[key],
      getResponseValue(responses, key),
    );

    if (value && UUID_PATTERN.test(value)) {
      return value;
    }
  }

  return undefined;
};

const formatLocation = (value: unknown): string | undefined => {
  const directValue = asString(value);

  if (directValue) {
    return directValue;
  }

  const record = asRecord(value);
  const nestedValue = getFirstString(record?.value, record?.label);

  return nestedValue;
};

export const parseCalDiyBookingWebhook = (
  rawInput: unknown,
): ParsedCalDiyBooking => {
  const body = asRecord(rawInput);

  if (!body) {
    throw new Error('Webhook body must be a JSON object.');
  }

  if (!isSupportedTriggerEvent(body.triggerEvent)) {
    throw new Error(
      `triggerEvent must be one of: ${SUPPORTED_TRIGGER_EVENTS.join(', ')}.`,
    );
  }

  const payload = asRecord(body.payload);

  if (!payload) {
    throw new Error('Webhook payload must be a JSON object.');
  }

  const bookingId =
    typeof payload.bookingId === 'number' ||
    typeof payload.bookingId === 'string'
      ? String(payload.bookingId).trim()
      : '';
  const bookingUid = asString(payload.uid);
  const externalId = bookingId || bookingUid;

  if (!externalId || !/^[A-Za-z0-9_-]{1,255}$/.test(externalId)) {
    throw new Error(
      'Webhook payload must contain a safe bookingId or uid identifier.',
    );
  }

  const attendees = Array.isArray(payload.attendees)
    ? payload.attendees
    : [];
  const attendee = asRecord(attendees[0]);
  const organizer = asRecord(payload.organizer);
  const responses = asRecord(payload.responses);
  const metadata = asRecord(payload.metadata);
  const customInputs = asRecord(payload.customInputs);
  const conferenceData = asRecord(payload.conferenceData);
  const location = formatLocation(payload.location);
  const title = getFirstString(payload.title, payload.eventTitle);
  const attendeeName = getFirstString(
    attendee?.name,
    getResponseValue(responses, 'name'),
  );
  const attendeeEmail = getFirstString(
    attendee?.email,
    getResponseValue(responses, 'email'),
  );
  const meetingUrl = getFirstString(
    metadata?.videoCallUrl,
    conferenceData?.url,
    location?.startsWith('http://') || location?.startsWith('https://')
      ? location
      : undefined,
  );

  return {
    externalId,
    name: attendeeName
      ? `${title ?? 'Cal.diy meeting'} · ${attendeeName}`
      : (title ?? `Cal.diy booking ${externalId}`),
    bookingUid,
    bookingStatus: statusForTrigger(body.triggerEvent),
    sourceEvent: body.triggerEvent,
    startsAt: asIsoDate(payload.startTime, 'payload.startTime'),
    endsAt: asIsoDate(payload.endTime, 'payload.endTime'),
    attendeeName,
    attendeeEmail,
    organizerName: asString(organizer?.name),
    organizerEmail: asString(organizer?.email),
    location,
    meetingUrl,
    notes: getFirstString(
      payload.cancellationReason,
      payload.additionalNotes,
      payload.description,
    ),
    price: asNumber(payload.price),
    currency: asString(payload.currency),
    assignedAgentId: getRelationshipId({
      metadata,
      customInputs,
      responses,
      keys: ['assignedAgentId', 'agentId', 'twentyAgentId'],
    }),
    agentTaskId: getRelationshipId({
      metadata,
      customInputs,
      responses,
      keys: ['agentTaskId', 'taskId', 'twentyTaskId'],
    }),
    rawPayload: body,
  };
};

export const verifyCalDiyWebhookSignature = ({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string | undefined;
  secret: string;
}): boolean => {
  const provided = asString(signature)?.toLowerCase();

  if (!provided || !/^[0-9a-f]{64}$/.test(provided)) {
    return false;
  }

  const expected = createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');
  const providedBuffer = Buffer.from(provided, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
};

const getRecords = <TRecord>(
  response: RestListResponse<TRecord>,
  objectNamePlural: string,
): TRecord[] => response.data?.[objectNamePlural] ?? [];

const getMutationRecord = <TRecord>(
  response: RestMutationResponse<TRecord>,
): TRecord | undefined => Object.values(response.data ?? {})[0];

export const syncCalDiyBooking = async (
  rawInput: unknown,
  client = new RestApiClient(),
  syncedAt = new Date().toISOString(),
): Promise<SyncCalDiyBookingResult> => {
  const booking = parseCalDiyBookingWebhook(rawInput);
  const existingResponse = await client.get<
    RestListResponse<ScheduledMeetingRecord>
  >('/rest/scheduledMeetings', {
    query: {
      filter: `externalId[eq]:"${booking.externalId}"`,
      limit: 1,
    },
  });
  const existing = getRecords(
    existingResponse,
    'scheduledMeetings',
  )[0];
  const payload = {
    name: booking.name,
    externalId: booking.externalId,
    bookingUid: booking.bookingUid,
    bookingStatus: booking.bookingStatus,
    sourceEvent: booking.sourceEvent,
    startsAt: booking.startsAt,
    endsAt: booking.endsAt,
    attendeeName: booking.attendeeName,
    attendeeEmail: booking.attendeeEmail,
    organizerName: booking.organizerName,
    organizerEmail: booking.organizerEmail,
    location: booking.location,
    meetingUrl: booking.meetingUrl,
    notes: booking.notes,
    price: booking.price,
    bookingCurrency: booking.currency,
    syncedAt,
    rawPayload: booking.rawPayload,
    assignedAgentId: booking.assignedAgentId,
    agentTaskId: booking.agentTaskId,
  };

  if (existing) {
    const response = await client.patch<
      RestMutationResponse<ScheduledMeetingRecord>
    >(`/rest/scheduledMeetings/${existing.id}`, payload);
    const meeting = getMutationRecord(response) ?? existing;

    return {
      success: true,
      meetingId: meeting.id,
      externalId: booking.externalId,
      status: booking.bookingStatus,
      action: 'updated',
    };
  }

  const response = await client.post<
    RestMutationResponse<ScheduledMeetingRecord>
  >('/rest/scheduledMeetings', payload);
  const meeting = getMutationRecord(response);

  if (!meeting) {
    throw new Error('Twenty did not return the synchronized meeting.');
  }

  return {
    success: true,
    meetingId: meeting.id,
    externalId: booking.externalId,
    status: booking.bookingStatus,
    action: 'created',
  };
};
