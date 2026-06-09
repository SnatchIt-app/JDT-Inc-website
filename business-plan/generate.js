/* JDT Inc. — Business Plan (consolidated, evidence-based).
   FL LLC, founded Sep 2025. Boutique service agency. Founder-operated.
   Y1 = ~$24,000 (Jan–May documented + Jun–Aug projected).
   Y2 = ~$42,000.  Y3 = ~$60,000.
   Grant request: $15,000. */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TabStopType, TabStopPosition,
} = require("docx");

const INK = "1A1A1A", GRAY = "555555", LIGHT = "888888", RULE = "CCCCCC";
const PAGE = { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } };

const styles = {
  default: { document: { run: { font: "Calibri", size: 22, color: "222222" } } },
  paragraphStyles: [
    { id: "Title", name: "Title", basedOn: "Normal", next: "Normal",
      run: { size: 52, bold: true, font: "Georgia", color: INK },
      paragraph: { spacing: { before: 0, after: 100 } } },
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, font: "Georgia", color: INK },
      paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 0,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 6 } } } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: "Calibri", color: INK },
      paragraph: { spacing: { before: 180, after: 70 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 22, bold: true, font: "Calibri", color: "333333" },
      paragraph: { spacing: { before: 140, after: 50 }, outlineLevel: 2 } },
    { id: "Eyebrow", name: "Eyebrow", basedOn: "Normal", next: "Normal",
      run: { size: 16, bold: true, color: LIGHT, allCaps: true, font: "Calibri" },
      paragraph: { spacing: { before: 0, after: 40 } } },
    { id: "Source", name: "Source", basedOn: "Normal", next: "Normal",
      run: { size: 18, italics: true, color: GRAY },
      paragraph: { spacing: { before: 0, after: 140 } } },
  ],
};

const numbering = {
  config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "—", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 250 } } } }] },
  ],
};

const P = (t) => new Paragraph({ spacing: { after: 140, line: 280 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun(t)] });
const lead = (t) => new Paragraph({ spacing: { after: 160, line: 290 }, children: [new TextRun({ text: t, size: 23, color: "2F2F2F" })] });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const eyebrow = (t) => new Paragraph({ style: "Eyebrow", children: [new TextRun(t)] });
const source = (t) => new Paragraph({ style: "Source", children: [new TextRun(t)] });
const bulRich = (lbl, rest) => new Paragraph({ numbering: { reference: "bul", level: 0 }, spacing: { after: 60, line: 272 }, children: [new TextRun({ text: lbl + " ", bold: true }), new TextRun(rest)] });
const spacer = () => new Paragraph({ spacing: { after: 60 }, children: [] });

const cell = (text, { w, head = false, bold = false, alignRight = false } = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: { fill: head ? "1A1A1A" : "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    borders: { top: { style: BorderStyle.SINGLE, size: 1, color: RULE }, bottom: { style: BorderStyle.SINGLE, size: 1, color: RULE }, left: { style: BorderStyle.SINGLE, size: 1, color: RULE }, right: { style: BorderStyle.SINGLE, size: 1, color: RULE } },
    children: [new Paragraph({ alignment: alignRight ? AlignmentType.RIGHT : AlignmentType.LEFT, children: [new TextRun({ text, bold: head || bold, color: head ? "FFFFFF" : "222222", size: 20 })] })],
  });

const table = (widths, rows, { rightAlignFrom = 1 } = {}) => new Table({
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
  rows: rows.map((r, ri) => new TableRow({ tableHeader: ri === 0, children: r.map((c, ci) => cell(c, { w: widths[ci], head: ri === 0, alignRight: ci >= rightAlignFrom })) })),
});

const footer = new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }], children: [new TextRun({ text: "JDT Inc.  ·  Business Plan  ·  Confidential", size: 16, color: LIGHT }), new TextRun({ text: "\t", size: 16 }), new TextRun({ text: "Page ", size: 16, color: LIGHT }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: LIGHT })] })] });

