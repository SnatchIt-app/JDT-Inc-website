/**
 * Email template for the daily digest — one email per day summarising
 * overdue follow-ups, hot leads, and new leads from the last 24 hours.
 */

export type DigestLead = {
  id: string;
  fullName: string;
  email: string;
  company?: string | null;
  serviceInterest?: string | null;
  estimatedBudget?: string | null;
  status: string;
  temperature: string;
  priority: string;
  nextFollowUpAt?: Date | null;
  createdAt: Date;
  leadUrl: string;
};

export type DailyDigestInput = {
  generatedAt: Date;
  overdue: DigestLead[];
  hot: DigestLead[];
  newLast24h: DigestLead[];
  crmUrl: string;
};

const BRAND = {
  ink: "#0a0a0a",
  paper: "#fafaf7",
  muted: "#6b6b6b",
  hairline: "#e5e5e5",
  alert: "#b91c1c",
  warm: "#b45309",
};

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function daysBetween(a: Date, b: Date): number {
  const ms = a.getTime() - b.getTime();
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function leadRow(
  lead: DigestLead,
  opts: { showFollowUp?: boolean; showCreated?: boolean; overdueDays?: number }
): string {
  const pieces: string[] = [];
  if (lead.company) pieces.push(lead.company);
  if (lead.serviceInterest) pieces.push(lead.serviceInterest);
  if (lead.estimatedBudget) pieces.push(lead.estimatedBudget);

  const meta = pieces.length
    ? `<div style="margin-top:4px;font-size:13px;color:${BRAND.muted};line-height:1.4;">${escapeHtml(pieces.join(" · "))}</div>`
    : "";

  let timing = "";
  if (opts.overdueDays !== undefined) {
    timing =
      opts.overdueDays > 0
        ? `<span style="color:${BRAND.alert};font-weight:600;">Overdue ${opts.overdueDays}d</span>`
        : `<span style="color:${BRAND.warm};font-weight:600;">Due today</span>`;
  } else if (opts.showFollowUp && lead.nextFollowUpAt) {
    timing = `<span style="color:${BRAND.muted};">Follow up ${escapeHtml(fmtDate(lead.nextFollowUpAt))}</span>`;
  } else if (opts.showCreated) {
    const hrs = Math.max(
      1,
      Math.round((Date.now() - lead.createdAt.getTime()) / (60 * 60 * 1000))
    );
    timing = `<span style="color:${BRAND.muted};">${hrs}h ago</span>`;
  }

  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${BRAND.hairline};vertical-align:top;">
        <a href="${escapeHtml(lead.leadUrl)}" style="font-size:15px;color:${BRAND.ink};font-weight:600;text-decoration:none;">
          ${escapeHtml(lead.fullName)}
        </a>
        ${meta}
        <div style="margin-top:6px;font-size:12px;color:${BRAND.muted};">
          ${escapeHtml(lead.status)} · ${escapeHtml(lead.temperature)} · ${escapeHtml(lead.priority)}
        </div>
      </td>
      <td style="padding:14px 0;border-bottom:1px solid ${BRAND.hairline};font-size:12px;text-align:right;vertical-align:top;white-space:nowrap;">
        ${timing}
      </td>
    </tr>`;
}

function emptyRow(label: string): string {
  return `
    <tr>
      <td colspan="2" style="padding:16px 0;font-size:14px;color:${BRAND.muted};font-style:italic;">
        ${escapeHtml(label)}
      </td>
    </tr>`;
}

function section(
  title: string,
  count: number,
  rowsHtml: string,
  accent: string
): string {
  return `
    <div style="margin-top:28px;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid ${accent};padding-bottom:8px;margin-bottom:4px;">
        <h2 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:20px;letter-spacing:-0.01em;margin:0;color:${BRAND.ink};">
          ${escapeHtml(title)}
        </h2>
        <span style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${BRAND.muted};">
          ${count} ${count === 1 ? "lead" : "leads"}
        </span>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${rowsHtml}
      </table>
    </div>`;
}

export function renderDailyDigestEmail(input: DailyDigestInput): {
  subject: string;
  html: string;
  text: string;
} {
  const dateLabel = input.generatedAt.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const subject = `JDT Inc. daily digest — ${input.overdue.length} overdue · ${input.hot.length} hot · ${input.newLast24h.length} new`;

  const overdueRows = input.overdue.length
    ? input.overdue
        .map((l) =>
          leadRow(l, {
            overdueDays: l.nextFollowUpAt
              ? Math.max(0, daysBetween(input.generatedAt, l.nextFollowUpAt))
              : 0,
          })
        )
        .join("")
    : emptyRow("Nothing overdue — you're clear.");

  const hotRows = input.hot.length
    ? input.hot.map((l) => leadRow(l, { showFollowUp: true })).join("")
    : emptyRow("No hot leads in the pipeline right now.");

  const newRows = input.newLast24h.length
    ? input.newLast24h.map((l) => leadRow(l, { showCreated: true })).join("")
    : emptyRow("No new leads in the last 24 hours.");

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
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid ${BRAND.hairline};border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid ${BRAND.hairline};">
                <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${BRAND.muted};margin:0 0 8px 0;">
                  JDT Inc. · Daily Digest
                </p>
                <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.15;letter-spacing:-0.02em;margin:0;color:${BRAND.ink};">
                  ${escapeHtml(dateLabel)}
                </h1>
                <p style="margin:10px 0 0 0;color:${BRAND.muted};font-size:14px;line-height:1.5;">
                  ${input.overdue.length} overdue follow-up${input.overdue.length === 1 ? "" : "s"} ·
                  ${input.hot.length} hot lead${input.hot.length === 1 ? "" : "s"} ·
                  ${input.newLast24h.length} new in the last 24 hours
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px 32px;">
                ${section("Overdue follow-ups", input.overdue.length, overdueRows, BRAND.alert)}
                ${section("Hot leads", input.hot.length, hotRows, BRAND.ink)}
                ${section("New leads (last 24h)", input.newLast24h.length, newRows, BRAND.ink)}

                <div style="margin-top:32px;">
                  <a href="${escapeHtml(input.crmUrl)}"
                     style="display:inline-block;background:${BRAND.ink};color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 22px;font-size:14px;font-weight:500;">
                    Open the CRM →
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BRAND.hairline};background:${BRAND.paper};">
                <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:1.5;">
                  Automated daily digest. Generated ${escapeHtml(input.generatedAt.toLocaleString())}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const textBlock = (title: string, leads: DigestLead[], empty: string) => {
    if (!leads.length) return `${title}\n  ${empty}`;
    const lines = leads.map((l) => {
      const bits = [l.fullName];
      if (l.company) bits.push(l.company);
      if (l.serviceInterest) bits.push(l.serviceInterest);
      if (l.estimatedBudget) bits.push(l.estimatedBudget);
      return `  - ${bits.join(" · ")} (${l.status}, ${l.temperature})\n    ${l.leadUrl}`;
    });
    return `${title}\n${lines.join("\n")}`;
  };

  const text = [
    `JDT Inc. Daily Digest — ${dateLabel}`,
    `${input.overdue.length} overdue · ${input.hot.length} hot · ${input.newLast24h.length} new in 24h`,
    "",
    textBlock(
      "OVERDUE FOLLOW-UPS",
      input.overdue,
      "Nothing overdue — you're clear."
    ),
    "",
    textBlock("HOT LEADS", input.hot, "No hot leads in the pipeline."),
    "",
    textBlock(
      "NEW LEADS (LAST 24H)",
      input.newLast24h,
      "No new leads in the last 24 hours."
    ),
    "",
    `Open the CRM: ${input.crmUrl}`,
  ].join("\n");

  return { subject, html, text };
}
