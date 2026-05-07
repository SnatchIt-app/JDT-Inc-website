/**
 * JDT Inc. — Services data.
 *
 * The eight services in this file map 1:1 to dynamic pages at
 * /services/[slug]. Each entry carries:
 *   - card surface fields used by /services (index) and the homepage
 *   - per-service SEO metadata (meta title, description, keyword cluster)
 *   - the full editorial content rendered by the [slug] page template
 *
 * Editorial voice rules:
 *   - confident, not boastful
 *   - specific over generic; operational AI examples, not buzzwords
 *   - hyphens as parenthetical breaks (matches the rest of the site)
 *   - "system," "compounding," "engineered," "senior operators" recur
 *
 * SEO rules:
 *   - meta titles ≤ 60 characters, descriptions ≤ 160
 *   - primary keyword in H1 + meta title + first 100 words
 *   - secondary keywords woven into prose, never listed
 *   - outcomes are framed as targets ("what we engineer for"),
 *     not as guaranteed results — defensible from any angle
 */

export type Service = {
  // ─── Card / index surface ─────────────────────────────────────────
  slug: string;
  title: string;
  short: string;
  outcome: string;
  /** Short bullet list rendered on the /services index page. */
  details: string[];

  // ─── SEO metadata ────────────────────────────────────────────────
  seo: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };

  // ─── Page sections (rendered by /services/[slug]/page.tsx) ───────
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
  };
  outcomes: { value: string; label: string }[];
  whoFor: {
    intro: string;
    clients: string[];
    industries: string[];
    stages: string[];
  };
  methodology: {
    intro: string;
    steps: { step: string; title: string; body: string }[];
  };
  deliverables: {
    intro: string;
    items: { title: string; body: string }[];
  };
  aiDifferentiation: {
    intro: string;
    pillars: { title: string; body: string }[];
  };
  /** Slugs from lib/caseStudies.ts. */
  relatedCaseStudies: string[];
  faqs: { question: string; answer: string }[];
  /** Other service slugs to surface for internal linking. */
  related: string[];
};

