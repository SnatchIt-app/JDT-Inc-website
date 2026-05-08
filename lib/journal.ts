/**
 * JDT Inc. — Journal data layer.
 *
 * The Journal is JDT's content authority engine. Articles are stored as
 * structured objects with a typed body — paragraphs, headings, lists,
 * pullquotes, callouts — rather than free-form MDX. This forces editorial
 * discipline and guarantees every article renders inside the brand's
 * editorial type system, no matter who writes it.
 *
 * STRUCTURE:
 *   - 10 topic clusters (see `topics`) each with a pillar slug
 *   - Articles belong to exactly one topic via `topic` slug
 *   - Pillars are flagged with `isPillar: true`
 *
 * URLs:
 *   /journal                        — index (recent + by topic)
 *   /journal/topics/[topic]         — topic cluster hub
 *   /journal/[slug]                 — flat article URLs (NYT/Stripe Press style)
 *
 * EDITORIAL STANDARDS:
 *   - Pillar articles: 1500–2500 words, comprehensive, citation-worthy
 *   - Supporting articles: 800–1500 words, focused on a single intent
 *   - Voice: confident, specific, premium. Not listicle. Not buzzword salad.
 *   - Each article has its own SEO metadata + a contextual CTA.
 */

// ─── Topic clusters ─────────────────────────────────────────────────

export type TopicSlug =
  | "ai-marketing"
  | "performance-marketing"
  | "meta-ads"
  | "google-ads"
  | "ai-automation"
  | "funnel-optimization"
  | "creative-strategy"
  | "luxury-brand-marketing"
  | "miami-marketing"
  | "aeo-geo";

