/**
 * Email template for the "new lead" notification.
 * Plain string templates — no React email dep needed.
 * Inline styles only (email clients don't load external CSS).
 */

export type NewLeadEmailInput = {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  estimatedBudget?: string | null;
  message?: string | null;
  source: string;
  leadUrl: string;
  createdAt: Date;
};

const BRAND = {
  ink: "#0a0a0a",
  paper: "#fafaf7",
  muted: "#6b6b6b",
  hairline: "#e5e5e5",
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

export function renderNewLeadEmail(input: NewLeadEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const who = input.company
    ? `${input.fullName} · ${input.company}`
    : input.fullName;
  const subject = `New lead: ${who}`;

  const messageBlock = input.message
    ? `
    <div style="margin-top:28px;">
      <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.muted};margin:0 0 8px 0;">
        Message
      </p>
      <div style="border:1px solid ${BRAND.hairline};border-radius:12px;padding:16px;background:${BRAND.paper};font-size:15px;color:${BRAND.ink};line-height:1.6;white-space:pre-wrap;">
        ${escapeHtml(input.message)}
      </div>
    </div>`
    : "";

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
                <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.muted};margin:0 0 8px 0;">
                  ${escapeHtml(input.source)}
                </p>
                <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.15;letter-spacing:-0.02em;margin:0;color:${BRAND.ink};">
                  New lead — ${escapeHtml(input.fullName)}
                </h1>
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
                  ${row("Source", input.source)}
                  ${row("Received", input.createdAt.toLocaleString())}
                </table>
                ${messageBlock}

                <div style="margin-top:32px;">
                  <a href="${escapeHtml(input.leadUrl)}"
                     style="display:inline-block;background:${BRAND.ink};color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 22px;font-size:14px;font-weight:500;">
                    Open in CRM →
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BRAND.hairline};background:${BRAND.paper};">
                <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.5;">
                  You're receiving this because you're the admin on the JDT Inc. CRM.
                  Reply directly to ${escapeHtml(input.email)} to respond to the lead.
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
    `New lead — ${input.fullName}`,
    `Source: ${input.source}`,
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    input.company ? `Company: ${input.company}` : null,
    input.serviceInterest
      ? `Service interest: ${input.serviceInterest}`
      : null,
    input.estimatedBudget
      ? `Estimated budget: ${input.estimatedBudget}`
      : null,
    input.message ? `\nMessage:\n${input.message}` : null,
    "",
    `Open in CRM: ${input.leadUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
