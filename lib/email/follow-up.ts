import "server-only";
import { site } from "@/lib/site";
import { getResend, isEmailEnabled } from "./client";
import {
  renderFollowUpReminderEmail,
  type FollowUpReminderInput,
} from "./templates/follow-up-reminder";
import {
  renderDailyDigestEmail,
  type DailyDigestInput,
  type DigestLead,
} from "./templates/daily-digest";

/**
 * Senders for the two automation emails:
 *   1. per-lead follow-up reminder (`sendFollowUpReminder`)
 *   2. once-a-day rollup of overdue / hot / new leads (`sendDailyDigest`)
 *
 * Both reuse the existing Resend singleton and follow the same fail-soft
 * contract as `sendNewLeadNotification`: they never throw. Failures are
 * logged so the cron endpoints can still report which ones worked.
 */

export function baseUrl(): string {
  return (process.env.APP_URL || site.url).replace(/\/$/, "");
}

export function leadUrl(id: string): string {
  return `${baseUrl()}/admin/leads/${id}`;
}

// ---------- per-lead reminder ----------

export type FollowUpReminderLead = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  estimatedBudget: string | null;
  status: string;
  temperature: string;
  priority: string;
  source: string;
  nextFollowUpAt: Date | null;
  lastContactedAt: Date | null;
};

export async function sendFollowUpReminder(
  lead: FollowUpReminderLead,
  opts: { now?: Date } = {}
): Promise<{ sent: boolean; reason?: string }> {
  if (!isEmailEnabled()) {
    return { sent: false, reason: "email-disabled" };
  }
  const to = process.env.ADMIN_EMAIL;
  if (!to) return { sent: false, reason: "no-admin-email" };
  if (!lead.nextFollowUpAt) return { sent: false, reason: "no-follow-up-date" };

  const now = opts.now ?? new Date();
  const overdueMs = now.getTime() - lead.nextFollowUpAt.getTime();
  const overdueDays = Math.max(0, Math.floor(overdueMs / (24 * 60 * 60 * 1000)));

  const input: FollowUpReminderInput = {
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
    overdueDays,
    leadUrl: leadUrl(lead.id),
  };

  const { subject, html, text } = renderFollowUpReminderEmail(input);
  const from = process.env.RESEND_FROM!;

  try {
    const resend = getResend();
    if (!resend) return { sent: false, reason: "no-resend-client" };
    const res = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject,
      html,
      text,
    });
    if ((res as { error?: unknown }).error) {
      console.error("[email] Resend error (follow-up):", res);
      return { sent: false, reason: "resend-error" };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send follow-up reminder:", err);
    return { sent: false, reason: "throw" };
  }
}

// ---------- daily digest ----------

export type DailyDigestData = {
  overdue: Array<Omit<DigestLead, "leadUrl">>;
  hot: Array<Omit<DigestLead, "leadUrl">>;
  newLast24h: Array<Omit<DigestLead, "leadUrl">>;
};

export async function sendDailyDigest(
  data: DailyDigestData,
  opts: { now?: Date } = {}
): Promise<{ sent: boolean; reason?: string }> {
  if (!isEmailEnabled()) return { sent: false, reason: "email-disabled" };
  const to = process.env.ADMIN_EMAIL;
  if (!to) return { sent: false, reason: "no-admin-email" };

  const withUrl = (l: Omit<DigestLead, "leadUrl">): DigestLead => ({
    ...l,
    leadUrl: leadUrl(l.id),
  });

  const input: DailyDigestInput = {
    generatedAt: opts.now ?? new Date(),
    overdue: data.overdue.map(withUrl),
    hot: data.hot.map(withUrl),
    newLast24h: data.newLast24h.map(withUrl),
    crmUrl: `${baseUrl()}/admin`,
  };

  const { subject, html, text } = renderDailyDigestEmail(input);
  const from = process.env.RESEND_FROM!;

  try {
    const resend = getResend();
    if (!resend) return { sent: false, reason: "no-resend-client" };
    const res = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
    });
    if ((res as { error?: unknown }).error) {
      console.error("[email] Resend error (digest):", res);
      return { sent: false, reason: "resend-error" };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send daily digest:", err);
    return { sent: false, reason: "throw" };
  }
}