export const services: Service[] = [
  // ─────────────────────────────────────────────────────────────────
  // 1. META ADS
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "meta-ads",
    title: "Meta Ads",
    short:
      "Facebook and Instagram campaigns engineered around audience modeling, creative testing, and ROAS — not vanity reach.",
    outcome:
      "A Meta program where every dollar is accounted for and the cohort improves month over month.",
    details: [
      "Audience modeling & lookalike strategy",
      "Creative testing matrices",
      "Attribution & post-iOS measurement",
      "Budget scaling & cohort reporting",
    ],
    seo: {
      metaTitle: "Meta Ads Agency in Miami — JDT Inc.",
      metaDescription:
        "Meta Ads built for measurable growth. JDT Inc. designs Facebook and Instagram campaigns engineered around audience modeling, creative testing, and ROAS.",
      primaryKeyword: "meta ads agency",
      secondaryKeywords: [
        "facebook ads agency",
        "instagram ads agency",
        "meta advertising miami",
        "paid social agency",
        "facebook advertising",
        "ROAS optimization",
      ],
    },
    hero: {
      eyebrow: "Service · Meta Ads",
      h1: "Meta Ads, built for compounding growth.",
      subheadline:
        "JDT Inc. is a Miami-based Meta Ads agency. We run Facebook and Instagram programs as engineered systems — audience modeling, creative variants, structured testing, and post-iOS measurement, all aligned to the metric that pays your bills.",
    },
    outcomes: [
      { value: "−25–40%", label: "Target cost per lead reduction" },
      { value: "2–4×", label: "Return on ad spend we engineer for" },
      { value: "30+", label: "Creative variants tested per quarter" },
      { value: "Weekly", label: "Cohort reporting cadence" },
    ],
    whoFor: {
      intro:
        "Meta works hardest for brands with a clear story, a defined buyer, and a willingness to test. The clients who get the most out of our program tend to share the same shape:",
      clients: [
        "DTC brands with a working product and a creative bench that needs leverage",
        "Professional services firms where lead quality matters more than volume",
        "Luxury and lifestyle brands where the creative bar is the floor",
      ],
      industries: [
        "Apparel & accessories",
        "Health & wellness",
        "Beauty & personal care",
        "Hospitality & F&B",
        "Professional services",
      ],
      stages: [
        "Established brands scaling beyond $1M ARR",
        "Funded DTC companies prepping for the next growth tier",
        "Local operators expanding into new markets",
      ],
    },
    methodology: {
      intro:
        "Every Meta engagement runs the same four-stage loop. We compress the work that traditional agencies stretch into months, and we keep the loop running for as long as we work together.",
      steps: [
        {
          step: "01",
          title: "Audience modeling",
          body: "We map the buyer using first-party data — purchase history, customer-call transcripts, support tickets, reviews — and cluster behavioral patterns into audience territories with concrete creative angles.",
        },
        {
          step: "02",
          title: "Creative system",
          body: "Senior creative direction produces a matrix of variants, each tied to an angle and a hook. Static, motion, and UGC are produced in parallel, not in series, so testing volume is high from day one.",
        },
        {
          step: "03",
          title: "Structured testing",
          body: "Audiences and creatives are tested under controlled conditions — not throwing variants at the wall. Winning combinations graduate, losers are retired, and the matrix evolves every two weeks.",
        },
        {
          step: "04",
          title: "Cohort optimization",
          body: "Spend scales against verified contribution, not platform-reported attribution alone. We report on cohorts, payback windows, and the leading indicators that predict the next quarter — not the last one.",
        },
      ],
    },
    deliverables: {
      intro:
        "What's built and handed over inside a typical Meta engagement.",
      items: [
        {
          title: "Account architecture",
          body: "Campaign structure, audience hierarchy, exclusion logic, and naming conventions designed for clean reads at scale — not legacy chaos.",
        },
        {
          title: "Creative production system",
          body: "Editorial direction, art direction, and ongoing creative output — static, motion, UGC. Built to run, not to deliver one-time files.",
        },
        {
          title: "Measurement stack",
          body: "Conversion API, server-side events, UTM hygiene, and a post-iOS attribution layer that survives the next privacy update.",
        },
        {
          title: "Testing roadmap",
          body: "A live document that maps the next 30, 60, and 90 days of audience, creative, and offer tests — so the work compounds.",
        },
        {
          title: "Cohort reporting",
          body: "Weekly performance reads tied to revenue, payback, and contribution — not impressions and CPMs.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "AI in Meta Ads is overpromised in pitch decks and underused in practice. Here is exactly where we apply it — and where we deliberately don't.",
      pillars: [
        {
          title: "LLM-clustered audience modeling",
          body: "Customer support transcripts, sales call recordings, and review datasets are run through a structured language-model pipeline that surfaces audience territories — concepts and angles a manual analyst team would take weeks to extract from the same data.",
        },
        {
          title: "Creative variant matrices",
          body: "Hooks, headlines, and copy are generated under brand-voice constraints, then human-edited. The output isn't auto-published — it's a 10× larger testing pool, every variant reviewed by a senior creative before it sees a dollar.",
        },
        {
          title: "Anomaly detection in spend",
          body: "Daily performance is monitored by a model that flags statistically meaningful deviations — sudden CPM spikes, audience fatigue, attribution gaps — before a human would catch them in the dashboard.",
        },
      ],
    },
    relatedCaseStudies: ["22nation", "carpet-cleaning-xperts"],
    faqs: [
      {
        question: "What's the minimum monthly Meta Ads budget you work with?",
        answer:
          "We typically start at $10K/month in media spend, plus the management retainer. Below that, structured testing breaks down — there isn't enough volume to read variants statistically, and the work stops compounding.",
      },
      {
        question: "How is JDT different from a traditional Meta Ads agency?",
        answer:
          "Three differences. Senior operators run every account — no junior handoff. Creative is produced in-house, so testing volume isn't gated by external partners. And our reporting ties spend to verified contribution and payback windows, not platform-reported ROAS.",
      },
      {
        question: "How long until we see results?",
        answer:
          "We expect to see directional read on creative within 14–21 days, audience signal within 30, and a clean cohort read at 60–90 days. Anyone promising shorter is either lucky or lying.",
      },
      {
        question: "Do you handle creative in-house?",
        answer:
          "Yes — editorial direction, art direction, static, motion, and UGC sourcing are all in-house. That's the leverage. Agencies that outsource creative can't run a real testing matrix.",
      },
      {
        question: "What happens after the first 90 days?",
        answer:
          "The system is in production by day 90. The work shifts to optimization, scaling, and adding new audience territories. Most clients stay 12+ months because the cohort improves quarter over quarter.",
      },
    ],
    related: ["google-ads", "funnel-optimization", "creative-direction"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. GOOGLE ADS
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "google-ads",
    title: "Google Ads",
    short:
      "Search, Performance Max, and Shopping campaigns engineered for qualified pipeline — not impressions.",
    outcome:
      "A Google program that captures intent and feeds your sales motion with leads it can actually close.",
    details: [
      "Search & Performance Max strategy",
      "Keyword research & SQR mining",
      "Conversion tracking & enhanced conversions",
      "Bid scaling & negative-keyword hygiene",
    ],
    seo: {
      metaTitle: "Google Ads Agency, Miami — JDT Inc.",
      metaDescription:
        "Google Ads — Search, Performance Max, Shopping — engineered for qualified pipeline. Senior operators, AI-assisted bidding, transparent reporting.",
      primaryKeyword: "google ads agency",
      secondaryKeywords: [
        "google ads management",
        "PPC agency",
        "search ads agency",
        "performance max",
        "shopping ads management",
        "google ads miami",
      ],
    },
    hero: {
      eyebrow: "Service · Google Ads",
      h1: "Google Ads, engineered for qualified pipeline.",
      subheadline:
        "JDT Inc. is a Miami-based Google Ads agency. We run Search, Performance Max, and Shopping programs that capture real buying intent — built around tight account architecture, AI-assisted bidding, and conversion tracking that survives the next privacy change.",
    },
    outcomes: [
      { value: "−20–35%", label: "Target cost per acquisition reduction" },
      { value: "3–6×", label: "Return on ad spend we engineer for" },
      { value: "Daily", label: "SQR + bid review cadence" },
      { value: "Quarterly", label: "Account architecture audit" },
    ],
    whoFor: {
      intro:
        "Google rewards businesses with demand to capture and a clean conversion event to optimize toward. Our program fits clients who fit that shape:",
      clients: [
        "Service businesses with a defined buyer and a quotable offer",
        "Ecommerce brands with a working product margin and inventory depth",
        "Local operators competing in geo-defined markets",
      ],
      industries: [
        "Local & home services",
        "Professional services",
        "B2B SaaS",
        "Ecommerce & DTC",
        "Healthcare & wellness",
      ],
      stages: [
        "Operators looking to systematize an existing manual program",
        "Brands hitting plateaus on Meta and adding intent capture",
        "Businesses ready to retire spreadsheet tracking",
      ],
    },
    methodology: {
      intro:
        "Google Ads rewards architecture and discipline. Our four-stage loop is built to compound those advantages.",
      steps: [
        {
          step: "01",
          title: "Account architecture",
          body: "We rebuild — or build from scratch — the campaign structure, ad group taxonomy, and naming logic so the account can scale without becoming unreadable.",
        },
        {
          step: "02",
          title: "Intent mapping",
          body: "Keyword research is paired with search query mining — running historical SQRs through an LLM classifier to surface intent clusters, negative-keyword opportunities, and the gaps competitors leave open.",
        },
        {
          step: "03",
          title: "Creative & landing alignment",
          body: "Ad copy and landing pages are produced in matched pairs. Each variant lines up to a specific intent cluster — no more sending high-intent traffic to a generic homepage.",
        },
        {
          step: "04",
          title: "Bid governance",
          body: "Smart Bidding is steered, not surrendered to. We feed the platform clean conversion data, govern bid strategies by margin and payback, and audit account drift weekly.",
        },
      ],
    },
    deliverables: {
      intro:
        "What ships during a Google Ads engagement, beyond the live campaigns themselves.",
      items: [
        {
          title: "Account audit & rebuild plan",
          body: "A documented audit of the existing account, what's worth keeping, what gets retired, and the rebuild sequence.",
        },
        {
          title: "Conversion tracking layer",
          body: "Enhanced conversions, GA4 events, server-side tracking where appropriate, and offline conversion imports for sales-led businesses.",
        },
        {
          title: "Search query mining",
          body: "A monthly review of every paid query — graduating winners, building negatives, surfacing intent shifts before they become budget leaks.",
        },
        {
          title: "Landing page system",
          body: "Templated landers tied to intent clusters, instrumented for conversion testing, designed in the brand language.",
        },
        {
          title: "Quarterly architecture audit",
          body: "Once a quarter we tear down the account and rebuild what's drifted — keeping the structure clean as it scales.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "Google's own AI does most of the bidding. Our advantage is in what we feed it, what we filter out, and what we catch when it goes wrong.",
      pillars: [
        {
          title: "LLM-classified search query reports",
          body: "Every paid query in the account is classified by intent and theme using a custom LLM pipeline. What used to be a manual review of 10,000 queries becomes a Tuesday-morning meeting.",
        },
        {
          title: "Brand-voice ad copy at scale",
          body: "Responsive Search Ad assets are generated under documented brand-voice constraints, then human-edited. RSA pinning and asset diversity follow Google's best practices — but the volume of high-quality variants is what compounds.",
        },
        {
          title: "Bid strategy guardrails",
          body: "Automated bidding is monitored by anomaly detection — sudden CPC spikes, conversion-tracking gaps, geographic anomalies — flagged before the platform finishes learning from a bad signal.",
        },
      ],
    },
    relatedCaseStudies: ["carpet-cleaning-xperts"],
    faqs: [
      {
        question: "Do you work with both Search and Performance Max?",
        answer:
          "Yes — and we treat them as complementary, not competitive. Search owns the highest-intent queries with full transparency; Performance Max captures incremental demand with proper exclusion strategy. Most accounts run both.",
      },
      {
        question: "How do you handle conversion tracking with privacy changes?",
        answer:
          "Enhanced conversions, server-side GA4, and offline conversion imports for sales-led businesses. Where consent allows, we layer first-party data feeds so the platform optimizes on signals that survive cookie deprecation.",
      },
      {
        question: "What's the minimum spend to run a real Google program?",
        answer:
          "$5K–10K/month is the floor for our engagement model. Below that, you can't gather enough data for clean reads and the work doesn't compound.",
      },
      {
        question: "Can you take over an existing Google Ads account?",
        answer:
          "Yes — and we usually do. The first 30 days are an audit and rebuild plan, not a full teardown. We preserve what's working, document what isn't, and migrate carefully so historical learning isn't lost.",
      },
      {
        question: "How is reporting different from what an in-house team would build?",
        answer:
          "We tie every dollar of spend to revenue, payback, and contribution — not platform-reported conversions. The weekly read shows what's driving the business, not what makes the dashboard look full.",
      },
    ],
    related: ["meta-ads", "lead-generation", "funnel-optimization"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. AI AUTOMATION
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "ai-automation",
    title: "AI Automation",
    short:
      "Operational AI systems that compress weeks of analyst work into hours — across marketing, sales, and reporting.",
    outcome:
      "A workflow stack that runs in the background, surfaces signals faster than humans can, and frees senior people from manual work.",
    details: [
      "Lead enrichment & scoring workflows",
      "Content & creative generation pipelines",
      "Reporting & analytics agents",
      "CRM & lifecycle automation",
    ],
    seo: {
      metaTitle: "AI Automation for Marketing & Ops — JDT Inc.",
      metaDescription:
        "AI automation that compresses weeks of analyst work into hours — audience modeling, lead enrichment, content workflows, and reporting that runs on its own.",
      primaryKeyword: "ai automation agency",
      secondaryKeywords: [
        "AI marketing automation",
        "marketing AI agency",
        "AI workflow automation",
        "operational AI",
        "AI for marketing",
        "AI consulting agency",
      ],
    },
    hero: {
      eyebrow: "Service · AI Automation",
      h1: "AI automation, where it actually compounds.",
      subheadline:
        "Most agencies sell AI as a buzzword. We design and operate the systems — lead enrichment, audience modeling, content workflows, brand-voice generation, and reporting agents — that compress weeks of manual work into hours, with senior humans still in the loop where it matters.",
    },
    outcomes: [
      { value: "10×+", label: "Speed on audience research" },
      { value: "−60%", label: "Manual reporting time" },
      { value: "24/7", label: "Lead enrichment cadence" },
      { value: "Weeks", label: "Time to production system" },
    ],
    whoFor: {
      intro:
        "AI automation pays back fastest where there's repeatable knowledge work and clean data. The clients who get the most leverage tend to share these traits:",
      clients: [
        "Founder-led businesses where senior people are stuck doing manual work",
        "Sales-led companies with high lead volume and inconsistent qualification",
        "Marketing teams drowning in reporting requests from leadership",
      ],
      industries: [
        "Professional services",
        "B2B SaaS",
        "Financial services",
        "Healthcare & wellness",
        "Local & home services",
      ],
      stages: [
        "Teams of 10–100 hitting operational ceilings",
        "Companies in PE/VC scaling phases",
        "Established operators automating before scaling headcount",
      ],
    },
    methodology: {
      intro:
        "Every AI automation engagement runs through the same four-stage loop. We don't ship demos — we ship production systems with documentation, monitoring, and a runbook.",
      steps: [
        {
          step: "01",
          title: "Workflow audit",
          body: "We sit with the people doing the work, document the steps, identify what's repeatable, and map where AI adds leverage versus where it adds risk. Not everything should be automated.",
        },
        {
          step: "02",
          title: "System design",
          body: "Each workflow is designed as a graph — inputs, transformations, validation, human-review gates, output. We pick tools (Clay, n8n, Zapier, Make, custom code, the OpenAI / Anthropic APIs) based on the job, not the trend.",
        },
        {
          step: "03",
          title: "Production build",
          body: "Systems are built with monitoring, error handling, and clear ownership. Senior humans review where judgment matters — copy approval, lead qualification, anomaly response — so quality holds at scale.",
        },
        {
          step: "04",
          title: "Operating handoff",
          body: "We document the runbook, train the in-house team, and stay on retainer for the first quarter to tune. The system is yours when we're done — not a black box that breaks the moment we leave.",
        },
      ],
    },
    deliverables: {
      intro:
        "What gets built inside a typical AI automation engagement.",
      items: [
        {
          title: "Lead enrichment & scoring",
          body: "Inbound and outbound leads enriched with firmographic, intent, and persona data — then scored against your ICP using a model trained on your closed-won history.",
        },
        {
          title: "Content & creative pipelines",
          body: "Brand-voice generation pipelines for ad copy, email, social, and short-form video scripts. Senior creative reviews every output before it ships.",
        },
        {
          title: "Reporting agents",
          body: "Weekly performance digests compiled automatically — pulling from Meta, Google, GA4, your CRM — and written in your team's voice, not template English.",
        },
        {
          title: "Audience modeling",
          body: "Customer-call transcripts, support tickets, and review data clustered into audience territories that inform creative, copy, and product positioning.",
        },
        {
          title: "Operations runbook",
          body: "Documentation of every workflow, owner, monitoring alert, and escalation path — so the team can run the system without us.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "Most agencies say they 'use AI.' Here's what that actually looks like in production for our clients.",
      pillars: [
        {
          title: "Structured prompting, not chat",
          body: "Production systems use structured prompts with explicit schemas, validation, and retry logic — not a teammate copying outputs out of ChatGPT. The difference is reliability and audit trail.",
        },
        {
          title: "Human-in-the-loop where it matters",
          body: "Every system has a defined gate where a senior human reviews. Copy ships through editors. Leads route through a qualifier. Reports are signed off before they leave the building. Speed without judgment is just faster mistakes.",
        },
        {
          title: "Tool-agnostic by design",
          body: "We build on Clay, n8n, Make, Zapier, custom code, and the major model APIs depending on the workload. The systems aren't locked into a single vendor — so when models or pricing change, the work doesn't break.",
        },
      ],
    },
    relatedCaseStudies: ["22nation"],
    faqs: [
      {
        question: "Is this AI strategy or AI implementation?",
        answer:
          "Both, but heavily weighted toward implementation. We won't ship a strategy deck without ownership of the systems that come from it. The deliverable is working software — production workflows, documented and monitored — not a roadmap.",
      },
      {
        question: "Which tools do you build on?",
        answer:
          "Tool selection is workload-driven. Lead enrichment usually runs on Clay. Workflow orchestration on n8n, Zapier, or Make. Generation pipelines on the OpenAI and Anthropic APIs depending on the use case. We avoid lock-in.",
      },
      {
        question: "Do you replace our marketing team?",
        answer:
          "No — we make it harder to replace them. The goal is leverage, not headcount reduction. Senior humans get freed from manual work to do the judgment-heavy parts that matter.",
      },
      {
        question: "How long does a build take?",
        answer:
          "A first production system typically ships in 4–8 weeks, depending on data readiness and the workflow's complexity. We size projects against business value, not engineering time.",
      },
      {
        question: "Who owns the systems we build?",
        answer:
          "You do. We document everything, train your team, and the runbook lives in your tools. We stay on retainer if you want ongoing optimization, but the system isn't ours to take with us.",
      },
    ],
    related: ["lead-generation", "crm-systems", "content-production"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. CONTENT PRODUCTION
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "content-production",
    title: "Content Production",
    short:
      "Editorial content systems — short-form, long-form, talent, and post — built to drive both brand and pipeline.",
    outcome:
      "Consistent, high-signal content that compounds attention and converts it into real revenue.",
    details: [
      "Editorial direction & content pillars",
      "Short-form & long-form production",
      "Creator & talent sourcing",
      "Distribution & repurposing systems",
    ],
    seo: {
      metaTitle: "Content Production for Brands — JDT Inc.",
      metaDescription:
        "Editorial content systems — short-form, long-form, talent, and post — built to drive both brand and pipeline. Senior direction, AI-accelerated production.",
      primaryKeyword: "content production agency",
      secondaryKeywords: [
        "content marketing agency",
        "editorial content agency",
        "video production agency",
        "content systems",
        "short-form video agency",
        "creator content agency",
      ],
    },
    hero: {
      eyebrow: "Service · Content Production",
      h1: "Content production, treated as a system.",
      subheadline:
        "JDT Inc. produces content the way a magazine produces an issue — with editorial direction, a calendar, a roster of voices, and a post system. Short-form, long-form, video, written. Built for brands that want consistency, not one-off virality.",
    },
    outcomes: [
      { value: "30+", label: "Pieces produced per quarter" },
      { value: "8–12", label: "Weeks ahead in the calendar" },
      { value: "4×", label: "Repurposed assets per shoot" },
      { value: "1", label: "Editorial voice across surfaces" },
    ],
    whoFor: {
      intro:
        "Content production pays back when there's a real story to tell, an audience worth showing up for, and the patience to build over months — not weeks.",
      clients: [
        "DTC brands building brand equity alongside performance",
        "Founder-led businesses where the founder is the voice",
        "Service firms positioning as the category authority",
      ],
      industries: [
        "Apparel & accessories",
        "Health & wellness",
        "Hospitality & F&B",
        "Professional services",
        "Real estate & lifestyle",
      ],
      stages: [
        "Brands that already advertise and need editorial weight to match",
        "Companies preparing for a category move or product launch",
        "Operators rebuilding content after years of inconsistency",
      ],
    },
    methodology: {
      intro:
        "Content as a system, not as a sprint. The four stages of every engagement:",
      steps: [
        {
          step: "01",
          title: "Editorial direction",
          body: "Pillars, voice, point of view, visual standards. The codified version of what makes the brand worth listening to — the document every later decision is checked against.",
        },
        {
          step: "02",
          title: "Calendar & cadence",
          body: "An 8–12 week look-ahead calendar tied to business goals — campaigns, launches, seasonal beats. Each piece sized, scoped, and slotted before production starts.",
        },
        {
          step: "03",
          title: "Production batching",
          body: "Shoots and recordings batched for efficiency. One day on set yields 30 pieces of content — short-form, long-form, stills, captions, scripts. Every shoot is engineered for repurposing.",
        },
        {
          step: "04",
          title: "Distribution & repurposing",
          body: "Each piece is cut for the surface it lives on — owned, paid, organic. Performance is read against pillars, not posts, so the system improves issue over issue.",
        },
      ],
    },
    deliverables: {
      intro:
        "What ships across a content production engagement.",
      items: [
        {
          title: "Editorial guideline document",
          body: "Voice, pillars, visual standards, talent direction — the source of truth every freelancer and editor works from.",
        },
        {
          title: "Production calendar",
          body: "An 8–12 week rolling calendar tied to business goals, with capacity, dependencies, and review checkpoints.",
        },
        {
          title: "Short-form video output",
          body: "Reels, TikToks, YouTube Shorts — produced under direction, captioned, optimized per platform, scheduled.",
        },
        {
          title: "Long-form direction",
          body: "Articles, podcasts, video features — fewer pieces, higher craft, treated as flagship content the brand can stand behind.",
        },
        {
          title: "Talent & creator sourcing",
          body: "Casting, briefing, and managing creators and presenters who fit the brand — not the lowest-CPM voice on the platform.",
        },
        {
          title: "Performance reporting",
          body: "Performance read against pillars and business goals, not vanity metrics. Course corrections feed back into the calendar.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "AI accelerates production without lowering the bar — when used precisely. Where we use it, and where we don't:",
      pillars: [
        {
          title: "Ideation acceleration",
          body: "We use LLMs to expand from a single editorial pillar into 50+ topic angles, then a senior editor culls to the 5–8 worth producing. The model widens the funnel; the human picks.",
        },
        {
          title: "Repurposing pipelines",
          body: "Long-form content is processed through a transcription and segmentation pipeline that surfaces clip-worthy moments, generates captions, and proposes short-form cuts — reviewed before anything ships.",
        },
        {
          title: "Brand-voice draft generation",
          body: "Captions, headlines, and email subject lines drafted in the documented brand voice. Senior writers approve every line before it leaves the system. The output isn't 'AI content' — it's accelerated editing.",
        },
      ],
    },
    relatedCaseStudies: ["22nation"],
    faqs: [
      {
        question: "Do you produce video, or just write?",
        answer:
          "Both. Editorial direction is the system; video, photo, and written are surfaces. A typical production day yields output across all of them — that's the leverage.",
      },
      {
        question: "Can we work with our in-house creators?",
        answer:
          "Yes — and many of our best engagements do. We bring direction, calendar, and post; your team brings the voice and on-camera presence. The handoff stays clean because everyone works from the same editorial document.",
      },
      {
        question: "How many pieces of content per month should we expect?",
        answer:
          "Typical engagements produce 20–30 pieces a month across surfaces, batched for efficiency. Volume isn't the point — pillar coverage and consistency are. We'd rather ship 12 strong pieces than 60 weak ones.",
      },
      {
        question: "Do you use AI for the writing?",
        answer:
          "We use AI to widen ideation and accelerate first drafts. Every line that ships has been edited by a human. The output is content with editorial standards, not 'AI content.'",
      },
      {
        question: "How do you measure content performance?",
        answer:
          "Against business pillars, not posts. Reach and engagement matter, but they're leading indicators. The lagging measures — pipeline contribution, brand search lift, audience depth — are what the work is judged on.",
      },
    ],
    related: ["creative-direction", "ai-automation", "meta-ads"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. CREATIVE DIRECTION
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "creative-direction",
    title: "Creative Direction",
    short:
      "Editorial-grade creative direction — campaign concepts, art direction, and content systems that elevate brand and outperform in feed.",
    outcome:
      "Creative that earns attention before it converts it — and a system that keeps the bar high every quarter.",
    details: [
      "Campaign concept & art direction",
      "Visual identity & system extension",
      "Editorial design & layout",
      "Motion direction & post supervision",
    ],
    seo: {
      metaTitle: "Creative Direction & Art Direction — JDT Inc.",
      metaDescription:
        "Editorial creative direction — campaign concepts, art direction, and content systems that elevate the brand and outperform in feed.",
      primaryKeyword: "creative direction agency",
      secondaryKeywords: [
        "art direction agency",
        "campaign creative agency",
        "brand direction agency",
        "editorial design agency",
        "creative agency miami",
        "luxury creative agency",
      ],
    },
    hero: {
      eyebrow: "Service · Creative Direction",
      h1: "Creative direction, with editorial standards.",
      subheadline:
        "JDT Inc. is a Miami-based creative direction studio. We build campaign concepts, art direction, and content systems that look like an editorial publication — and outperform in feed because the bar is higher than the platform's average.",
    },
    outcomes: [
      { value: "Editorial", label: "The standard, not the goal" },
      { value: "1", label: "Senior director per engagement" },
      { value: "12+", label: "Concept directions per campaign" },
      { value: "Quarterly", label: "Brand-bar audit" },
    ],
    whoFor: {
      intro:
        "Creative direction is what raises the floor for everything downstream. The clients who get the most out of it are the ones who treat brand as a competitive advantage:",
      clients: [
        "Luxury and lifestyle brands where craft is the price of entry",
        "DTC brands competing on positioning, not price",
        "Founder-led companies preparing for a category move or rebrand",
      ],
      industries: [
        "Apparel & accessories",
        "Beauty & personal care",
        "Hospitality & F&B",
        "Real estate & lifestyle",
        "Health & wellness",
      ],
      stages: [
        "Established brands maturing past their early identity",
        "Pre-launch companies setting the bar at day one",
        "Operators rebranding after a meaningful business shift",
      ],
    },
    methodology: {
      intro:
        "Creative direction is judgment work. Our four-stage process keeps the work senior, the references rigorous, and the output ownable.",
      steps: [
        {
          step: "01",
          title: "Brief & territory",
          body: "We translate the business problem into a creative brief — audience, message, surface, constraints. Then we explore territories: tone, references, visual codes, what the campaign is and is not.",
        },
        {
          step: "02",
          title: "Direction document",
          body: "The chosen territory becomes a direction document — moodboards, references, type, color, motion principles. The document the rest of the work is checked against.",
        },
        {
          step: "03",
          title: "Production & supervision",
          body: "Production runs against the direction — photo, motion, design, copy. A senior director supervises every milestone so the work doesn't drift in the hands of vendors.",
        },
        {
          step: "04",
          title: "System extension",
          body: "The campaign becomes a system the in-house team can extend — templates, guidelines, approved variant logic. Brand consistency stops depending on one person.",
        },
      ],
    },
    deliverables: {
      intro:
        "What gets handed over inside a creative direction engagement.",
      items: [
        {
          title: "Creative direction document",
          body: "The campaign or brand direction made canonical — references, principles, do's and don'ts, type and color systems, motion direction.",
        },
        {
          title: "Campaign assets",
          body: "Hero stills, motion, ad creative, social cuts, OOH if relevant. Produced under direction, delivered with full master files.",
        },
        {
          title: "Brand system extension",
          body: "Templates and component guidelines for the in-house team — so the work compounds without our supervision on every piece.",
        },
        {
          title: "Production supervision",
          body: "On-set or in-post oversight by a senior director, so what was approved in the deck is what arrives on the timeline.",
        },
        {
          title: "Quarterly brand-bar audit",
          body: "A standing review of what's shipped against the direction. Drift gets caught and corrected before it becomes the new normal.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "Creative direction is judgment, not generation. AI shows up in the supporting work — never in the choices that matter.",
      pillars: [
        {
          title: "Reference exploration",
          body: "Image and video reference search accelerated by multimodal models — wider sourcing, faster moodboards, more rigor in the early-territory phase. The director chooses; the model widens the field.",
        },
        {
          title: "Variant exploration under direction",
          body: "Once a direction is locked, model-assisted variant exploration helps test crops, color treatments, and layout permutations at speed. The principle is set by a human; the iterations get faster.",
        },
        {
          title: "Asset triage",
          body: "On a 2,000-frame shoot, multimodal models help triage — surfacing the strongest takes for review. Final selection is always the director's. The model saves three days of editor time.",
        },
      ],
    },
    relatedCaseStudies: ["22nation"],
    faqs: [
      {
        question: "Do you produce, or just direct?",
        answer:
          "Both. We can lead direction over your in-house production team, or run end-to-end with our roster of photographers, motion editors, and designers. Most engagements blend the two.",
      },
      {
        question: "How is this different from hiring a freelance creative director?",
        answer:
          "A freelancer ships their work. We ship a system — direction, templates, supervision, a quarterly bar check — so the work compounds across campaigns and surfaces, not just the one we touched.",
      },
      {
        question: "Do you do logo design and identity work?",
        answer:
          "We extend and refine identity systems. We don't take on full ground-up identity rebuilds — those are best handled by branding studios. We work alongside them or pick up where they left off.",
      },
      {
        question: "Can creative direction live alongside performance work?",
        answer:
          "It has to. Direction without performance is decorative; performance without direction is forgettable. Our model puts both under one roof so the brand and the numbers move together.",
      },
      {
        question: "Who reviews the work?",
        answer:
          "A senior creative director — the same person from kickoff to delivery. No junior handoff. That's the leverage.",
      },
    ],
    related: ["content-production", "meta-ads", "ai-automation"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. LEAD GENERATION
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "lead-generation",
    title: "Lead Generation",
    short:
      "Lead generation systems that produce qualified, sales-ready inbound — paid acquisition, landing pages, scoring, and CRM handoff designed as one machine.",
    outcome:
      "A predictable pipeline of buyers your sales team can actually close — not a Zendesk full of tire-kickers.",
    details: [
      "Paid acquisition for lead-gen offers",
      "Landing page & form architecture",
      "Lead scoring & enrichment",
      "Sales handoff & nurture",
    ],
    seo: {
      metaTitle: "Lead Generation Agency, Miami — JDT Inc.",
      metaDescription:
        "Lead generation systems that produce qualified, sales-ready inbound — paid acquisition, landing pages, scoring, and CRM handoff designed as one machine.",
      primaryKeyword: "lead generation agency",
      secondaryKeywords: [
        "B2B lead generation agency",
        "lead generation miami",
        "qualified leads",
        "demand generation agency",
        "lead gen services",
        "sales lead generation",
      ],
    },
    hero: {
      eyebrow: "Service · Lead Generation",
      h1: "Lead generation, built as one system.",
      subheadline:
        "Most lead-gen programs leak between channels and the CRM. JDT Inc. designs the whole thing as one machine — paid acquisition, landing pages, qualifying logic, enrichment, and sales handoff — so leads arrive on the rep's desk pre-qualified and in context.",
    },
    outcomes: [
      { value: "−30–50%", label: "Target cost per qualified lead" },
      { value: "2–3×", label: "MQL-to-SQL conversion lift" },
      { value: "100%", label: "Leads enriched on arrival" },
      { value: "<5 min", label: "Lead-to-rep speed-to-lead" },
    ],
    whoFor: {
      intro:
        "Lead generation works hardest where there's a defined buyer, a real sales motion, and someone on the other end ready to close.",
      clients: [
        "Service businesses with sales reps and a defined ICP",
        "B2B SaaS companies past the founder-sales stage",
        "Local operators with quotable offers and territory ambition",
      ],
      industries: [
        "Professional services",
        "B2B SaaS",
        "Local & home services",
        "Financial services",
        "Healthcare & wellness",
      ],
      stages: [
        "Operators replacing referral-only pipelines with paid acquisition",
        "Sales teams hitting the ceiling of in-bound flow",
        "Companies preparing to scale headcount against a real number",
      ],
    },
    methodology: {
      intro:
        "Lead generation as a system, not a campaign. Our four-stage build:",
      steps: [
        {
          step: "01",
          title: "ICP & offer",
          body: "We map the ideal buyer using closed-won data, then design or sharpen the lead offer — the thing actually worth giving up an email for. The offer is half the work; the channels are the easy part.",
        },
        {
          step: "02",
          title: "Acquisition stack",
          body: "Paid channels — Meta, Google, LinkedIn where appropriate — paired with landing pages designed for the offer, not retrofitted from a homepage. Tracking is set up before a dollar of spend goes live.",
        },
        {
          step: "03",
          title: "Qualification & enrichment",
          body: "Every inbound lead is enriched on submission — firmographic, persona, intent. A scoring model trained on your closed-won history routes hot leads directly to reps and disqualifies the obvious noise.",
        },
        {
          step: "04",
          title: "Sales handoff",
          body: "Hot leads land in the CRM with full context — source, score, enrichment, prior interactions — and reps are notified within five minutes. Nurture sequences pick up everyone else without a human touch.",
        },
      ],
    },
    deliverables: {
      intro:
        "What gets built across a lead generation engagement.",
      items: [
        {
          title: "Offer & ICP document",
          body: "The codified buyer and the codified offer — what we're saying, to whom, in exchange for what.",
        },
        {
          title: "Acquisition campaigns",
          body: "Paid acquisition across Meta, Google, and LinkedIn where the math supports it. Senior operators run the campaigns; creative is produced in-house.",
        },
        {
          title: "Conversion landing pages",
          body: "Landing pages designed for the offer, instrumented for testing, written in the brand voice.",
        },
        {
          title: "Lead enrichment pipeline",
          body: "Real-time enrichment on every inbound — firmographic, persona, intent — feeding the scoring model.",
        },
        {
          title: "Scoring & routing",
          body: "Lead scoring trained on your closed-won data. Hot leads route to reps; warm leads enter nurture; cold leads are caught before they pollute the funnel.",
        },
        {
          title: "Nurture & re-engagement",
          body: "Email sequences that move warm leads toward a real conversation — and re-engage stale ones without spamming the list.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "AI shows up across the lead-gen system — quietly. Where it earns its keep:",
      pillars: [
        {
          title: "ICP scoring trained on your data",
          body: "We build a scoring model on your closed-won and closed-lost history — not a generic template. Each lead arrives with a score that means something specific about your funnel.",
        },
        {
          title: "Real-time enrichment & intent",
          body: "Inbound leads are enriched on submission with firmographic and intent signals — Clay, Apollo, ZoomInfo, custom feeds — so the rep gets context before the first call.",
        },
        {
          title: "AI-assisted reply drafts",
          body: "First-touch replies are drafted in your brand voice with full lead context — score, source, enrichment. The rep edits and sends. Speed-to-lead drops without quality dropping.",
        },
      ],
    },
    relatedCaseStudies: ["carpet-cleaning-xperts"],
    faqs: [
      {
        question: "What channels does this typically run on?",
        answer:
          "Meta and Google for most B2C and prosumer offers; LinkedIn added when the ICP is enterprise B2B; cold email and outbound integrated where appropriate. Channel mix is decided after the ICP and offer work, not before.",
      },
      {
        question: "How is a 'qualified lead' defined?",
        answer:
          "By your sales team's closed-won data, not a generic template. We codify what a real buyer looks like for your business — firmographic, persona, behavioral signals — and the scoring model holds the rest of the system to it.",
      },
      {
        question: "Do you integrate with our CRM?",
        answer:
          "Yes. HubSpot, Salesforce, Close, Pipedrive, and Attio are common. Custom CRMs are workable. Integration is part of the build, not a follow-on project.",
      },
      {
        question: "What's the first thing that typically improves?",
        answer:
          "Speed-to-lead and lead context. Reps stop wasting time chasing cold leads and start every call already informed. The lift in MQL-to-SQL conversion usually shows up inside the first 60 days.",
      },
      {
        question: "Can we keep our existing landing pages?",
        answer:
          "If they're converting, yes — we audit before rebuilding. Most engagements end up with a mix of existing pages we tune and new ones we build for new offers.",
      },
    ],
    related: ["meta-ads", "google-ads", "crm-systems"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 7. CRM SYSTEMS
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "crm-systems",
    title: "CRM Systems",
    short:
      "CRM systems engineered for lifecycle revenue — implementation, automation, segmentation, and email programs that turn pipeline into compounding LTV.",
    outcome:
      "A CRM that earns its keep — driving second purchases, retention, and expansion without manual intervention.",
    details: [
      "CRM implementation & migration",
      "Lifecycle automation & journeys",
      "Segmentation & list hygiene",
      "Email & SMS program design",
    ],
    seo: {
      metaTitle: "CRM Systems & Lifecycle Automation — JDT Inc.",
      metaDescription:
        "CRM systems engineered for lifecycle revenue — implementation, automation, segmentation, and email programs that turn pipeline into compounding LTV.",
      primaryKeyword: "crm implementation agency",
      secondaryKeywords: [
        "crm consulting agency",
        "hubspot agency",
        "salesforce consulting",
        "crm automation agency",
        "lifecycle marketing agency",
        "klaviyo agency",
      ],
    },
    hero: {
      eyebrow: "Service · CRM Systems",
      h1: "CRM, engineered for lifecycle revenue.",
      subheadline:
        "Most CRM implementations stall at 'we have a HubSpot account.' We design and operate CRM systems that drive lifecycle revenue — implementation, segmentation, automation, and email programs that compound long after the acquisition cost is paid.",
    },
    outcomes: [
      { value: "+15–35%", label: "Target lift in repeat revenue" },
      { value: "20–40%", label: "Email program contribution to revenue" },
      { value: "100%", label: "Customer base segmented" },
      { value: "Quarterly", label: "Lifecycle cohort review" },
    ],
    whoFor: {
      intro:
        "CRM pays back when there's a customer base worth segmenting and a repeat-purchase or expansion motion. The clients who benefit most:",
      clients: [
        "DTC brands with second-purchase potential and underused list",
        "B2B SaaS companies with expansion revenue and onboarding gaps",
        "Service businesses with referral flywheels and reactivation opportunity",
      ],
      industries: [
        "Apparel & accessories",
        "Beauty & personal care",
        "B2B SaaS",
        "Professional services",
        "Health & wellness",
      ],
      stages: [
        "Operators with 10K+ contacts and no segmentation discipline",
        "Brands maturing past Mailchimp into proper lifecycle work",
        "Sales-led companies stitching marketing and sales motions together",
      ],
    },
    methodology: {
      intro:
        "CRM as a revenue system, not a contact database. Four stages:",
      steps: [
        {
          step: "01",
          title: "Audit & architecture",
          body: "We audit the existing setup — properties, lists, automations, email program, integrations — and design the architecture for the next 12 months. What stays, what gets retired, what needs rebuilding.",
        },
        {
          step: "02",
          title: "Implementation & migration",
          body: "Migration to (or refactor inside) HubSpot, Salesforce, Klaviyo, Attio, Close — chosen by fit, not vendor preference. Data is cleaned, properties are codified, integrations are wired.",
        },
        {
          step: "03",
          title: "Lifecycle program design",
          body: "Welcome flows, post-purchase journeys, reactivation, win-back, expansion sequences. Each program is mapped to a moment in the customer lifecycle — not a marketing calendar holiday.",
        },
        {
          step: "04",
          title: "Operating cadence",
          body: "A weekly send calendar, a monthly cohort review, and a quarterly architecture audit. The system stays clean as it scales — most CRMs decay because nobody owns the maintenance.",
        },
      ],
    },
    deliverables: {
      intro:
        "What ships across a CRM systems engagement.",
      items: [
        {
          title: "CRM architecture document",
          body: "Property model, lifecycle stages, segmentation logic, integration map. The codified version of how the CRM is supposed to work.",
        },
        {
          title: "Implementation & migration",
          body: "Setup, refactor, or migration — across HubSpot, Salesforce, Klaviyo, Close, Attio, depending on fit.",
        },
        {
          title: "Lifecycle journeys",
          body: "Welcome, onboarding, post-purchase, reactivation, win-back, expansion — each as a documented program with metrics and ownership.",
        },
        {
          title: "Email & SMS calendar",
          body: "A standing send calendar with editorial direction, scheduled, written under brand voice — ongoing, not a one-time deliverable.",
        },
        {
          title: "Reporting dashboards",
          body: "CRM-side dashboards on lifecycle KPIs, list health, deliverability, and program contribution — visible to leadership without a manual export.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "CRM is where AI quietly creates the most leverage — when it's pointed at the right problems.",
      pillars: [
        {
          title: "Predictive segmentation",
          body: "Customer base segmentation trained on transactional and behavioral data — predicting churn risk, second-purchase likelihood, and expansion readiness. Each segment ties to a specific lifecycle program.",
        },
        {
          title: "Send-time and content optimization",
          body: "Cohort-level send-time learning, subject-line testing, and content variant generation under brand-voice constraints. Senior writers approve before send.",
        },
        {
          title: "Brand-voice email drafting",
          body: "First drafts of campaigns, journeys, and one-offs are generated in your documented voice — then edited by a human. The throughput is what makes a real lifecycle program possible.",
        },
      ],
    },
    relatedCaseStudies: ["22nation"],
    faqs: [
      {
        question: "Which CRMs do you work with?",
        answer:
          "HubSpot, Salesforce, Klaviyo, Close, Attio, and Pipedrive are the most common. We can work in others — but we recommend tools we've operated extensively, not whatever's trending this quarter.",
      },
      {
        question: "Is this implementation or ongoing operation?",
        answer:
          "Both, in sequence. The first 60–90 days are implementation and journey design. After that, the engagement shifts to ongoing operation — sends, optimization, quarterly architecture audits.",
      },
      {
        question: "How does this connect to our acquisition spend?",
        answer:
          "Acquisition gets cheaper when LTV expands. Our CRM work isn't a separate department from the Meta and Google programs — it's where the post-acquisition revenue happens. The two are budgeted together.",
      },
      {
        question: "What's the typical first improvement we'll see?",
        answer:
          "List health and segmentation — most lists are 30–50% larger than they should be once enriched and cleaned. Better targeting drops list fatigue and lifts revenue per send within the first quarter.",
      },
      {
        question: "Do you write the emails?",
        answer:
          "Yes — under your brand voice document. AI accelerates first drafts; senior writers approve every send. The output reads like the brand, not a template.",
      },
    ],
    related: ["lead-generation", "ai-automation", "funnel-optimization"],
  },

  // ─────────────────────────────────────────────────────────────────
  // 8. FUNNEL OPTIMIZATION
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "funnel-optimization",
    title: "Funnel Optimization",
    short:
      "Funnel optimization that turns traffic into pipeline — landing pages, conversion testing, and full-funnel instrumentation engineered for measurable lift.",
    outcome:
      "A funnel where every step is instrumented, every change is tested, and every quarter the conversion math improves.",
    details: [
      "Funnel audit & instrumentation",
      "Landing page system design",
      "Conversion rate testing",
      "Full-funnel measurement",
    ],
    seo: {
      metaTitle: "Funnel Optimization & CRO Agency — JDT Inc.",
      metaDescription:
        "Funnel optimization that turns traffic into pipeline — landing pages, conversion testing, and full-funnel instrumentation engineered for measurable lift.",
      primaryKeyword: "funnel optimization agency",
      secondaryKeywords: [
        "conversion rate optimization agency",
        "CRO agency",
        "landing page optimization",
        "funnel agency miami",
        "sales funnel agency",
        "funnel audit",
      ],
    },
    hero: {
      eyebrow: "Service · Funnel Optimization",
      h1: "Funnel optimization, end to end.",
      subheadline:
        "Acquisition is the loud half of growth. The funnel is the quiet half — and the one that compounds. JDT Inc. audits, instruments, and rebuilds funnels for measurable lift, from the first paid impression all the way to closed revenue.",
    },
    outcomes: [
      { value: "+20–60%", label: "Target lift on key conversion steps" },
      { value: "End-to-end", label: "Instrumentation depth" },
      { value: "Bi-weekly", label: "Test cadence" },
      { value: "Quarterly", label: "Funnel architecture audit" },
    ],
    whoFor: {
      intro:
        "Funnel optimization compounds where there's enough traffic to test against and a willingness to change what isn't working. The shape that fits:",
      clients: [
        "Brands with paid acquisition already running and unclear conversion math",
        "Operators sitting on traffic they can't fully convert",
        "Companies preparing for a major launch or category move",
      ],
      industries: [
        "Ecommerce & DTC",
        "Professional services",
        "B2B SaaS",
        "Local & home services",
        "Healthcare & wellness",
      ],
      stages: [
        "Brands with $5K+/mo paid acquisition and no CRO discipline",
        "Companies with strong traffic and weak conversion",
        "Operators preparing the funnel before scaling spend",
      ],
    },
    methodology: {
      intro:
        "Funnel work runs on instrumentation first, opinions second. The four-stage loop:",
      steps: [
        {
          step: "01",
          title: "Audit & instrumentation",
          body: "We map the full funnel — paid impression to closed revenue — and instrument every step. Most engagements start by exposing 30–60% of the data the existing setup was supposed to capture.",
        },
        {
          step: "02",
          title: "Hypothesis stack",
          body: "Findings become a prioritized stack of hypotheses — ranked by impact, evidence, and effort. We test the highest-leverage assumptions first; opinions about button color come last.",
        },
        {
          step: "03",
          title: "Build & test",
          body: "Variants are built quickly, tested under controlled conditions, and read against statistically meaningful sample sizes. Winners ship; losers retire; learnings feed the next round.",
        },
        {
          step: "04",
          title: "Compounding cadence",
          body: "Bi-weekly test cycles, monthly funnel reads, quarterly architecture audits. The point isn't to win one test — it's to make sure the funnel is improving every quarter without us in the room.",
        },
      ],
    },
    deliverables: {
      intro:
        "What ships during a funnel optimization engagement.",
      items: [
        {
          title: "Funnel audit document",
          body: "A documented map of the existing funnel, every leakage point, and the prioritized hypothesis stack.",
        },
        {
          title: "Instrumentation layer",
          body: "GA4, server-side tracking, conversion API, custom events — the measurement that should have existed already.",
        },
        {
          title: "Landing page system",
          body: "Templates, components, copy patterns, and instrumentation hooks designed for testing — not one-off pages.",
        },
        {
          title: "Test program",
          body: "Bi-weekly test cycles with documented hypotheses, outcomes, and learnings. The accumulated knowledge is the long-term asset.",
        },
        {
          title: "Funnel reporting",
          body: "Step-by-step conversion reads, drop-off analysis, and cohort behavior — visible without a manual export.",
        },
      ],
    },
    aiDifferentiation: {
      intro:
        "AI helps funnel work in three places — and stays out of the rest.",
      pillars: [
        {
          title: "Variant generation under brand voice",
          body: "Headline and body-copy variants generated in the documented brand voice — widening the testing pool without lowering the editorial bar. Every variant is human-edited before it ships.",
        },
        {
          title: "Behavioral session analysis",
          body: "Session recordings and heatmaps processed by multimodal models to surface patterns — rage clicks, navigation loops, abandonment shapes — at a speed a human analyst can't match.",
        },
        {
          title: "Anomaly detection in the funnel",
          body: "Step-by-step funnel performance is monitored continuously. Sudden drops in conversion, tracking gaps, or unusual cohort behavior get flagged before the weekly meeting.",
        },
      ],
    },
    relatedCaseStudies: ["22nation", "carpet-cleaning-xperts"],
    faqs: [
      {
        question: "Is this CRO or full-funnel work?",
        answer:
          "Both. We start at the funnel level — instrumentation, audit, leakage — and the test program runs continuously underneath. CRO without funnel context is whack-a-mole.",
      },
      {
        question: "How much traffic do we need for testing to work?",
        answer:
          "There's no clean number — it depends on conversion rate and the scale of the test. As a rough floor, 20K monthly visitors and 200+ conversions starts to support meaningful tests on key steps. Below that, we'd focus on funnel structure first, statistical testing later.",
      },
      {
        question: "Do you build the landing pages?",
        answer:
          "Yes — most engagements include a landing page system, built in the brand language with instrumentation baked in. We can also work inside Webflow, Framer, or your existing CMS if you have one.",
      },
      {
        question: "What's typically broken when you arrive?",
        answer:
          "Tracking, almost always. Then attribution, copy-message match, and form friction. The first 30 days usually expose more revenue from fixing instrumentation than from any creative test.",
      },
      {
        question: "How does funnel work coordinate with the ad accounts?",
        answer:
          "Tightly. Ad creative, landing copy, and funnel structure are designed as one piece — not three. That's the whole point of the system.",
      },
    ],
    related: ["meta-ads", "google-ads", "lead-generation"],
  },
];

/**
 * Helper used by /services/[slug] to look up a service by slug,
 * and by other surfaces (homepage, related-links blocks).
 */
export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/**
 * Resolves the `related` slugs on a service into full Service objects.
 * Filters out anything that no longer exists so a typo doesn't 500 the
 * page — it just renders fewer related links.
 */
export function getRelatedServices(slug: string) {
  const svc = getService(slug);
  if (!svc) return [];
  return svc.related
    .map((s) => getService(s))
    .filter((s): s is Service => Boolean(s));
}
