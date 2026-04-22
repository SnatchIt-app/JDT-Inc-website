/**
 * Email template for the "follow-up reminder" — sent when a single lead
 * has a `nextFollowUpAt` date that has arrived or passed.
 *
 * Plain string templates, inline styles only (email clients don't load
 * external CSS). Same visual language as `new-lead.ts`.
 */

export type FollowUpReminderInput = {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  estimatedBudget?: string | null;
  status: string;
  temperature: string;
  priority: string;
  source: string;
  nextFollowUpAt: Date;
  lastContactedAt?: Date | null;
  overdueDays: number; // 0 = due today, >0 = overdue
  leadUrl: string;
};

const BRAND = {
  ink: "#0a0a0a",
  paper: "#fafaf7",
  muted: "#6b6b6b",
  hairline: "#e5e5e5",
  alert: "#b91c1c",
};

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.hairline};width:140px;vertical-align:top;">
        <span style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.muted};">${escapeHtml(
          label
        )}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.hairline};font-size:15px;color:${BRAND.ink};line-height:1.5;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

export function renderFollowUpReminderEmail(input: FollowUpReminderInput): {
  subject: string;
  html: string;
  text: string;
} {
  const who = input.company
    ? `${input.fullName} · ${input.company}`
    : input.fullName;

  const status =
    input.overdueDays > 0
      ? `Overdue by ${input.overdueDays} day${input.overdueDays === 1 ? "" : "s"}`
      : "Due today";

  const subject =
    input.overdueDays > 0
      ? `Follow-up overdue (${input.overdueDays}d): ${who}`
      : `Follow-up due today: ${who}`;

  const banner = `
    <div style="background:${input.overdueDays > 0 ? BRAND.alert : BRAND.ink};color:#ffffff;padding:10px 16px;border-radius:999px;display:inline-block;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:600;">
      ${escapeHtml(status)}
    </div>`;

  const dateFmt = (d: Date) => d.toLocaleString();

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${BRAND.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.paper};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.hairline};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid ${BRAND.hairline};">
                ${banner}
                <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.15;letter-spacing:-0.02em;margin:14px 0 0 0;color:${BRAND.ink};">
                  Follow up with ${escapeHtml(input.fullName)}
                </h1>
                <p style="margin:8px 0 0 0;color:${BRAND.muted};font-size:14px;">
                  Scheduled for ${escapeHtml(dateFmt(input.nextFollowUpAt))}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${row("Name", input.fullName)}
                  ${row("Email", input.email)}
                  ${row("Phone", input.phone)}
                  ${row("Company", input.company)}
                  ${row("Service interest", input.serviceInterest)}
                  ${row("Estimated budget", input.estimatedBudget)}
                  ${row("Stage", input.status)}
                  ${row("Temperature", input.temperature)}
                  ${row("Priority", input.priority)}
                  ${row("Source", input.source)}
                  ${row(
                    "Last contacted",
                    input.lastContactedAt
                      ? dateFmt(input.lastContactedAt)
                      : "Never"
                  )}
                </table>

                <div style="margin-top:32px;">
                  <a href="${escapeHtml(input.leadUrl)}"
                     style="display:inline-block;background:${BRAND.ink};color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 22px;font-size:14px;font-weight:500;">
                    Open lead in CRM →
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BRAND.hairline};background:${BRAND.paper};">
                <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.5;">
                  Automated follow-up reminder from the JDT Inc. CRM.
                  Reply directly to ${escapeHtml(input.email)} to reach the lead,
                  or update the next follow-up date in the CRM to clear this reminder.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Follow-up ${input.overdueDays > 0 ? `overdue by ${input.overdueDays} day(s)` : "due today"}: ${input.fullName}`,
    `Scheduled: ${dateFmt(input.nextFollowUpAt)}`,
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.serviceInterest ? `Service interest: ${input.serviceInterest}` : null,
    input.estimatedBudget ? `Estimated budget: ${input.estimatedBudget}` : null,
    `Stage: ${input.status}`,
    `Temperature: ${input.temperature}`,
    `Priority: ${input.priority}`,
    `Source: ${input.source}`,
    `Last contacted: ${input.lastContactedAt ? dateFmt(input.lastContactedAt) : "Never"}`,
    "",
    `Open in CRM: ${input.leadUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