export type Topic = {
  slug: TopicSlug;
  name: string;
  /** One-paragraph topic description for the topic page hero + index card. */
  description: string;
  /** Primary keyword the cluster competes for. */
  primaryKeyword: string;
  /** Slug of the pillar article that anchors the cluster. */
  pillarSlug: string;
  /** Per-topic SEO metadata for the topic page itself. */
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

export const topics: Topic[] = [
  {
    slug: "ai-marketing",
    name: "AI Marketing",
    description:
      "How AI changes — and doesn't change — how modern marketing operations actually run.",
    primaryKeyword: "ai marketing",
    pillarSlug: "ai-marketing-operation",
    seo: {
      metaTitle: "AI Marketing — Field Notes from JDT Inc.",
      metaDescription:
        "Field notes on AI marketing — what AI actually changes, what it doesn't, and how senior operators put it to work in production.",
    },
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    description:
      "Performance media as a system — measurement, creative, attribution, and the math that holds it together.",
    primaryKeyword: "performance marketing",
    pillarSlug: "performance-marketing-system",
    seo: {
      metaTitle: "Performance Marketing — JDT Inc. Journal",
      metaDescription:
        "Performance marketing as a system, not as a spend line. Attribution, cohorts, and the operating math that compounds.",
    },
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    description:
      "Field-tested writing on running Meta — Facebook and Instagram — programs that compound.",
    primaryKeyword: "meta ads",
    pillarSlug: "meta-ads-2026-guide",
    seo: {
      metaTitle: "Meta Ads — Strategy & Operating Notes — JDT Inc.",
      metaDescription:
        "Meta Ads strategy, attribution, creative testing, and Advantage+ — operating notes from JDT Inc.",
    },
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    description:
      "The architecture and discipline behind Google Ads programs that capture intent at scale.",
    primaryKeyword: "google ads",
    pillarSlug: "google-ads-playbook",
    seo: {
      metaTitle: "Google Ads — Operator's Notes — JDT Inc.",
      metaDescription:
        "Google Ads strategy, Performance Max, Smart Bidding, and Enhanced Conversions — operating notes from JDT Inc.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    description:
      "How marketing teams actually operationalize AI — workflows, tools, governance, and where humans still belong.",
    primaryKeyword: "ai automation",
    pillarSlug: "ai-automation-field-guide",
    seo: {
      metaTitle: "AI Automation — Field Guide — JDT Inc.",
      metaDescription:
        "A field guide to AI automation for marketing operations — workflows, tooling, governance, and the human-in-the-loop principle.",
    },
  },
  {
    slug: "funnel-optimization",
    name: "Funnel Optimization",
    description:
      "Conversion rate work that holds up to statistics — instrumentation first, opinions second.",
    primaryKeyword: "funnel optimization",
    pillarSlug: "funnel-optimization-end-to-end",
    seo: {
      metaTitle: "Funnel Optimization — JDT Inc. Journal",
      metaDescription:
        "Funnel optimization, end-to-end CRO, instrumentation, and statistical rigor — from JDT Inc.",
    },
  },
  {
    slug: "creative-strategy",
    name: "Creative Strategy",
    description:
      "Editorial standards, creative systems, and the discipline that lifts performance creative above the platform's average.",
    primaryKeyword: "creative strategy",
    pillarSlug: "creative-as-a-system",
    seo: {
      metaTitle: "Creative Strategy — JDT Inc. Journal",
      metaDescription:
        "Creative strategy, editorial direction, and the systems that lift performance creative above the platform's average.",
    },
  },
  {
    slug: "luxury-brand-marketing",
    name: "Luxury Brand Marketing",
    description:
      "How restraint compounds — performance marketing principles for brands where craft is the price of entry.",
    primaryKeyword: "luxury brand marketing",
    pillarSlug: "luxury-brand-marketing",
    seo: {
      metaTitle: "Luxury Brand Marketing — JDT Inc. Journal",
      metaDescription:
        "Luxury brand marketing — restraint, editorial standards, and the performance principles that work in premium categories.",
    },
  },
  {
    slug: "miami-marketing",
    name: "Miami Marketing",
    description:
      "Field reports from a Miami growth agency — bilingual audiences, hospitality, real estate, and the city's category brands.",
    primaryKeyword: "miami marketing",
    pillarSlug: "miami-growth-economy",
    seo: {
      metaTitle: "Miami Marketing — JDT Inc. Journal",
      metaDescription:
        "Field reports on Miami marketing — bilingual audiences, hospitality, real estate, and South Florida's category brands.",
    },
  },
  {
    slug: "aeo-geo",
    name: "AEO & GEO",
    description:
      "Optimization for the next era of search — ChatGPT, Perplexity, Claude, Google AI Overviews. Citation, structure, and entity work.",
    primaryKeyword: "AEO GEO",
    pillarSlug: "aeo-geo-rules",
    seo: {
      metaTitle: "AEO & GEO — AI Search Optimization — JDT Inc.",
      metaDescription:
        "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) — how to be cited by AI search engines.",
    },
  },
];

// ─── Article body block model ───────────────────────────────────────

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "pullquote"; text: string; attribution?: string }
  | { type: "callout"; title: string; body: string }
  | { type: "definition"; term: string; body: string }
  | { type: "divider" };

// ─── Article ─────────────────────────────────────────────────────────

/**
 * Article lifecycle status.
 *   - draft: not visible publicly. Editors are still working on it.
 *   - scheduled: ready to ship; will become public when publishAt
 *     <= the current time (or the daily cron flips it).
 *   - published: visible everywhere — index, topic, sitemap, RSS.
 *
 * The page templates filter via `isLive(article)` so drafts and
 * future-dated scheduled posts never leak to production.
 */
export type ArticleStatus = "draft" | "scheduled" | "published";

export type Article = {
  slug: string;
  title: string;
  /** The lede / sub-headline that appears under the H1. */
  dek: string;
  topic: TopicSlug;
  isPillar?: boolean;
  /** Lifecycle gate. Defaults to "published" when omitted. */
  status?: ArticleStatus;
  /** ISO date string. For scheduled posts, this is the target publish time. */
  publishedAt: string;
  /** Optional explicit publish time for scheduling logic. */
  publishAt?: string;
  updatedAt?: string;
  readingMinutes: number;
  tags: string[];
  excerpt: string;

  seo: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };

  body: Block[];

  /** Contextual links surfaced in a side-rail or after-article module. */
  internalLinks?: { href: string; label: string }[];

  /** Article-specific closing CTA. Falls back to defaults if omitted. */
  cta?: {
    eyebrow: string;
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

// ─── Articles ───────────────────────────────────────────────────────
// Sample pillar published below. The remaining 49 planned articles ship
// on the cadence laid out in the 90-day roadmap (see CONTENT_STRATEGY.md
// or the sprint notes). Each new article slots into this array without
// any changes to the page templates, sitemap, or schema helpers.

export const articles: Article[] = [
  {
    slug: "ai-marketing-operation",
    title:
      "What AI actually changes about running a marketing operation",
    dek: "An honest field report on what AI does, what it doesn't, and where senior operators still have to do the work.",
    topic: "ai-marketing",
    isPillar: true,
    publishedAt: "2026-05-07",
    readingMinutes: 9,
    tags: ["AI marketing", "Operations", "Field notes"],
    excerpt:
      "AI compresses the slow parts of marketing — research, variant generation, reporting — and leaves the judgment work intact. Here's what that actually looks like in production.",
    seo: {
      metaTitle:
        "What AI Actually Changes About Marketing — JDT Inc.",
      metaDescription:
        "AI compresses the slow parts of marketing — audience research, variant generation, reporting — and leaves the judgment work to senior operators. Field notes from JDT Inc.",
      primaryKeyword: "AI marketing",
      secondaryKeywords: [
        "AI-powered marketing",
        "AI marketing agency",
        "ai for marketing",
        "marketing operations AI",
        "AI in marketing",
      ],
    },
    body: [
      {
        type: "p",
        text: "Most of what's been written about AI in marketing in the last two years is wrong in the same direction — it overstates what's automated and understates what still requires judgment. The result is a market full of agencies promising AI-powered everything and clients quietly wondering why the work doesn't look meaningfully different from what they were getting in 2022.",
      },
      {
        type: "p",
        text: "It is meaningfully different — but the differences aren't where the pitch decks pointed. AI hasn't replaced the senior operator. It has compressed the slow parts of the operation and left the judgment work intact. Knowing which is which is most of the job.",
      },
      {
        type: "p",
        text: "This is a field report from inside an AI-powered marketing agency. We'll walk through the three layers where AI actually shows up, the failure modes we've seen most often, and the test we use to decide whether to apply it at all.",
      },
      { type: "h2", text: "The three layers where AI earns its keep", id: "three-layers" },
      {
        type: "p",
        text: "If you map a marketing operation as a stack — research at the bottom, production in the middle, measurement at the top — AI shows up most usefully at the bottom and the top, and least usefully in the middle. That ordering matters because it's the opposite of what most agencies pitch.",
      },
      { type: "h3", text: "1. Research compression" },
      {
        type: "p",
        text: "Audience research is the part of marketing where AI is most underrated. Customer support transcripts, sales call recordings, review datasets, and survey responses are all unstructured text — exactly the medium language models were built to read. We routinely take a year of customer-call transcripts, run them through a structured clustering pipeline, and surface audience territories that a manual analyst team would have taken weeks to extract by hand.",
      },
      {
        type: "p",
        text: "The output isn't a report; it's a working document the creative team uses to brief variants. The compression is real — what used to be a six-week research engagement now ships in five days. The quality is not just preserved, it's better, because the model reads everything instead of sampling.",
      },
      { type: "h3", text: "2. Variant generation" },
      {
        type: "p",
        text: "Variant generation is the middle layer, and where the most agencies overpromise. Generating fifty headlines is trivially easy and not the work. The work is having taste — knowing which three of the fifty are worth testing, which forty-seven are forgettable, and which one is brilliant in a way the model couldn't have planned.",
      },
      {
        type: "p",
        text: "Used well, AI here is a pool-widener. We write a brand-voice constraint document, generate 10× the testing pool, and then a senior writer culls. The writer's job changes — less typing, more judgment — but it doesn't disappear. The agencies that ship raw AI output to clients are the ones whose work has noticeably degraded over the last 18 months.",
      },
      { type: "h3", text: "3. Measurement and anomaly detection" },
      {
        type: "p",
        text: "The top of the stack — reporting, anomaly detection, attribution stitching — is where AI does the dullest, most useful work. Weekly performance reads can be compiled automatically from Meta, Google, GA4, and the CRM, written in the team's voice, and delivered before the Monday meeting. Anomaly detection on spend, attribution gaps, and audience fatigue runs continuously and catches issues that a human dashboard-watcher would notice three days later.",
      },
      {
        type: "p",
        text: "This layer is unglamorous. It's also where AI's compounding return on time investment is highest, because the work happens whether the team is awake or not.",
      },
      { type: "divider" },
      { type: "h2", text: "Where AI quietly fails", id: "failure-modes" },
      {
        type: "p",
        text: "Three failure modes show up over and over. Recognizing them early is what separates an AI-native operation from a team that's been told to use AI more.",
      },
      {
        type: "callout",
        title: "Failure mode 1 — Generation without governance",
        body: "Teams stand up generation pipelines without an editorial gate. The output ships. Quality drops. Brand voice drifts. The fix is not less AI; it is non-negotiable human review at the production gate. Every system we build has a documented owner who approves before publish.",
      },
      {
        type: "callout",
        title: "Failure mode 2 — Tool sprawl",
        body: "Five AI tools doing 60% of three jobs each, with overlapping costs and no integration. The fix is workload-driven tool selection. We pick tools by job — Clay for enrichment, n8n or Zapier for orchestration, the OpenAI and Anthropic APIs for generation — and the stack stays small.",
      },
      {
        type: "callout",
        title: "Failure mode 3 — Replacing senior people",
        body: "The most expensive mistake. Senior operators are not the bottleneck AI can replace; they are the judgment AI relies on. A team that uses AI to fire its strategists ends up with a louder, faster version of the wrong work.",
      },
      { type: "h2", text: "The two-question test", id: "test" },
      {
        type: "p",
        text: "Before we add AI to any workflow, we ask two questions. They sound simple. They are not.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Is the work repeatable, or is it judgment? Repeatable work compounds with automation. Judgment doesn't.",
          "Is the data clean enough that a model can trust it? Garbage in still produces garbage out — faster.",
        ],
      },
      {
        type: "p",
        text: "If both answers are yes, AI is leverage. If either is no, automation is liability. Most failed AI marketing implementations we audit have skipped these two questions and gone straight to picking tools.",
      },
      {
        type: "pullquote",
        text: "AI hasn't replaced the senior operator. It has compressed the slow parts of the operation and left the judgment work intact. Knowing which is which is most of the job.",
      },
      { type: "h2", text: "What this looks like in production" },
      {
        type: "p",
        text: "A real AI-native marketing engagement looks deeply unglamorous. There are dashboards a senior person reads on Monday. There are weekly performance digests written by an agent and edited by a human. There is a creative system where a writer reviews 30 variants instead of producing them from scratch. There is a lead enrichment pipeline that runs in the background and routes hot leads to reps inside five minutes. There is a brand-voice document that constrains every generation pipeline.",
      },
      {
        type: "p",
        text: "There is also no badge that says 'AI-powered' anywhere on the work, because the AI is upstream of the output, not in it. Clients see better creative, faster experiments, cleaner reporting, and a meaningfully smaller gap between what they decide on Monday and what's live by Friday. They don't see the model.",
      },
      { type: "h2", text: "How to evaluate an AI marketing agency" },
      {
        type: "p",
        text: "If you're hiring an AI marketing agency in 2026, the question is not whether they 'use AI.' Everyone says they do. Three sharper questions surface what's actually happening:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Show me one production workflow you've built. What does it own? Who reviews its output? What happens when it fails?",
          "Where in your client engagements have you decided not to use AI, and why?",
          "How does your team distinguish between AI-accelerated work and AI-replaced work?",
        ],
      },
      {
        type: "p",
        text: "An agency that can answer all three concretely — with named workflows, named reviewers, named failure modes — is operating an AI-native practice. An agency that answers in adjectives is selling the same retainer with new vocabulary.",
      },
      { type: "divider" },
      {
        type: "p",
        text: "AI in marketing isn't a feature. It's a way of operating that compresses some kinds of work and leaves others untouched. The agencies winning the next decade are the ones who know which is which — and aren't afraid to admit, in writing, where the model belongs and where it doesn't.",
      },
    ],
    internalLinks: [
      { href: "/services/ai-automation", label: "AI Automation services" },
      { href: "/services/meta-ads", label: "Meta Ads services" },
      { href: "/journal/topics/ai-marketing", label: "More on AI Marketing" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "Map an AI-native marketing operation.",
      body: "Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your stack, your team's leverage points, and where AI actually pays back inside your operation.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
];

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Whether an article should render to the public.
 *
 *   - status === "published" → always live
 *   - status === "scheduled" → live only if publishAt has passed
 *   - status === "draft" → never live
 *   - status undefined → treated as "published" (back-compat for existing data)
 *
 * Page templates and getters all funnel through this gate so a single
 * source of truth controls visibility everywhere.
 */
export function isLive(article: Article, now: Date = new Date()) {
  const status = article.status ?? "published";
  if (status === "published") return true;
  if (status === "draft") return false;
  if (status === "scheduled") {
    const target = article.publishAt ?? article.publishedAt;
    return new Date(target).getTime() <= now.getTime();
  }
  return false;
}

/** Public articles only (filtered by isLive). */
export function getPublicArticles() {
  return articles.filter((a) => isLive(a));
}

export function getArticle(slug: string) {
  // We don't filter by isLive here — the page template enforces it.
  // Tools (linters, generators, RSS) need access to drafts.
  return articles.find((a) => a.slug === slug);
}

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}

export function getArticlesByTopic(topicSlug: TopicSlug) {
  return getPublicArticles()
    .filter((a) => a.topic === topicSlug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getRecentArticles(limit = 6) {
  return [...getPublicArticles()]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
