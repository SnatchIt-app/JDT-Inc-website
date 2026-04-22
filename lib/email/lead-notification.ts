import "server-only";
import { site } from "@/lib/site";
import { getResend, isEmailEnabled } from "./client";
import {
  renderNewLeadEmail,
  type NewLeadEmailInput,
} from "./templates/new-lead";

type LeadForEmail = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  estimatedBudget: string | null;
  message: string | null;
  source: string;
  createdAt: Date;
};

function baseUrl(): string {
  // Prefer explicit APP_URL so prod email links point at the deployed
  // admin, not the marketing URL or localhost during testing.
  return (process.env.APP_URL || site.url).replace(/\/$/, "");
}

/**
 * Fire the "new lead" notification. Never throws — email failures are
 * logged and swallowed so they can't break lead creation.
 */
export async function sendNewLeadNotification(lead: LeadForEmail): Promise<void> {
  if (!isEmailEnabled()) {
    // Email is optional in local/dev. Log once so it's obvious why
    // nothing arrived.
    console.info(
      "[email] RESEND_API_KEY or RESEND_FROM not set — skipping new-lead email."
    );
    return;
  }

  const to = process.env.ADMIN_EMAIL;
  if (!to) {
    console.warn("[email] ADMIN_EMAIL not set — skipping new-lead email.");
    return;
  }

  const from = process.env.RESEND_FROM!;
  const leadUrl = `${baseUrl()}/admin/leads/${lead.id}`;

  const input: NewLeadEmailInput = {
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    serviceInterest: lead.serviceInterest,
    estimatedBudget: lead.estimatedBudget,
    message: lead.message,
    source: lead.source,
    createdAt: lead.createdAt,
    leadUrl,
  };

  const { subject, html, text } = renderNewLeadEmail(input);

  try {
    const resend = getResend();
    if (!resend) return;
    const res = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject,
      html,
      text,
    });
    if ((res as { error?: unknown }).error) {
      console.error("[email] Resend returned error:", res);
    }
  } catch (err) {
    console.error("[email] Failed to send new-lead email:", err);
  }
}
