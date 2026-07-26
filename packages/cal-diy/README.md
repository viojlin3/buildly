# Local Cal.diy

This folder runs Cal.diy as a separate local scheduling service alongside
Twenty. It has its own PostgreSQL database and does not read or modify Twenty's
database.

## Start

```bash
cd packages/cal-diy
docker compose up -d
```

The first image download is approximately 1.5 GB. Once the app is healthy,
open <http://localhost:3001/auth/setup> and complete the first-user setup
wizard. Later visits to <http://localhost:3001> will open the login page.

If the calendar step blocks initial setup, open
<http://localhost:3001/event-types>. Calendar integrations can be connected
later from Settings > Integrations.

## Status and logs

```bash
docker compose ps
docker compose logs -f app
```

## Stop or restart

```bash
docker compose down
docker compose restart app
```

`docker compose down` preserves the PostgreSQL volume. Do not add `--volumes`
unless you intentionally want to erase all Cal.diy data.

## Ports and data

- Twenty remains at <http://localhost:3000>.
- Cal.diy is available only from this Mac at <http://localhost:3001>.
- PostgreSQL is internal to the Compose network and has no host port.
- Cal.diy data is stored in the `cal-diy_database-data` Docker volume.

## OAuth integrations

OAuth credentials are not needed for the initial local trial. To connect Google
Calendar or Google sign-in, create Google OAuth credentials, then set
`GOOGLE_API_CREDENTIALS` and `GOOGLE_LOGIN_ENABLED=true` in `.env`.

The redirect URIs must use the Cal.diy URL on port 3001, not Twenty's URL on
port 3000. OpenAI OAuth is unrelated to Cal.diy's calendar integrations.

## Synchronize bookings to Twenty

Agent Command Center adds a signed webhook endpoint and a **Scheduled
Meetings** area to Twenty. After completing the Cal.diy first-user setup:

1. Open **Settings > Developer > Webhooks** in Cal.diy.
2. Set the subscriber URL to
   `http://host.docker.internal:3000/s/agent-command-center/cal-diy-webhook`.
3. Subscribe to booking created, requested, rescheduled, cancelled, and
   rejected events.
4. Paste the value of `CALDIY_TWENTY_WEBHOOK_SECRET` from this folder's `.env`
   into the webhook secret field.

The matching secret is stored in Twenty under **Settings > Applications >
Agent Command Center** as `CALDIY_WEBHOOK_SECRET`. Do not use a Twenty API key
as the webhook secret. The app verifies the Cal.diy signature and then creates
or updates one Scheduled Meeting per Cal.diy booking.

Because Cal.diy sends webhooks from inside Docker, use
`host.docker.internal` in the subscriber URL even though Twenty opens in your
browser at <http://localhost:3000>.

## Image note

As of July 2026, the repository's documented `calcom/cal.diy` registry has no
published tags. This Apple Silicon setup pins
`calcom/cal.com:v6.2.0-arm`, the last official ARM64 image for the open-source
v6.2.0 release. When Cal.diy begins publishing its own images, update
`CALDIY_IMAGE` in `.env` and `.env.example`.
