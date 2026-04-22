import { NextResponse } from "next/server";
import { getDailyDigestData } from "@/lib/leads";
import { sendDailyDigest } from "@/lib/email/follow-up";

/**
 * GET /api/cron/daily-digest
 *
 * Sends one summary email containing overdue follow-ups, hot leads,
 * and new leads from the last 24 hours. Intended for a single daily
 * Vercel Cron tick.
 *
 * Auth: `Authorization: Bearer $CRON_SECRET`.
 */

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return unauthorized();

  const now = new Date();
  const { overdue, hot, newLast24h } = await getDailyDigestData(now);

  const mapLead = (l: {
    id: string;
    fullName: string;
    email: string;
    company: string | null;
    serviceInterest: string | null;
    estimatedBudget: string | null;
    status: string;
    temperature: string;
    priority: string;
    nextFollowUpAt: Date | null;
    createdAt: Date;
  }) => ({
    id: l.id,
    fullName: l.fullName,
    email: l.email,
    company: l.company,
    serviceInterest: l.serviceInterest,
    estimatedBudget: l.estimatedBudget,
    status: l.status,
    temperature: l.temperature,
    priority: l.priority,
    nextFollowUpAt: l.nextFollowUpAt,
    createdAt: l.createdAt,
  });

  const result = await sendDailyDigest(
    {
      overdue: overdue.map(mapLead),
      hot: hot.map(mapLead),
      newLast24h: newLast24h.map(mapLead),
    },
    { now }
  );

  return NextResponse.json({
    ok: true,
    generatedAt: now.toISOString(),
    counts: {
      overdue: overdue.length,
      hot: hot.length,
      newLast24h: newLast24h.length,
    },
    ...result,
  });
}
