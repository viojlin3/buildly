import { createHmac } from 'crypto';

import { type RestApiClient } from 'twenty-client-sdk/rest';
import { describe, expect, it, vi } from 'vitest';

import {
  parseCalDiyBookingWebhook,
  syncCalDiyBooking,
  verifyCalDiyWebhookSignature,
} from 'src/logic-functions/utils/sync-cal-diy-booking';

const AGENT_ID = 'a6a1138a-e904-48c8-91be-1134363a7b80';
const TASK_ID = 'b8f31395-c55c-47cb-b165-ae9176a83b0e';

const makeWebhook = (
  triggerEvent:
    | 'BOOKING_CREATED'
    | 'BOOKING_REQUESTED'
    | 'BOOKING_RESCHEDULED'
    | 'BOOKING_CANCELLED'
    | 'BOOKING_REJECTED' = 'BOOKING_CREATED',
) => ({
  triggerEvent,
  createdAt: '2026-07-25T18:00:00.000Z',
  payload: {
    bookingId: 42,
    uid: 'booking-uid-42',
    title: 'Project kickoff',
    startTime: '2026-07-28T15:00:00.000Z',
    endTime: '2026-07-28T15:30:00.000Z',
    location: 'https://meet.example.test/kickoff',
    attendees: [
      {
        name: 'Client Person',
        email: 'client@example.test',
      },
    ],
    organizer: {
      name: 'PM Agent',
      email: 'pm@example.test',
    },
    metadata: {
      videoCallUrl: 'https://video.example.test/room',
      assignedAgentId: AGENT_ID,
      agentTaskId: TASK_ID,
    },
    price: 2500,
    currency: 'usd',
  },
});

describe('parseCalDiyBookingWebhook', () => {
  it('maps a Cal.diy booking and workspace relationships', () => {
    const result = parseCalDiyBookingWebhook(makeWebhook());

    expect(result).toMatchObject({
      externalId: '42',
      bookingUid: 'booking-uid-42',
      name: 'Project kickoff · Client Person',
      bookingStatus: 'ACCEPTED',
      sourceEvent: 'BOOKING_CREATED',
      attendeeEmail: 'client@example.test',
      organizerName: 'PM Agent',
      meetingUrl: 'https://video.example.test/room',
      assignedAgentId: AGENT_ID,
      agentTaskId: TASK_ID,
      price: 2500,
      currency: 'usd',
    });
  });

  it('maps cancellation and rejects invalid identifiers', () => {
    expect(
      parseCalDiyBookingWebhook(makeWebhook('BOOKING_CANCELLED'))
        .bookingStatus,
    ).toBe('CANCELLED');

    expect(() =>
      parseCalDiyBookingWebhook({
        ...makeWebhook(),
        payload: {
          ...makeWebhook().payload,
          bookingId: 'invalid id with spaces',
          uid: undefined,
        },
      }),
    ).toThrow('safe bookingId or uid');
  });
});

describe('verifyCalDiyWebhookSignature', () => {
  it('accepts only a matching SHA-256 HMAC', () => {
    const rawBody = JSON.stringify(makeWebhook());
    const secret = 'cal-diy-test-secret';
    const signature = createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    expect(
      verifyCalDiyWebhookSignature({ rawBody, signature, secret }),
    ).toBe(true);
    expect(
      verifyCalDiyWebhookSignature({
        rawBody,
        signature: '0'.repeat(64),
        secret,
      }),
    ).toBe(false);
  });
});

describe('syncCalDiyBooking', () => {
  it('creates a Scheduled Meeting when the booking is new', async () => {
    const client = {
      get: vi.fn().mockResolvedValue({
        data: { scheduledMeetings: [] },
      }),
      post: vi.fn().mockResolvedValue({
        data: { createScheduledMeeting: { id: 'meeting-1' } },
      }),
      patch: vi.fn(),
    } as unknown as RestApiClient;

    const result = await syncCalDiyBooking(
      makeWebhook(),
      client,
      '2026-07-25T18:01:00.000Z',
    );

    expect(result).toEqual({
      success: true,
      meetingId: 'meeting-1',
      externalId: '42',
      status: 'ACCEPTED',
      action: 'created',
    });
    expect(client.post).toHaveBeenCalledWith(
      '/rest/scheduledMeetings',
      expect.objectContaining({
        externalId: '42',
        assignedAgentId: AGENT_ID,
        agentTaskId: TASK_ID,
        syncedAt: '2026-07-25T18:01:00.000Z',
      }),
    );
  });

  it('updates the existing meeting for repeat webhook deliveries', async () => {
    const client = {
      get: vi.fn().mockResolvedValue({
        data: {
          scheduledMeetings: [{ id: 'meeting-1', externalId: '42' }],
        },
      }),
      post: vi.fn(),
      patch: vi.fn().mockResolvedValue({
        data: { updateScheduledMeeting: { id: 'meeting-1' } },
      }),
    } as unknown as RestApiClient;

    const result = await syncCalDiyBooking(
      makeWebhook('BOOKING_CANCELLED'),
      client,
    );

    expect(result.action).toBe('updated');
    expect(result.status).toBe('CANCELLED');
    expect(client.patch).toHaveBeenCalledWith(
      '/rest/scheduledMeetings/meeting-1',
      expect.objectContaining({ bookingStatus: 'CANCELLED' }),
    );
    expect(client.post).not.toHaveBeenCalled();
  });
});