const cover = [
  new Paragraph({ spacing: { before: 2600, after: 0 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "JDT INC.", font: "Georgia", bold: true, size: 72, color: INK })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "BOUTIQUE MARKETING & AUTOMATION AGENCY", size: 18, color: LIGHT, allCaps: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Florida LLC  ·  Miami, FL  ·  Established September 2025", size: 20, color: GRAY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: RULE, space: 14 } }, children: [new TextRun({ text: "Business Plan", font: "Georgia", bold: true, size: 40, color: INK })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: "Documented Revenue · Forecast · Exhibits", size: 22, color: GRAY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1400 }, children: [new TextRun({ text: "Prepared for Grant Committee Review", size: 18, color: LIGHT })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Prepared " + new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }) + "  ·  Confidential", size: 16, color: LIGHT })] }),
  new Paragraph({ children: [new PageBreak()] }),
];

const tocItem = (n, t) => new Paragraph({ spacing: { after: 90, line: 264 }, tabStops: [{ type: TabStopType.LEFT, position: 620 }], children: [new TextRun({ text: String(n).padStart(2, "0"), bold: true, color: LIGHT, font: "Calibri" }), new TextRun({ text: "\t" + t, color: "222222", size: 22 })] });
const tocSub = (n, t) => new Paragraph({ spacing: { after: 70, line: 260 }, tabStops: [{ type: TabStopType.LEFT, position: 1000 }], children: [new TextRun({ text: "        " + n, color: GRAY, font: "Calibri", size: 20 }), new TextRun({ text: "\t" + t, color: "333333", size: 20 })] });

const CONTENTS = [
  "Executive Summary",
  "Company Description",
  "Services & Pricing",
  "Market Analysis",
  "Sales & Client Acquisition",
  "Operations & Staffing",
  "Financial Plan",
  "Use of Funds",
  "Risk Analysis",
  "Supporting Exhibits",
];

