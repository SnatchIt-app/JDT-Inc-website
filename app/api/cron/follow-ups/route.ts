import { NextResponse } from "next/server";
import { getDueFollowUps } from "@/lib/leads";
import { sendFollowUpReminder } from "@/lib/email/follow-up";

/**
 * GET /api/cron/follow-ups
 *
 * Sends one reminder email per lead whose `nextFollowUpAt` has arrived
 * or passed. Designed to be hit by Vercel Cron once per day — but also
 * safe to trigger manually.
 *
 * Auth: `Authorization: Bearer $CRON_SECRET` (Vercel Cron sets this
 * automatically when you provide CRON_SECRET as an env var).
 *
 * Notes:
 *  - The email sender never throws; we aggregate per-lead results and
 *    report them back in the response body so the Vercel cron log is
 *    actionable.
 *  - We deliberately do NOT persist "reminder sent" state. If you want
 *    to stop reminders for a lead, update its `nextFollowUpAt` in the
 *    CRM — that's the single source of truth.
 */

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Missing secret — allow only in dev so you can curl the route
    // during local testing. In production this refuses.
    return process.env.NODE_ENV !== "production";
  }
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();

  const now = new Date();
  const due = await getDueFollowUps(now);

  const results = await Promise.all(
    due.map(async (lead) => {
      const r = await sendFollowUpReminder(
        {
          id: lead.id,
          fullName: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          serviceInterest: lead.serviceInterest,
          estimatedBudget: lead.estimatedBudget,
          status: lead.status,
          temperature: lead.temperature,
          priority: lead.priority,
          source: lead.source,
          nextFollowUpAt: lead.nextFollowUpAt,
          lastContactedAt: lead.lastContactedAt,
        },
        { now }
      );
      return { id: lead.id, name: lead.fullName, ...r };
    })
  );

  const sent = results.filter((r) => r.sent).length;
  return NextResponse.json({
    ok: true,
    checkedAt: now.toISOString(),
    due: due.length,
    sent,
    skipped: due.length - sent,
    results,
  });
}
