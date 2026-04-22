# JDT Inc. — Agency Website + Internal CRM

A custom marketing site **and** a fully operational internal CRM for **JDT Inc.**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma + Postgres, and custom JWT-cookie auth. Designed to look premium, load fast, deploy on Vercel for ~$0/mo, and stay easy to extend.

- Public site: editorial black & white marketing site (Home, Services, Work, About, Contact).
- Private CRM at `/admin`: login, dashboard, leads table with filters, lead detail with stages/priority/notes/activity log, manual lead entry.
- Website contact form **writes straight into the CRM** — no third-party lead tools needed.

---

## Stack

**Marketing site**
- [Next.js 14](https://nextjs.org/) App Router
- TypeScript, Tailwind CSS
- Framer Motion (subtle entrance animations only)
- Inter + Instrument Serif via `next/font`
- Calendly embed on `/contact` (no extra SDK, loaded lazily)

**CRM**
- Prisma ORM + Postgres (Neon free tier recommended)
- Custom JWT-cookie auth (`jose` + `bcryptjs`) — no NextAuth, no paid auth service
- Zod validation on every server action
- Next.js middleware protects every `/admin/*` route at the edge

Total infra cost: **Vercel Hobby ($0) + Neon Free ($0) = $0** until real scale.

---

## Quick start

Requirements: **Node.js 18.17+** (20+ recommended).

```bash
# 1. Clone and install
npm install

# 2. Create a Postgres database
#    Easiest: sign up at https://neon.tech, create a project, copy the
#    pooled connection string.

# 3. Configure env vars
cp .env.example .env
#    Edit .env and fill in:
#      DATABASE_URL    = your Neon pooled connection string
#      AUTH_SECRET     = run:  openssl rand -base64 48
#      ADMIN_EMAIL     = your login email
#      ADMIN_PASSWORD  = your login password (change after first login)

# 4. Create tables and seed the first admin + sample leads
npm run db:push
npm run db:seed

# 5. Run the site
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the CRM.

---

## Environment variables

See `.env.example` for the full template.

| Var | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string. Use the **pooled** URL from Neon. |
| `AUTH_SECRET` | Signs admin session JWTs. Generate: `openssl rand -base64 48`. Must be ≥ 16 chars in production. |
| `ADMIN_EMAIL` | Email for the initial admin user (created by `db:seed`). Also receives lead notifications, follow-up reminders, and the daily digest. |
| `ADMIN_PASSWORD` | Password for the initial admin user. Change after first login. |
| `ADMIN_NAME` | Display name for the initial admin. |
| `RESEND_API_KEY` | *(optional)* Resend key for lead emails. Blank disables notifications. See [Lead email notifications](#lead-email-notifications-resend). |
| `RESEND_FROM` | *(optional)* Verified Resend sender. |
| `APP_URL` | *(optional)* Base URL used in outbound email links. Defaults to `site.url`. |
| `CRON_SECRET` | *(optional)* Shared secret the cron endpoints require in `Authorization: Bearer …`. See [Follow-up automation](#follow-up-automation). |

---

## Scripts

```bash
npm run dev         # Dev server (http://localhost:3000)
npm run build       # prisma generate && next build
npm run start       # Start production build locally
npm run lint        # ESLint

npm run db:push     # Sync Prisma schema → Postgres (no migrations)
npm run db:migrate  # Create + apply a migration (if you want history)
npm run db:seed     # Seed admin user + 5 sample leads
npm run db:studio   # Open Prisma Studio to inspect rows
```

---

## Project structure

```
app/
  layout.tsx                 HTML shell, fonts, metadata
  not-found.tsx

  (site)/                    Public marketing site
    layout.tsx               Wraps pages with Navbar + Footer
    page.tsx                 Home
    about/page.tsx
    services/page.tsx
    work/page.tsx
    work/[slug]/page.tsx     Case study detail
    contact/page.tsx         Calendly embed + message form

  api/
    contact/route.ts         POST → creates a Lead in the CRM
    cron/
      follow-ups/route.ts    GET → per-lead follow-up reminders
      daily-digest/route.ts  GET → once-a-day summary email

  admin/                     Private CRM (behind middleware)
    layout.tsx               Bare shell (no site chrome)
    page.tsx                 Redirects to /admin/dashboard
    login/                   Login form + signIn server action
    logout/route.ts          Clears session cookie
    (authed)/                Requires valid session
      layout.tsx             Sidebar + page container
      dashboard/page.tsx     Stat cards + pipeline + recent leads
      leads/
        page.tsx             Filterable leads table
        new/                 Manual lead entry
        [id]/                Lead detail (stage, priority, notes, activity)

components/
  Navbar.tsx, Footer.tsx, Section.tsx, CTA.tsx …   (marketing)
  CalendlyEmbed.tsx                                (Calendly loader)
  ContactForm.tsx                                  (posts to /api/contact)
  admin/
    Sidebar.tsx              Dashboard / Leads / New lead nav + sign out
    PageHeader.tsx           Consistent admin page header
    StatCard.tsx             Dashboard KPI card
    StatusBadge.tsx          Stage pill with colored dot
    PriorityBadge.tsx        Priority pill with colored dot
    ActivityList.tsx         Renders activity log entries
    LeadFilters.tsx          URL-driven filters for the leads table
    InlineSelectForm.tsx     Auto-submitting stage/priority select

lib/
  site.ts                    Brand info, nav, socials, Calendly link
  services.ts, caseStudies.ts
  cn.ts, format.ts

  db.ts                      Prisma client singleton
  crm.ts                     Stages, priorities, sources, color maps, activity types
  validators.ts              Zod schemas (contact form + every admin action)
  leads.ts                   All lead reads/writes + activity logging
  auth.ts                    Password hashing + session JWT (node-only)
  auth-edge.ts               Edge-safe token verify (used by middleware)

  email/
    client.ts                Resend singleton
    lead-notification.ts     "New lead" email on lead creation
    follow-up.ts             Reminder + digest senders (cron)
    templates/               HTML + text templates (no React email dep)

  ai/
    types.ts, provider.ts, summary.ts, follow-up.ts, pipeline.ts, index.ts

middleware.ts                Protects /admin/* at the edge

prisma/
  schema.prisma              Admin / Lead / Note / Activity models
  seed.ts                    Creates initial admin + 5 sample leads

vercel.json                  Cron schedule for follow-up automation
```

---

## How the CRM works

**Pipeline stages:** `New → Contacted → Qualified → Proposal Sent → Won | Lost`
(defined in `lib/crm.ts` — edit the list and it flows everywhere with no migration).

**Priorities:** `Low`, `Medium`, `High`.

**Sources:** `Website Contact Form`, `Referral`, `Cold Outreach`, `Social`, `Manual Entry`, `Other`.

**Activity log:** every create / status change / priority change / note / edit writes an `Activity` row. The lead detail page shows the full timeline.

**Auth model:** one `Admin` table, password hashed with bcrypt, signed session JWT stored in an `httpOnly`, `secure`, `sameSite=lax` cookie. Middleware verifies the token on every `/admin/*` request before the app code even runs.

**Lead capture:** the public contact form POSTs to `/api/contact`, which validates with Zod and calls `createLead(...)` in `lib/leads.ts`. Nothing is held in state — if the DB write fails, the user sees an error.

### Add a new admin

Easiest path: run Prisma Studio and insert a row.

```bash
npm run db:studio
```

Or write a one-off script using `hashPassword` from `lib/auth.ts`:

```ts
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

await prisma.admin.create({
  data: {
    email: "teammate@jdtinc.com",
    name: "Teammate",
    passwordHash: await hashPassword("ChangeMe123!"),
  },
});
```

### Change the admin password

Update the `passwordHash` in Prisma Studio (use `hashPassword` to generate a new hash), or delete the row and re-run `npm run db:seed` after changing `ADMIN_PASSWORD` in `.env`.

---

## Deploy to Vercel

1. **Create a Postgres database.** Sign up at [neon.tech](https://neon.tech), create a project, copy the **pooled** connection string.
2. **Push this repo to GitHub.**
3. **Import into Vercel** at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Next.js.
4. **Add environment variables** in Project → Settings → Environment Variables:
   - `DATABASE_URL`
   - `AUTH_SECRET` (generate with `openssl rand -base64 48`)
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`
5. **Deploy.** The build runs `prisma generate && next build` automatically.
6. **Initialize the database** (one time) — from your local machine with `DATABASE_URL` in `.env` pointing at the production DB:
   ```bash
   npm run db:push
   npm run db:seed
   ```
7. **Add your domain** in Project → Settings → Domains and update `site.url` in `lib/site.ts`.

### Cost story

- Vercel Hobby: **$0/mo** (fine for this site's traffic)
- Neon Free: **$0/mo**, 0.5 GB storage, generous compute for a small CRM
- No third-party auth, no Airtable, no HubSpot, no GHL — you own the data.

You only start paying if you outgrow the free tiers, at which point Neon Pro is $19/mo and Vercel Pro is $20/user/mo. Until then: zero dollars.

---

## Editing content (marketing site)

Almost all copy lives in data files — you shouldn't need to touch JSX for most changes:

- **Brand + nav + email + socials + Calendly** → `lib/site.ts`
- **Services** → `lib/services.ts`
- **Case studies** → `lib/caseStudies.ts` (each entry auto-generates `/work/<slug>`)

Page-level copy lives directly inside `app/(site)/<page>/page.tsx`.

### Colors / typography

- Colors + fonts: `tailwind.config.ts`
- Global utility classes (`.display`, `.eyebrow`, `.link-underline`): `app/globals.css`

---

## Sales-focused lead fields

Every lead now tracks the signals that actually drive follow-up, in addition to the core contact info:

- **Service interest** — which offering they're asking about (collected on the public contact form).
- **Estimated budget** — a simple range picker on the form.
- **Lead temperature** — `Cold | Warm | Hot`, shown as a pill next to stage and priority. Set it inline on the lead detail page.
- **Last contacted** — stamped by the "Mark contacted now" button; also appears on the lead detail page.
- **Next follow-up** — a date picker on the lead detail page. If the date is today or earlier and the lead isn't Won/Lost, it shows up under "Overdue follow-ups" on the dashboard.

The dashboard reflects all of this with four sales-first KPI cards — **New leads, Hot leads, Overdue follow-ups, Won this month** — plus an overdue list and a hot-leads list so you can work the pipeline from one screen.

## Lead email notifications (Resend)

Every time a lead is created — from the public contact form **or** the manual "New lead" page — the admin gets a real-time email.

**Required env vars:**

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key. Leave blank to disable notifications (the app still works). |
| `RESEND_FROM` | Verified sender, e.g. `"JDT Inc <leads@notifications.jdtinc.com>"`. Use `"onboarding@resend.dev"` for quick local tests. |
| `ADMIN_EMAIL` | Recipient of the notification (already used for the seeded admin account). |
| `APP_URL` | *(optional)* Base URL used for the "Open in CRM" link inside the email. Defaults to `site.url` from `lib/site.ts`. Set to `http://localhost:3000` when testing from dev. |

**Email contents:** name, email, phone, company, service interest, estimated budget, message, source, received timestamp, and a direct link to the lead page in the CRM. The `Reply-To` header is set to the lead's own email, so hitting "Reply" in your inbox goes straight to them.

**Failure handling:** `sendNewLeadNotification` never throws. If Resend is down or the key is wrong, the lead is still saved and the error is logged to the server.

### First-time setup

1. Create a Resend account at [resend.com](https://resend.com).
2. Add your sending domain (e.g. `notifications.jdtinc.com`) and copy the DNS records into your DNS provider. Wait a minute or two for verification.
3. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
4. Put `RESEND_API_KEY` and `RESEND_FROM` in `.env` locally and in Vercel → Settings → Environment Variables for production.

Resend's free tier is **3,000 emails/month, 100/day** — more than enough for lead notifications.

### Test it locally

1. Add to `.env`:
   ```
   RESEND_API_KEY=re_xxx
   RESEND_FROM="onboarding@resend.dev"
   ADMIN_EMAIL=your-real-inbox@example.com
   APP_URL=http://localhost:3000
   ```
   Using `onboarding@resend.dev` is fine for testing — Resend will only deliver to the inbox tied to your Resend account (`ADMIN_EMAIL` should match that address).
2. `npm run dev`
3. Submit the contact form at `http://localhost:3000/contact`. Check the inbox for `ADMIN_EMAIL`.
4. Also try it from the admin side: `/admin/leads/new` — same email should arrive.
5. If nothing shows up: check your terminal for `[email] ...` logs. Missing key → skip message; Resend error → full response logged.

### Test it in production

1. Confirm the three env vars are set in Vercel and redeploy if you just added them.
2. In Resend, move your sending domain from "pending" to "verified". Until then, emails to anyone outside your Resend account's email will bounce.
3. Submit the public contact form on your live site and verify the email lands in `ADMIN_EMAIL`.
4. Check Resend → **Emails** to see the delivery log (useful when something doesn't show up and you need to tell whether it's a send failure or an inbox issue).

## Follow-up automation

Two scheduled endpoints keep leads from slipping. Both reuse the Resend setup above — no extra dependencies.

| Endpoint | What it sends |
| --- | --- |
| `GET /api/cron/follow-ups` | One email per lead whose `nextFollowUpAt` has arrived or passed (and isn't Won/Lost). Clearly marks "due today" vs. "overdue Nd". |
| `GET /api/cron/daily-digest` | A single rollup email: **overdue follow-ups**, **hot leads**, and **new leads in the last 24 hours**. |

Both routes require an auth header:

```
Authorization: Bearer $CRON_SECRET
```

`CRON_SECRET` is a new env var (see `.env.example`). Generate one with `openssl rand -base64 32`. Vercel Cron automatically sets this header for you when the env var is on the project, so **no extra config is needed** for scheduled runs. In local dev, leaving `CRON_SECRET` blank lets you curl the routes without auth.

### Schedule (`vercel.json`)

```json
{
  "crons": [
    { "path": "/api/cron/follow-ups",   "schedule": "0 13 * * *" },
    { "path": "/api/cron/daily-digest", "schedule": "0 13 * * *" }
  ]
}
```

Both run once a day at **13:00 UTC** (9am ET / 6am PT). Adjust the cron strings to match your timezone. Vercel's free plan allows 2 cron jobs at daily granularity — exactly what we need.

### Design choices

- **No "reminder sent" state.** The cron just looks at `nextFollowUpAt`. To stop reminders for a lead, update the date in the CRM (or mark it contacted / Won / Lost). Simple, no extra column, no drift.
- **Fail-soft.** The sender functions never throw — failures are logged and the route responds with a per-lead breakdown so the Vercel cron log is actionable.
- **On-demand friendly.** Both endpoints are plain `GET`s — safe to curl any time you want to test or force a run.

### Test locally

1. Make sure `RESEND_API_KEY`, `RESEND_FROM`, `ADMIN_EMAIL`, and `APP_URL` are set (same as the new-lead email setup). Leave `CRON_SECRET` blank to skip auth in dev.
2. Start the app: `npm run dev`.
3. Create or edit a seeded lead so its **Next follow-up** date is today or earlier.
4. Trigger the endpoints:

   ```bash
   # Per-lead reminders
   curl -s http://localhost:3000/api/cron/follow-ups | jq

   # Daily digest
   curl -s http://localhost:3000/api/cron/daily-digest | jq
   ```

5. Expect the emails in `ADMIN_EMAIL`. The JSON response shows how many were due, how many were sent, and which leads were skipped (and why).

If you set `CRON_SECRET` locally:

```bash
curl -s http://localhost:3000/api/cron/follow-ups \
  -H "Authorization: Bearer $CRON_SECRET" | jq
```

### Enable in production

1. Add `CRON_SECRET` to Vercel → **Settings → Environment Variables** (Production + Preview).
2. Redeploy so `vercel.json` is picked up.
3. Check **Vercel → Crons** — you'll see both jobs listed. Each invocation's response body is viewable in the log.
4. You can also trigger a run manually from the Cron page ("Run now") without leaving Vercel.

## AI service layer (future Naive integration)

The CRM is wired for future AI features through a thin, provider-agnostic layer under `lib/ai/`:

```
lib/ai/
  types.ts       Shared types + AiProvider interface
  provider.ts    Factory + built-in heuristic provider (no deps)
  summary.ts     summarizeLead(id)       → LeadSummary
  follow-up.ts   suggestFollowUp(id)     → FollowUpSuggestion
  pipeline.ts   analyzePipeline()       → PipelineInsight
  index.ts       Public entry point
```

Today the factory returns a zero-dependency heuristic that produces sensible output so the UI can be built and tested. When the Naive (or any other) provider is ready, add a new file that implements the `AiProvider` interface and wire it up inside `getAiProvider()` — the rest of the app never changes.

Call sites will be as simple as:

```ts
import { summarizeLead, suggestFollowUp, analyzePipeline } from "@/lib/ai";

const summary = await summarizeLead(leadId);
const suggestion = await suggestFollowUp(leadId);
const insight = await analyzePipeline();
```

## Extending the CRM

Because the schema is simple and centralised, common extensions are short:

- **More email triggers** (e.g. on status → Won): copy the shape of `lib/email/lead-notification.ts`, add a template under `lib/email/templates/`, call it from the matching action in `lib/leads.ts`.
- **Extra cron jobs** (e.g. weekly digest): add a route under `app/api/cron/`, guarded by the same `CRON_SECRET` check, and add an entry to `vercel.json`.
- **CSV export:** add a route handler that calls `listLeads()` and streams CSV.
- **Tags:** add a `Tag` model + `LeadTag` join table in `prisma/schema.prisma`, run `db:push`.
- **AI lead summaries / reply drafts:** use the service layer above — call `summarizeLead` or `suggestFollowUp` inside a new server action, then persist the output as a `Note` or render it directly in the detail page.

The activity log is already in place, so any new mutation just needs to call `prisma.activity.create(...)` using the `ACTIVITY.*` constants from `lib/crm.ts`.

### After pulling these upgrades

If your database already exists from the first CRM build, apply the new columns:

```bash
npm run db:push
```

That adds `serviceInterest`, `estimatedBudget`, `temperature`, `lastContactedAt`, and `nextFollowUpAt` to the `Lead` table. No data loss — existing leads just default to `temperature = "Cold"` with the new fields empty. Re-running `npm run db:seed` is safe (it skips seeding sample leads if any already exist).

---

## Design notes

- Black & white base, editorial serif display (Instrument Serif) + Inter body
- Generous padding for editorial rhythm
- Hairline borders rather than heavy cards
- Motion is intentionally restrained — only on section entrances and hover
- Admin UI intentionally reuses the same type scale and palette so it feels like one product

---

## License

© JDT Inc. All rights reserved.