const plan = [
  ...cover,

  new Paragraph({ style: "Title", children: [new TextRun("Contents")] }),
  eyebrow("Business Plan · JDT Inc. · Florida LLC"),
  spacer(),
  ...CONTENTS.map((t, i) => tocItem(i + 1, t)),
  tocSub("10.1", "Market Evidence"),
  tocSub("10.2", "Financial Support Schedules"),
  new Paragraph({ children: [new PageBreak()] }),

  // ---- 1. EXECUTIVE SUMMARY ----
  H1("1. Executive Summary"),
  P("JDT Inc. is a Florida limited liability company established in September 2025. The company is a small, founder-operated marketing and automation agency headquartered in Miami. It is a service business — not a software company, not a platform, not a technology firm — operated by a working owner with limited contractor support engaged project by project."),
  P("The agency was formed in September 2025; no paying clients were acquired between September and December 2025 while the company was being set up and outreach was underway. The first paying client revenue was received in January 2026. Between January and May 2026, the company received $6,070 in business revenue deposits across five months, documented in the attached Bank of America statements and summarized in Exhibit 10.2.1. The largest recurring client during this period is Carpet Cleaning Xperts LLC (Orlando, Florida), which paid the company every month from January through May 2026 — direct evidence of client retention and recurring revenue activity."),
  P("Year-one revenue (September 2025 through August 2026) is forecast at approximately $24,000, built from $6,070 documented through May 2026 plus a conservative June–August projection grounded in the current client base and near-term pipeline. Year-two revenue is forecast at approximately $42,000 and year-three revenue at approximately $60,000. The full reconciliation is in Section 7 and Exhibit 10.2."),
  P("This plan requests a grant of $15,000, deployed against itemized expenses over twelve months: contractor support, defined software subscriptions, modest infrastructure improvements, limited business development, and a working capital reserve to fund operations during the pre-revenue months and early-ramp gap."),

  // ---- 2. COMPANY DESCRIPTION ----
  H1("2. Company Description"),
  H2("Entity and operating profile"),
  P("JDT Inc. is registered as a Florida limited liability company (LLC). The company was formed in September 2025. The owner works from a home office in Miami. There are no employees on payroll at the date of this plan and none are assumed inside the three-year planning window; specialist work beyond the owner’s skill set is engaged through independent contractors on a 1099 basis, project by project."),
  H2("What the business does"),
  P("The work is conventional small-agency work. JDT Inc. runs Meta (Facebook and Instagram) and Google paid advertising for clients; builds and improves websites and landing pages used to convert that traffic; and configures simple marketing automation — lead follow-up, appointment confirmations, CRM cleanup — on off-the-shelf platforms (HubSpot, Klaviyo, Make, Zapier). The agency does not own software, does not license a platform, and does not finance any client advertising spend."),
  H2("Current status and documented activity"),
  P("As of the date of this plan, the company is approximately eight months into operations. Business revenue deposits between January and May 2026, as documented in the attached bank statements, total $6,070. Carpet Cleaning Xperts LLC (Orlando) appears as a recurring depositor in all five months. Additional documented deposits during the period include Franks Flooring Solutions LLC, Prime Point Market LLC, Zupra Services LLC, Luz Herrera, and Guillermo Martinez. The trajectory in this plan is the disciplined path from this documented base to an approximately $60,000 annual run rate by the end of year three."),

  // ---- 3. SERVICES & PRICING ----
  H1("3. Services & Pricing"),
  P("Documented pricing varies by client and project scope. Historical client engagements have generally ranged between $500 and $2,500 per month depending on services provided. The average recurring revenue assumption used throughout this business plan is approximately $2,000 per month across active client accounts. Pricing remains intentionally accessible to small businesses that cannot justify larger agency retainers while still providing sufficient margin to support delivery and growth."),
  H2("Monthly retainers"),
  table([3300, 2030, 4030], [
    ["Service", "Monthly fee", "What it covers"],
    ["Local services paid ads (Meta + Google Business)", "$500 – $1,200", "Campaign setup, weekly optimization, monthly call, reporting"],
    ["DTC paid social (Meta + Instagram)", "$750 – $1,500", "Audience and creative testing, monthly reporting, creative iteration"],
    ["Google Search / Performance Max", "$500 – $1,200", "Account build/audit, query mining, monthly review"],
    ["Marketing automation maintenance", "$300 – $800", "CRM hygiene, automation monitoring, monthly improvements"],
    ["Full-service combined retainer", "$1,000 – $2,500", "Two or more disciplines bundled (upper end)"],
  ]),
  spacer(),
  H2("Project fees (one-time)"),
  table([3300, 2030, 4030], [
    ["Project", "Fee range", "Typical duration"],
    ["Website / landing page rebuild", "$750 – $2,500", "2 – 4 weeks"],
    ["Funnel + tracking setup", "$500 – $1,500", "1 – 2 weeks"],
    ["Automation build (CRM + workflows)", "$750 – $2,000", "2 – 3 weeks"],
    ["Discovery / audit", "$250 – $500", "1 week"],
  ]),
  spacer(),

  // ---- 4. MARKET ANALYSIS ----
  H1("4. Market Analysis"),
  P("The agency operates in two Florida geographies: South Florida (Miami-Dade and Broward), where the owner is located, and Central Florida (Orlando metro), where Carpet Cleaning Xperts LLC — the agency’s documented recurring client — operates. Both are large small-business markets with substantial bilingual demand. Supporting figures and sources are documented in Exhibit 10.1."),
  H2("South Florida"),
  P("Miami-Dade County is one of the largest small-business markets in the United States. Per the U.S. Small Business Administration’s Florida Small Business Profile, Florida is home to approximately 3.3 million small businesses; Miami-Dade contributes a meaningful share of that count. Per U.S. Census American Community Survey data, Miami-Dade’s population is approximately 69% Hispanic or Latino — bilingual delivery is a baseline operating requirement."),
  H2("Central Florida"),
  P("Orlando is a fast-growing services and tourism economy. Per the U.S. Census Bureau, the Orlando-Kissimmee-Sanford metropolitan area is among the fastest-growing U.S. metros for population and small business formation, and Orange County’s Hispanic population share exceeds 30%. For Carpet Cleaning Xperts, demand for bilingual paid acquisition and local service-area focus is comparable to South Florida."),
  H2("Digital advertising and SMB demand"),
  P("Per eMarketer (Insider Intelligence), U.S. digital advertising spending continues in the range of approximately $290–$320 billion annually, with the majority concentrated in Meta and Google. Per HubSpot’s State of Marketing, small businesses typically spend 7–11% of revenue on marketing, with paid social and paid search consistently among the top three priority channels. Per BrightLocal and ServiceTitan, more than 75% of consumers research local services online before booking."),

  // ---- 5. SALES & CLIENT ACQUISITION ----
  H1("5. Sales & Client Acquisition"),
  H2("How clients are acquired"),
  P("Client acquisition is referral-driven and founder-led. New engagements come from existing-client referrals, direct relationships, and word-of-mouth inside the owner’s local network. The agency does not run a formal cost-per-acquisition tracking system and does not claim a precise CAC figure in this plan. In practical terms, acquisition cost is owner time spent on conversations, proposals, and follow-up, plus a small share of materials and the capped paid pilot funded by the grant."),
  H2("Documented retention evidence"),
  P("The agency has documented client retention evidence from its largest current client. Carpet Cleaning Xperts LLC (Orlando, Florida) appears as a Zelle depositor in every month from January through May 2026. Total deposits from this client across the five-month period — covering both marketing services and property-management-related items processed through the business — total approximately $5,120, as documented in Exhibit 10.2.2. This five-month consecutive payment record is the primary documented retention evidence underlying the forward forecast."),
  H2("Retention assumptions (forward)"),
  P("Retainer engagements are modeled forward at approximately 8 months on average in year one, 9 months in year two, and 10 months in year three. Annual logo churn is modeled at approximately 25–30%, which assumes one client per year terminating from a small steady base. Project work is reported as upside when secured."),
  H2("Pipeline targets"),
  P("Pipeline targets are intentionally modest. Year one targets two to three additional active clients (added during May–August 2026) on top of the documented client base. Year two targets approximately one net new signing. Year three targets approximately one to two net new signings. Almost all signings are expected to come from referrals."),

  // ---- 6. OPERATIONS & STAFFING ----
  H1("6. Operations & Staffing"),
  H2("Founder responsibilities"),
  P("The owner is the only full-time person in the business and handles strategy and account direction, sales and proposals, client communication and reporting, creative direction and copy, and the hands-on configuration of paid advertising accounts and automation workflows. Estimated time allocation: ~50% client delivery, ~25% sales and pipeline, ~15% contractor coordination and quality control, ~10% operations and administration."),
  H2("Contractor model and rates"),
  P("Specialist work that exceeds the owner’s bandwidth or skill set is performed by independent contractors on a project basis. There is no payroll. Target rates (Florida freelance market):"),
  table([3000, 2160, 4200], [
    ["Role", "Hourly rate", "When used"],
    ["Graphic designer", "$45 – $70", "Static ad creative, deck and identity polish"],
    ["Video editor", "$50 – $80", "Short-form ad cuts and edits"],
    ["Web developer (Webflow / Next.js)", "$60 – $100", "Custom site work beyond templates"],
    ["Paid media support (junior)", "$35 – $55", "Ad-set duplication, QA, scheduled tasks"],
  ]),
  spacer(),
  H2("Engagement rules and hiring"),
  P("Contractor engagement is governed by three rules: project price must cover contractor cost plus a defined margin (target: contractor cost ≤ 30% of associated revenue); no contractor is hired for ongoing retainer work unless the retainer has been live at least 60 days; and any contractor commitment above $500 is reviewed against the project P&L before approval. No employees are hired within the three-year planning window. A part-time coordinator role would only be contemplated if the agency carried sustained $8,000 in monthly recurring revenue alongside an active project backlog — a level not reached under the conservative base case in Section 7."),

  // ---- 7. FINANCIAL PLAN ----
  H1("7. Financial Plan"),
  H2("Historical revenue (January – May 2026)"),
  P("The financial model is anchored in documented business revenue received through the company’s operating account for the five-month period January through May 2026. The summary below is built from the attached Bank of America monthly statements; itemized deposit detail is in Exhibit 10.2.1."),
  table([2340, 2340, 2340, 2340], [
    ["Month (statement period)", "Documented revenue", "Of which: Carpet Cleaning Xperts", "Notable other clients"],
    ["Jan 2026", "$1,140", "$800", "Franks Flooring ($240); Prime Point Market ($100)"],
    ["Feb 2026", "$1,120", "$1,120", "—"],
    ["Mar 2026", "$1,560", "$1,200", "Zupra Services LLC ($360)"],
    ["Apr 2026", "$1,100", "$1,100", "—"],
    ["May 2026", "$1,150", "$900", "Luz Herrera ($150); Guillermo Martinez ($100)"],
    ["Total (5 months)", "$6,070", "$5,120", ""],
  ]),
  source("Historical revenue reflects all funds received through JDT Inc.'s operating account during the reporting period, including client services and property-management-related income processed by the business."),

  H2("Methodology"),
  P("Forward revenue is forecast bottom-up: continuation of the documented client base, modest June–August 2026 ramp with two to three additional retainer clients onboarded, and a conservative twelve-month run rate in years two and three. The average monthly retainer used in the forward model is $2,000 per client. Operating expenses are estimated from real vendor line items; contractor cost is modeled as a percentage of revenue. Owner compensation is treated as the residual after contractor cost, software, and operating expenses."),

  H2("Three-year forecast"),
  table([2340, 2340, 2340, 2340], [
    ["", "Year 1 (Sep ’25 – Aug ’26)", "Year 2 (Sep ’26 – Aug ’27)", "Year 3 (Sep ’27 – Aug ’28)"],
    ["Annual revenue (base)", "~$24,000", "~$42,000", "~$60,000"],
    ["Of which: documented", "~$6,070 (Jan–May ’26)", "—", "—"],
    ["Avg MRR per client", "~$2,000", "~$2,000", "~$2,000"],
    ["Avg active clients (forward months)", "~2", "~2", "~3"],
    ["Contractor cost (% of revenue)", "~20%", "~22%", "~25%"],
    ["Software + opex (12 mo.)", "~$5,000", "~$6,000", "~$7,500"],
    ["Owner compensation (residual)", "~$14,000", "~$27,000", "~$37,500"],
  ]),
  spacer(),

  H2("Year-one monthly cadence"),
  P("September through December 2025 are documented pre-revenue months. January through May 2026 are documented actuals (Bank of America monthly statements). June through August 2026 are a conservative projected ramp grounded in current client retention and additional retainer signings during the period."),
  table([1640, 1640, 1640, 2200, 2240], [
    ["Month", "Source", "Active clients", "Monthly revenue", "Cumulative"],
    ["Sep 2025", "Documented", "0", "$0", "$0"],
    ["Oct 2025", "Documented", "0", "$0", "$0"],
    ["Nov 2025", "Documented", "0", "$0", "$0"],
    ["Dec 2025", "Documented", "0", "$0", "$0"],
    ["Jan 2026", "Documented", "3", "$1,140", "$1,140"],
    ["Feb 2026", "Documented", "1", "$1,120", "$2,260"],
    ["Mar 2026", "Documented", "2", "$1,560", "$3,820"],
    ["Apr 2026", "Documented", "1", "$1,100", "$4,920"],
    ["May 2026", "Documented", "3", "$1,150", "$6,070"],
    ["Jun 2026", "Projected", "2", "$5,000", "$11,070"],
    ["Jul 2026", "Projected", "3", "$6,000", "$17,070"],
    ["Aug 2026", "Projected", "3", "$7,000", "$24,070"],
  ]),
  spacer(),
  P("Year-one base case totals approximately $24,000 — $6,070 documented through May 2026 plus approximately $18,000 projected across June–August 2026. The June–August ramp reflects (a) continuation of the documented Carpet Cleaning Xperts retainer, (b) one to two additional retainer signings during this period, and (c) modest project revenue."),

  H2("Break-even"),
  P("Monthly break-even is approximately $3,200 — the level of revenue required to cover software, basic operating expenses, contractor cost at the modeled ratio, and a minimum owner draw. Documented monthly revenue from January through May 2026 ($1,100–$1,560) sits below this level; the gap is funded by the grant’s working capital reserve and the owner. The base case reaches break-even in June 2026 as additional retainer revenue comes online and operates above break-even in every subsequent month of the planning period."),

  H2("Operating expense detail (estimated annual, Year 1)"),
  table([4400, 1800, 3160], [
    ["Line item", "Year 1", "Vendor / category"],
    ["CRM / email", "$360 – $600", "HubSpot Starter or Klaviyo"],
    ["Workflow automation", "$240 – $480", "Make.com or Zapier"],
    ["Design tools", "$720 – $1,000", "Adobe Creative Cloud, Figma"],
    ["Hosting / domains", "$240 – $480", "Site hosting, domain renewals"],
    ["AI assistance", "$240 – $480", "Drafting and research tools"],
    ["Insurance, legal, accounting", "$1,200 – $1,800", "GL, professional, accountant"],
    ["Outreach & content", "$600 – $1,200", "Materials, content production"],
    ["Misc & contingency", "$400 – $600", "Travel, supplies"],
    ["Estimated total", "$4,000 – $6,640", "Working baseline ~$5,000"],
  ]),
  spacer(),

  // ---- 8. USE OF FUNDS ----
  H1("8. Use of Funds"),
  P("The $15,000 grant is deployed against specific, line-itemized expenses across the twelve months following disbursement. Every allocation is tied to a vendor category and an operating outcome."),
  table([4500, 1500, 3360], [
    ["Allocation", "Amount", "Vendor / detail"],
    ["Contractor support (project delivery)", "$5,000", "~60–80 contractor hours: designer, video editor, developer"],
    ["Software subscriptions (12 months)", "$1,800", "HubSpot, Make/Zapier, Adobe CC, Figma, hosting"],
    ["CRM build & automation tooling", "$1,200", "Configuration, template build, monitoring"],
    ["Website infrastructure improvements", "$1,500", "Templates, tracking, page speed, conversion instrumentation"],
    ["Content / creative production", "$1,500", "Photography, copy, short-form video editing"],
    ["Business development & outreach", "$1,000", "Local networking, materials, founder-led outreach"],
    ["Client acquisition (capped paid pilot)", "$800", "Limited paid acquisition test for the agency itself"],
    ["Working capital reserve", "$2,200", "Funds essential operations through pre-revenue and below-break-even months"],
    ["Total", "$15,000", ""],
  ]),
  spacer(),

  // ---- 9. RISK ANALYSIS ----
  H1("9. Risk Analysis"),
  H2("Client concentration"),
  P("With a small documented client base — Carpet Cleaning Xperts accounting for the majority of documented deposits Jan–May 2026 — concentration is the largest near-term risk. Policy: no single client may exceed 50% of monthly service revenue once additional retainers are signed (a higher near-term threshold reflects the reality of a one-anchor-client launch). The threshold steps down to 25% by the end of year one as the client base widens."),
  H2("Client churn"),
  P("Annual logo churn is modeled at 25–30%. Mitigation: monthly written reporting; quarterly account reviews; a working capital reserve so a single churn event does not force survival decisions. Loss of Carpet Cleaning Xperts is the largest single risk event and is addressed by the reserve and the May–August signing plan in Section 7."),
  H2("Platform dependency"),
  P("Meta and Google policy changes, account suspensions, and pricing increases are real exposures. Mitigation: documented account ownership stays with the client; ad spend is the client’s line, billed directly to the client by the platform. The agency does not finance client ad spend."),
  H2("Founder capacity"),
  P("The owner is the single execution point. Mitigation: documented onboarding and reporting templates; contractor rules in Section 6; a hard cap of six active accounts before any payroll hire would be reconsidered."),
  H2("Cash flow"),
  P("Documented monthly revenue Jan–May 2026 sits below modeled break-even. Mitigation: working capital reserve seeded by the grant; retainers billed monthly in advance; projects require 50% deposit at signature."),
  H2("Contractor and economic risk"),
  P("Loss of a primary contractor is mitigated by maintaining two qualified contractors in each discipline. Marketing budgets are typically cut early in downturns; mitigation is pricing positioned below mid-market and engagements anchored to client revenue."),

  // ---- 10. SUPPORTING EXHIBITS ----
  H1("10. Supporting Exhibits"),

  H2("10.1 Market Evidence"),

  H3("Florida small business base"),
  P("Per the U.S. SBA’s 2023 Florida Small Business Profile, Florida is home to approximately 3.3 million small businesses, comprising approximately 99.8% of all businesses in the state. The U.S. Census Bureau’s Business Formation Statistics rank Florida among the top three states for high-propensity business applications. Miami-Dade and Orlando-Kissimmee-Sanford contribute leading shares of Florida’s small-business count."),
  source("Sources: U.S. SBA Office of Advocacy, 2023 Florida Small Business Profile; U.S. Census Bureau, Business Formation Statistics; County Business Patterns."),

  H3("Bilingual market and Hispanic-owned business growth"),
  P("Per the U.S. Census ACS 5-year estimates, Miami-Dade County’s population is approximately 69% Hispanic or Latino and Orange County (Orlando metro) exceeds 30% Hispanic. Per the Census Annual Business Survey, the number of Hispanic-owned employer businesses in the U.S. grew approximately 44% across the decade ending 2022. Florida ranks among the top three states for Hispanic-owned businesses by count, per the SBA Office of Advocacy."),
  source("Sources: U.S. Census Bureau, American Community Survey; Annual Business Survey; U.S. SBA Office of Advocacy."),

  H3("Digital advertising and SMB marketing demand"),
  P("Per eMarketer / Insider Intelligence, U.S. digital advertising spending continues in the range of $290–$320 billion annually. Per HubSpot’s State of Marketing and Gartner CMO Spend Surveys, small businesses typically spend 7–11% of revenue on marketing, with paid social and paid search consistently among the top three channels. Per BrightLocal and ServiceTitan, more than 75% of consumers research local services online before booking."),
  source("Sources: eMarketer / Insider Intelligence; HubSpot State of Marketing; Gartner CMO Spend Survey; BrightLocal; ServiceTitan."),

  H3("AI and automation adoption among SMBs"),
  P("Per HubSpot’s 2024 State of AI in Marketing and Salesforce’s Small & Medium Business Trends Report, more than half of small and mid-sized businesses surveyed report using AI in some form by 2024–2025, with marketing automation among the most commonly adopted use cases."),
  source("Sources: HubSpot State of AI in Marketing; Salesforce SMB Trends Report; McKinsey & Company State of AI."),

  H2("10.2 Financial Support Schedules"),

  H3("10.2.1 Documented deposit schedule (January – May 2026)"),
  P("All deposits below are sourced from the Bank of America monthly statements for account ending 7899. BoA KeepTheChange micro-credits and internal transfers are excluded. All third-party deposits received into the operating account during the reporting period are recognized as business revenue. Items marked “(RENTA)” are property-management-related deposits from the anchor client that flowed through the business operating account."),
  table([1500, 3000, 1700, 1700, 1460], [
    ["Date", "Source", "Amount", "Classification", "Statement period"],
    ["01/09/26", "Carpet Cleaning Xperts LLC", "$500.00", "Marketing services", "Jan ’26"],
    ["01/09/26", "Franks Flooring Solutions LLC", "$240.00", "Project", "Jan ’26"],
    ["01/16/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Jan ’26"],
    ["01/23/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Jan ’26"],
    ["01/27/26", "Prime Point Market LLC", "$100.00", "Project", "Jan ’26"],
    ["01/30/26", "Carpet Cleaning Xperts LLC", "$170.00", "Marketing services", "Feb ’26"],
    ["02/06/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Feb ’26"],
    ["02/12/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Feb ’26"],
    ["02/17/26", "Carpet Cleaning Xperts LLC (RENTA MARZO)", "$400.00", "Property management", "Feb ’26"],
    ["02/19/26", "Carpet Cleaning Xperts LLC", "$250.00", "Marketing services", "Feb ’26"],
    ["02/25/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Mar ’26"],
    ["03/05/26", "Carpet Cleaning Xperts LLC", "$250.00", "Marketing services", "Mar ’26"],
    ["03/12/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Mar ’26"],
    ["03/16/26", "Carpet Cleaning Xperts LLC", "$500.00", "Marketing services", "Mar ’26"],
    ["03/20/26", "Zupra Services LLC", "$360.00", "Project", "Mar ’26"],
    ["03/26/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Mar ’26"],
    ["04/02/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Apr ’26"],
    ["04/07/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Apr ’26"],
    ["04/14/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Apr ’26"],
    ["04/20/26", "Carpet Cleaning Xperts LLC (RENTA APTO)", "$500.00", "Property management", "Apr ’26"],
    ["04/22/26", "Carpet Cleaning Xperts LLC", "$150.00", "Marketing services", "Apr ’26"],
    ["04/29/26", "Carpet Cleaning Xperts LLC", "$200.00", "Marketing services", "May ’26"],
    ["05/18/26", "Carpet Cleaning Xperts LLC (RENTA APARTAMENTO)", "$500.00", "Property management", "May ’26"],
    ["05/18/26", "Luz Herrera", "$150.00", "Other deposit", "May ’26"],
    ["05/22/26", "Carpet Cleaning Xperts LLC (FELIZ CUMPLEAOS)", "$200.00", "Marketing services", "May ’26"],
    ["05/26/26", "Guillermo Martinez", "$100.00", "Other deposit", "May ’26"],
    ["", "Total business revenue", "$6,070.00", "", ""],
    ["", "Of which: marketing services", "$4,420.00", "", ""],
    ["", "Of which: property management", "$1,400.00", "", ""],
    ["", "Of which: other deposits", "$250.00", "", ""],
  ]),
  spacer(),

  H3("10.2.2 Retention evidence — Carpet Cleaning Xperts LLC"),
  P("Carpet Cleaning Xperts LLC made deposits to the company’s operating account in every month between January and May 2026 — a documented five-month consecutive payment record. The table below summarizes the client’s monthly activity:"),
  table([2080, 1700, 2200, 2200, 1180], [
    ["Month", "Deposit count", "Marketing services", "Property management", "Total revenue"],
    ["January 2026", "3", "$800", "$0", "$800"],
    ["February 2026", "5", "$720", "$400", "$1,120"],
    ["March 2026", "5", "$1,200", "$0", "$1,200"],
    ["April 2026", "5", "$600", "$500", "$1,100"],
    ["May 2026", "3", "$400", "$500", "$900"],
    ["Five-month total", "21", "$3,720", "$1,400", "$5,120"],
  ]),
  spacer(),
  P("This is direct, third-party-verifiable evidence of recurring revenue from a retained client over a five-consecutive-month window. It is the primary documented retention support underlying the forward forecast."),

  H3("10.2.3 Projection methodology"),
  P("The Year 1 forecast of approximately $24,000 is constructed as documented Jan–May 2026 deposits ($6,070) plus a projected June–August 2026 ramp ($18,000). The June–August ramp assumes (a) continuation of the documented Carpet Cleaning Xperts retainer, (b) one to two additional retainer signings during the three-month window, and (c) modest project revenue. Years 2 and 3 assume an average of two and three active clients respectively at the $2,000 average monthly retainer (i.e., 2 × $2,000 × 12 = $48,000 less ~$6,000 churn allowance = ~$42,000 Y2; 3 × $2,000 × 12 = $72,000 less ~$12,000 churn allowance = ~$60,000 Y3)."),

  H3("10.2.4 Break-even analysis"),
  table([4500, 4860], [
    ["Component", "Year 1 monthly"],
    ["Software / opex (allocated monthly)", "~$420"],
    ["Owner minimum draw", "~$1,500"],
    ["Contractor floor (variable; modeled at floor revenue)", "~$900"],
    ["Reserve replenishment allocation", "~$380"],
    ["Required revenue at monthly break-even", "~$3,200"],
  ]),
  spacer(),
  P("Documented monthly revenue Jan–May 2026 ($1,100–$1,560) sits below this $3,200 break-even threshold; the gap is covered by the grant’s $2,200 working capital reserve and owner working capital. The base case reaches break-even in June 2026 as the projected ramp brings monthly revenue above the threshold; the business operates above break-even in every subsequent month of the planning period."),
];

const doc = new Document({ styles, numbering, sections: [{ properties: { page: PAGE }, footers: { default: footer }, children: plan }] });
Packer.toBuffer(doc).then((b) => { fs.writeFileSync("JDT-Inc-Business-Plan.docx", b); console.log("built"); }).catch((e) => { console.error(e); process.exit(1); });
