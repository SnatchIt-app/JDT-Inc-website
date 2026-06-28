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
      "What AI changes, and doesn't change, about how marketing operations actually run.",
    primaryKeyword: "ai marketing",
    pillarSlug: "ai-marketing-operation",
    seo: {
      metaTitle: "AI Marketing — Field Notes from JDT Inc.",
      metaDescription:
        "Field notes on AI marketing: what AI actually changes, what it doesn't, and how working teams put it to use in production.",
    },
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    description:
      "Measurement, creative, attribution, and the math that holds paid media together.",
    primaryKeyword: "performance marketing",
    pillarSlug: "performance-marketing-system",
    seo: {
      metaTitle: "Performance Marketing — JDT Inc. Journal",
      metaDescription:
        "Performance marketing as a system, not a spend line. Attribution, cohorts, and the operating math behind it.",
    },
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    description:
      "Field-tested writing on running Facebook and Instagram programs that keep improving.",
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
      "How marketing teams actually put AI to work: workflows, tools, governance, and where humans still belong.",
    primaryKeyword: "ai automation",
    pillarSlug: "ai-automation-field-guide",
    seo: {
      metaTitle: "AI Automation — Field Guide — JDT Inc.",
      metaDescription:
        "A field guide to AI automation for marketing operations: workflows, tooling, governance, and the human-in-the-loop principle.",
    },
  },
  {
    slug: "funnel-optimization",
    name: "Funnel Optimization",
    description:
      "Conversion rate work that holds up to statistics. Instrumentation first, opinions second.",
    primaryKeyword: "funnel optimization",
    pillarSlug: "funnel-optimization-end-to-end",
    seo: {
      metaTitle: "Funnel Optimization — JDT Inc. Journal",
      metaDescription:
        "Funnel optimization, end-to-end CRO, instrumentation, and statistical rigor, from JDT Inc.",
    },
  },
  {
    slug: "creative-strategy",
    name: "Creative Strategy",
    description:
      "Editorial standards and the discipline that lifts performance creative above the platform's average.",
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
      "Why restraint wins: performance marketing principles for brands where craft is the baseline.",
    primaryKeyword: "luxury brand marketing",
    pillarSlug: "luxury-brand-marketing",
    seo: {
      metaTitle: "Luxury Brand Marketing — JDT Inc. Journal",
      metaDescription:
        "Luxury brand marketing: restraint, editorial standards, and the performance principles that work in premium categories.",
    },
  },
  {
    slug: "miami-marketing",
    name: "Miami Marketing",
    description:
      "Field reports from a Miami agency: bilingual audiences, hospitality, real estate, and the city's category brands.",
    primaryKeyword: "miami marketing",
    pillarSlug: "miami-growth-economy",
    seo: {
      metaTitle: "Miami Marketing — JDT Inc. Journal",
      metaDescription:
        "Field reports on Miami marketing: bilingual audiences, hospitality, real estate, and South Florida's category brands.",
    },
  },
  {
    slug: "aeo-geo",
    name: "AEO & GEO",
    description:
      "Optimization for the next era of search: ChatGPT, Perplexity, Claude, Google AI Overviews. Citation, structure, and entity work.",
    primaryKeyword: "AEO GEO",
    pillarSlug: "aeo-geo-rules",
    seo: {
      metaTitle: "AEO & GEO — AI Search Optimization — JDT Inc.",
      metaDescription:
        "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO): how to be cited by AI search engines.",
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
    dek: "An honest field report on what AI does, what it doesn't, and where people still have to do the work.",
    topic: "ai-marketing",
    isPillar: true,
    publishedAt: "2026-05-07",
    readingMinutes: 7,
    tags: ["AI marketing", "Operations", "Field notes"],
    excerpt:
      "AI compresses the slow parts of marketing (research, variant generation, reporting) and leaves the judgment work intact. Here's what that actually looks like in production.",
    seo: {
      metaTitle:
        "What AI Actually Changes About Marketing — JDT Inc.",
      metaDescription:
        "AI compresses the slow parts of marketing: research, variant generation, reporting. People still own the judgment. Field notes from JDT Inc.",
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
        text: "It is meaningfully different, but the differences aren't where the pitch decks pointed. AI hasn't replaced the experienced marketer. It has compressed the slow parts of the operation and left the judgment work intact. Knowing which is which is most of the job.",
      },
      {
        type: "p",
        text: "This is a field report from inside an agency that uses AI in nearly every workflow. We'll walk through the three layers where AI actually shows up, the failure modes we've seen most often, and the test we use to decide whether to apply it at all.",
      },
      { type: "h2", text: "The three layers where AI earns its keep", id: "three-layers" },
      {
        type: "p",
        text: "If you map a marketing operation as a stack (research at the bottom, production in the middle, measurement at the top), AI shows up most usefully at the bottom and the top, and least usefully in the middle. That ordering matters because it's the opposite of what most agencies pitch.",
      },
      { type: "h3", text: "1. Research compression" },
      {
        type: "p",
        text: "Audience research is the part of marketing where AI is most underrated. Customer support transcripts, sales call recordings, review datasets, and survey responses are all unstructured text, exactly the medium language models were built to read. We routinely take a year of customer-call transcripts, run them through a structured clustering pipeline, and surface audiences and angles that a manual analyst team would have taken weeks to extract by hand.",
      },
      {
        type: "p",
        text: "The output isn't a report; it's a working document the creative team uses to brief variants. The compression is real. What used to be a six-week research engagement now ships in five days. The quality is not just preserved, it's better, because the model reads everything instead of sampling.",
      },
      {
        type: "p",
        text: "What's harder to express is the second-order effect. When research stops being a six-week capital expense and becomes a Tuesday afternoon, the team stops rationing it. We re-cluster audiences every month. We rerun the call-transcript pipeline whenever a campaign underperforms. The cost of curiosity drops, and curiosity is what separates senior creative from competent creative.",
      },
      { type: "h3", text: "2. Variant generation" },
      {
        type: "p",
        text: "Variant generation is the middle layer, and where the most agencies overpromise. Generating fifty headlines is trivially easy and not the work. The work is having taste: knowing which three of the fifty are worth testing, which forty-seven are forgettable, and which one is brilliant in a way the model couldn't have planned.",
      },
      {
        type: "p",
        text: "Used well, AI here is a pool-widener. We write a brand-voice constraint document, generate 10× the testing pool, and then a senior writer culls. The writer's job changes (less typing, more judgment) but it doesn't disappear. The agencies that ship raw AI output to clients are the ones whose work has noticeably degraded over the last 18 months.",
      },
      {
        type: "p",
        text: "The taste filter is the entire game in this layer. A model can produce a hundred plausible headlines; only a writer who has shipped against this audience can spot the three that read like the brand and the ninety-seven that read like a competitor. Treating that filtering capacity as the bottleneck, and protecting it, is what keeps a creative system that uses AI editorial rather than industrial.",
      },
      { type: "h3", text: "3. Measurement and anomaly detection" },
      {
        type: "p",
        text: "The top of the stack (reporting, anomaly detection, attribution stitching) is where AI does the dullest, most useful work. Weekly performance reads can be compiled automatically from Meta, Google, GA4, and the CRM, written in the team's voice, and delivered before the Monday meeting. Anomaly detection on spend, attribution gaps, and audience fatigue runs continuously and catches issues that a human dashboard-watcher would notice three days later.",
      },
      {
        type: "p",
        text: "This layer is unglamorous. It's also where AI's return on time invested is highest, because the work happens whether the team is awake or not.",
      },
      {
        type: "p",
        text: "There is a quieter benefit too. Anomaly-detection systems force a discipline that most agencies skip: defining, in writing, what normal looks like for the account. CPMs in this band, conversion rates in that band, audience saturation curves shaped this way. Once normal is written down, deviation is detectable. Once deviation is detectable, the team stops arguing about whether something is broken and starts deciding what to do about it.",
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
        body: "Five AI tools doing 60% of three jobs each, with overlapping costs and no integration. The fix is picking tools by job: Clay for enrichment, n8n or Zapier for orchestration, the OpenAI and Anthropic APIs for generation. The stack stays small.",
      },
      {
        type: "callout",
        title: "Failure mode 3 — Replacing senior people",
        body: "The most expensive mistake. Your senior people are not the bottleneck AI can replace; they are the judgment AI relies on. A team that uses AI to fire its strategists ends up with a louder, faster version of the wrong work.",
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
          "Is the data clean enough that a model can trust it? Garbage in still produces garbage out, just faster.",
        ],
      },
      {
        type: "p",
        text: "If both answers are yes, AI is leverage. If either is no, automation is liability. Most failed AI marketing implementations we audit have skipped these two questions and gone straight to picking tools.",
      },
      {
        type: "pullquote",
        text: "AI hasn't replaced the experienced marketer. It has compressed the slow parts of the operation and left the judgment work intact. Knowing which is which is most of the job.",
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
      {
        type: "p",
        text: "The shift is cultural before it is technical. Teams that were used to month-long planning cycles start operating in weeks. Teams that were used to weekly reviews start running a daily loop. The pace is set by the slowest review, not the fastest model, and the slowest review is almost always still a person deciding what's worth doing. The model just makes more options available for that decision.",
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
        text: "An agency that can answer all three concretely, with named workflows, named reviewers, and named failure modes, is doing the real thing. An agency that answers in adjectives is selling the same retainer with new vocabulary.",
      },
      {
        type: "p",
        text: "It is worth saying plainly: the agencies that win the next decade will not be the ones with the loudest AI marketing. They will be the ones whose internal operations are quietly different. Most clients will never read the system prompt that drafts their performance digest, never see the audience-clustering pipeline that produced this quarter's creative brief, never know which of their inbound leads were scored by a model trained on their own closed-won data. They will only notice that the work is sharper, the cycles are tighter, and the senior people on the engagement seem to have more time for the questions that actually matter.",
      },
      { type: "divider" },
      {
        type: "p",
        text: "AI in marketing isn't a feature. It's a way of operating that compresses some kinds of work and leaves others untouched. The agencies winning the next decade are the ones who know which is which, and aren't afraid to admit, in writing, where the model belongs and where it doesn't.",
      },
    ],
    internalLinks: [
      { href: "/services/ai-automation", label: "AI Automation services" },
      { href: "/services/meta-ads", label: "Meta Ads services" },
      { href: "/journal/topics/ai-marketing", label: "More on AI Marketing" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "See where AI fits in your operation.",
      body: "Book a 30-minute call. We'll walk through your stack, where your team's time goes, and where AI actually pays back inside your operation.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
  {
    slug: "lead-follow-up-where-businesses-lose-money",
    title: "Most businesses don't have a lead problem. They have a follow-up problem.",
    dek: "Why the leads you already paid for go cold, and what an actual follow-up system looks like.",
    topic: "funnel-optimization",
    status: "published",
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingMinutes: 6,
    tags: ["Lead follow-up", "CRM", "Funnel optimization"],
    excerpt:
      "Most owners ask for more leads when the real leak is what happens after a lead comes in. Speed and persistence beat clever targeting. Here's what a working follow-up system looks like.",
    seo: {
      metaTitle: "Lead Follow-Up: Where Sales Actually Leak — JDT Inc.",
      metaDescription:
        "Most businesses don't need more leads. They need faster, more persistent lead follow-up. What a real follow-up system looks like, from JDT Inc.",
      primaryKeyword: "lead follow-up",
      secondaryKeywords: [
        "speed to lead",
        "lead response time",
        "follow up with leads",
        "lead follow-up system",
        "CRM follow-up automation",
      ],
    },
    body: [
      {
        type: "p",
        text: "Most business owners we talk to think they have a lead problem. They want more leads, more reach, a bigger ad budget. Then we look at what actually happens to the leads they already have, and the conversation changes. A form comes in at 9:14 on a Tuesday and nobody calls it back until Thursday afternoon. By Thursday the person has already booked with someone who picked up the same morning.",
      },
      {
        type: "p",
        text: "We see this in nearly every account we audit. The ads work. The phone is ringing and the forms are filling out. The money is leaking after the lead arrives, in the gap between someone raising their hand and someone actually getting back to them. That gap is the cheapest thing to fix and the most expensive thing to ignore.",
      },
      {
        type: "p",
        text: "This is a practical look at why lead follow-up breaks down, why speed matters more than almost anything else you can tune, and what we'd put in place first.",
      },
      { type: "h2", text: "Why does speed matter so much?", id: "why-speed" },
      {
        type: "p",
        text: "When someone fills out a form or calls a service business, they are rarely contacting only you. They found three or four options, and they reached out to more than one. Whoever responds first gets the conversation, sets the framing, and usually gets the booking. The second business to call back is often selling against a decision the person has already half made.",
      },
      {
        type: "p",
        text: "Intent also fades fast. The moment someone submits a form is the moment they care most. An hour later they are back at work. A day later they have moved on. You are not just racing competitors; you are racing the person's own attention.",
      },
      {
        type: "definition",
        term: "Speed to lead",
        body: "The time between a lead coming in and a real human responding. For most service businesses, getting this under five minutes is the single highest-return change available. Under an hour is acceptable. A day is a leak.",
      },
      { type: "h2", text: "What follow-up actually means", id: "what-it-means" },
      {
        type: "p",
        text: "When we say lead follow-up, owners often picture one phone call. That is the part that fails most. One attempt is not follow-up; it is a coin flip. People miss calls. They are in a meeting, driving, or screening an unknown number. A single missed call with no second touch is a lead you paid for and then threw away.",
      },
      {
        type: "p",
        text: "Real follow-up is a sequence, not an event. A fast first touch, then a few more attempts across more than one channel, spaced out over the next several days. Most booked appointments do not come from the first attempt. They come from the third, fourth, or fifth, which is exactly the point where most businesses have already given up.",
      },
      {
        type: "callout",
        title: "The pattern we see most",
        body: "A business makes one call attempt, sends no text, and marks the lead dead if nobody answers. Then the owner concludes the leads are 'bad' and asks for a bigger ad budget. The leads were fine. The follow-up quit after one try.",
      },
      { type: "h2", text: "Why follow-up breaks down", id: "why-it-breaks" },
      {
        type: "p",
        text: "Follow-up rarely fails because people are lazy. It fails because it depends on a human remembering to do a repetitive task at exactly the right moment, on top of running the actual business. That is a bad bet. Here is where it usually breaks:",
      },
      {
        type: "list",
        items: [
          "No owner. Leads land in an inbox, a form notification, and a voicemail box, and everyone assumes someone else is handling it.",
          "No speed. The lead is seen hours later because the person who checks it is also doing five other jobs.",
          "No persistence. One attempt, no second channel, no schedule for the next touch.",
          "No record. Nobody can say who was called, when, or what they said, so leads get contacted twice or not at all.",
        ],
      },
      {
        type: "p",
        text: "Notice that none of these are marketing problems. They are operations problems. That is why spending more on ads does not fix them. A bigger budget pours more water into a bucket with the same hole.",
      },
      { type: "h2", text: "What we'd fix first", id: "what-wed-fix" },
      {
        type: "p",
        text: "When we take this on, we do not start with the ads. We start with the minutes after a lead comes in. The goal is simple: every lead gets a fast response and a real sequence, and nothing depends on someone remembering.",
      },
      {
        type: "p",
        text: "The first move is an instant automated touch. The moment a form is submitted, the person gets a text and an email confirming a real human will reach out, ideally within minutes. That one message buys you time and keeps the lead warm while a person gets to the phone. An automated text back the instant a call is missed does the same job for inbound calls.",
      },
      {
        type: "p",
        text: "The second move is putting every lead into one place. A simple CRM, set up so the team works one list instead of three inboxes, is usually the difference between leads that get worked and leads that get lost. Every lead has a status, an owner, and a next action with a date. Nothing sits in a notification nobody opened.",
      },
      {
        type: "p",
        text: "The third move is a written follow-up sequence the team actually runs. Call fast, text if no answer, call again the next day, then a couple more touches across the week before the lead is marked cold. We automate the reminders so the schedule does not live in someone's head. The human still does the talking; the system makes sure the talking happens.",
      },
      {
        type: "pullquote",
        text: "A bigger ad budget pours more water into a bucket with the same hole. Fix the hole first.",
      },
      {
        type: "p",
        text: "None of this is complicated, and that is the point. It is closer to plumbing than strategy. But it is the plumbing that decides whether the money you spend on Meta Ads and Google Ads turns into booked work or just into traffic you admired and lost.",
      },
      { type: "h2", text: "How to know if this is your problem", id: "self-check" },
      {
        type: "p",
        text: "You do not need software to find out. For one week, write down every lead that comes in, when it arrived, and when someone responded. Then check two numbers: your average response time, and how many leads got more than one follow-up attempt. If your response time is measured in hours and most leads got a single try, the leak is not your ad spend. It is the follow-up.",
      },
      {
        type: "p",
        text: "Fix that first, and the same ad budget starts producing more booked work without a single change to the campaigns. That is usually the cheapest growth a service business has available, and it is sitting in the leads you already paid for.",
      },
      {
        type: "p",
        text: "More reach is the right move once the follow-up is tight. Until then, it just makes the leak bigger. Get the minutes after a lead under control, and everything upstream starts paying off.",
      },
    ],
    internalLinks: [
      { href: "/services/crm-systems", label: "CRM Systems" },
      { href: "/services/lead-generation", label: "Lead Generation" },
      { href: "/services/funnel-optimization", label: "Funnel Optimization" },
      { href: "/journal/topics/funnel-optimization", label: "More on Funnel Optimization" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "Find out where your leads are leaking.",
      body: "Book a 30-minute call. We'll look at what happens to a lead from the moment it comes in, and where the follow-up is costing you booked work.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
  {
    slug: "google-business-profile-local-seo",
    title: "Your Google listing is doing more selling than your website",
    dek: "The free listing that does most of your early selling is the one you never touch. What a local profile needs to rank, in plain terms.",
    topic: "miami-marketing",
    status: "published",
    publishedAt: "2026-06-25",
    updatedAt: "2026-06-25",
    readingMinutes: 6,
    tags: ["Local SEO", "Google Business Profile", "Miami marketing"],
    excerpt:
      "Most local businesses pour money into a website and ads while the free listing that does the early selling sits half filled out. What it takes to rank in the map, and the fields owners skip.",
    seo: {
      metaTitle: "Google Business Profile: Local SEO You Skip — JDT",
      metaDescription:
        "Your Google listing sells before your website loads. What makes a local profile rank in the map, and the fields most owners leave blank.",
      primaryKeyword: "google business profile",
      secondaryKeywords: [
        "local seo",
        "google business profile optimization",
        "local seo for service businesses",
        "rank in google maps",
        "miami local seo",
      ],
    },
    body: [
      {
        type: "p",
        text: "Ask a local business owner where their best customers come from, and most point to their website or their paid ads. Then we pull the actual call log, and a different story shows up. The customer found them on Google Maps, skimmed a few reviews, and dialed the number on the listing before the website ever finished loading. The website took credit for a decision the listing had already made.",
      },
      {
        type: "p",
        text: "This is the pattern for most service businesses, and it is sharper in a market like Miami, where someone searching 'AC repair near me' or 'med spa in Brickell' wants to call in the next ten minutes. The map results sit above the regular blue links and above most of the ads. For plenty of searches, the three businesses in that little map get the majority of the clicks. If you are not one of them, you are buying ads to win back attention that was sitting there for free.",
      },
      {
        type: "p",
        text: "The thing deciding who shows up in that map is your Google Business Profile, and it is the most undermanaged asset most local businesses own. People pour money into a website and ad campaigns while the free listing that does most of the early selling sits half filled out, with three reviews from 2021 and a category set to the wrong thing.",
      },
      { type: "h2", text: "Why does the map outrank your website?", id: "why-map" },
      {
        type: "p",
        text: "When someone searches with local intent, Google's job is to answer fast: who is near me, open now, and trusted by other people nearby. A website is a brochure the searcher has to read. The map answers all three of those questions before a single click. That is why it sits at the top of the page, and why for a 'near me' search your listing is quietly doing more selling than any page you paid to build.",
      },
      {
        type: "definition",
        term: "Local pack",
        body: "The block of three business listings with a map that Google shows above the regular results for local searches. Ranking in the local pack is usually worth more than ranking first in the blue links below it, because it answers the searcher's question without a click.",
      },
      { type: "h2", text: "What actually moves a local ranking?", id: "ranking" },
      {
        type: "p",
        text: "Google weighs three rough things for local results: relevance, meaning how well your profile matches what they searched; distance, meaning how close you are to the searcher; and prominence, meaning how established and trusted you look. You cannot move yourself physically closer to every searcher, but relevance and prominence are almost entirely in your hands, and most businesses ignore both.",
      },
      {
        type: "p",
        text: "Here is what we check first on a Google Business Profile that is underperforming. None of it is technical, and most of it can be fixed in an afternoon:",
      },
      {
        type: "list",
        items: [
          "Primary category. This is the single biggest relevance lever and the one most often wrong. 'Spa' and 'Medical spa' are different searches. Pick the most specific category that fits, then add secondary categories for the rest of what you do.",
          "Business name. Use your real name, not a keyword-stuffed version. Google penalizes fake names, and competitors are quick to report them.",
          "Service area and address. Match them to reality. A hidden, missing, or inconsistent address confuses both the ranking and the customer.",
          "Hours, including holiday hours. 'Open now' is a ranking and trust signal. Wrong hours quietly hand the call to whoever is listed as open.",
        ],
      },
      { type: "h2", text: "Reviews are the part most owners get wrong", id: "reviews" },
      {
        type: "p",
        text: "Reviews are the most visible form of prominence, and the way most businesses handle them is backwards. They wait for reviews to happen on their own, panic at the occasional one-star, and never reply to anything. Volume, recency, and how you respond all matter. A steady trickle of recent reviews beats a pile of old five-stars that stopped in 2022.",
      },
      {
        type: "p",
        text: "The fix is a routine, not a campaign. Ask every happy customer the same day the work is done, in person or by text, with a direct link to the review form so it takes them ten seconds. Then reply to every review, good or bad, in your own voice. A calm, specific reply to a hard review sells the next reader better than a wall of perfect scores, because it shows what you do when something goes wrong.",
      },
      {
        type: "callout",
        title: "The reply nobody thinks about is the one that converts",
        body: "Most owners reply only to angry reviews, and only to defend themselves. Flip it. Reply to the good ones with a specific thank-you, and reply to the bad ones calmly with what you actually fixed. Future customers read the replies more closely than they read the stars.",
      },
      { type: "h2", text: "The fields nobody fills out", id: "fields" },
      {
        type: "p",
        text: "A Google Business Profile has far more surface than the name and phone number, and the empty fields are quietly costing you calls. Filling them in is one afternoon of work that keeps paying off long after:",
      },
      {
        type: "list",
        items: [
          "Photos. Real pictures of your work, your team, and your space, not stock images. Listings with current photos get more calls than bare ones. Add a few every month so the listing looks tended.",
          "Services and descriptions. List what you actually offer in plain words. This feeds relevance for the exact searches you want to win.",
          "Questions and answers. You can post and answer your own common questions. Leave it blank and anyone, including a confused stranger, can answer for you.",
          "Posts. Short updates, offers, and announcements. They are a small signal that the business is active and someone is paying attention.",
        ],
      },
      { type: "h2", text: "How do you know if this is your problem?", id: "self-check" },
      {
        type: "p",
        text: "Open an incognito browser window and search the way a customer would: your service plus 'near me', or your service plus the neighborhood. See where you land in the map. Then look at your own profile the way a stranger would. Count your reviews, check the date of the newest one, and notice how many fields are blank. If you are not in the top three and your last review is months old, you have just found growth that does not require a bigger ad budget.",
      },
      {
        type: "p",
        text: "This is closer to housekeeping than marketing, and that is exactly why it gets skipped. It is nobody's specific job, so it sits. But for a local service business, a well-kept Google Business Profile is often the difference between an ad budget that turns into booked calls and one that just buys clicks on a page people never reach.",
      },
      {
        type: "pullquote",
        text: "For a 'near me' search, your free listing is doing more selling than any page you paid to build.",
      },
      {
        type: "p",
        text: "Get the listing right first. Fix the categories, fill every field, build a review routine, and keep the photos current. Then put money behind ads and a website, knowing the front door your customers actually walk through is already in good shape. The same spend goes further once the listing it points back to is one a stranger would trust.",
      },
    ],
    internalLinks: [
      { href: "/services/lead-generation", label: "Lead Generation" },
      { href: "/services/funnel-optimization", label: "Funnel Optimization" },
      { href: "/journal/lead-follow-up-where-businesses-lose-money", label: "The follow-up problem" },
      { href: "/journal/topics/miami-marketing", label: "More on Miami Marketing" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "See where your local listing is leaking calls.",
      body: "Book a 30-minute call. We'll look at how you show up on the map today, and the quickest fixes between your listing and a booked call.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
  {
    slug: "meta-ads-2026-guide",
    title: "Meta Ads in 2026: a working guide for small budgets",
    dek: "What we'd actually do with $100 a day on Facebook and Instagram: structure, creative, testing, and the mistakes that quietly drain accounts.",
    topic: "meta-ads",
    isPillar: true,
    status: "published",
    publishedAt: "2026-06-26",
    updatedAt: "2026-06-26",
    readingMinutes: 7,
    tags: ["Meta Ads", "Facebook Ads", "Small business marketing"],
    excerpt:
      "Most small accounts don't fail because the budget is too small. They fail on structure, creative, and patience. Here's how we'd run Facebook and Instagram ads on $100 a day.",
    seo: {
      metaTitle: "Meta Ads in 2026: A Working Guide — JDT Inc.",
      metaDescription:
        "How we run Meta Ads on a small budget: simple structure, creative as the real lever, honest tracking, and the mistakes that quietly drain spend.",
      primaryKeyword: "meta ads",
      secondaryKeywords: [
        "meta ads for small business",
        "facebook ads",
        "instagram ads",
        "advantage+ shopping",
        "meta ads budget",
        "how to run meta ads",
      ],
    },
    body: [
      {
        type: "p",
        text: "Most of the Meta Ads advice online is written for people spending fifty thousand dollars a month. If you are a local business or a small brand putting a hundred dollars a day into Facebook and Instagram, a lot of that advice quietly works against you. You do not have the budget to run twelve campaigns, test nine audiences, and wait for an algorithm to sort it out. You need a smaller, sharper version of the same machine.",
      },
      {
        type: "p",
        text: "We run paid social for service businesses and small brands every day, and the accounts that work share a boring pattern. Simple structure. A few strong pieces of creative. Enough patience to let the platform learn before anyone touches it. The accounts that struggle are almost always busy: too many campaigns, too many edits, too much money spread too thin to ever get out of the learning phase.",
      },
      {
        type: "p",
        text: "This is what we would do with a small budget in 2026, in the order we would do it. No tricks. Most of it is restraint.",
      },
      { type: "h2", text: "Why does a small budget need a simpler account?", id: "why-simple" },
      {
        type: "p",
        text: "Meta's delivery system learns one ad set at a time. It needs roughly fifty conversions a week to get out of what the platform calls the learning phase and start spending efficiently. If your cost per lead is twenty dollars, a single ad set needs about a thousand dollars a week to learn properly. On a hundred dollars a day you have seven hundred a week, which is barely enough for one ad set to find its feet.",
      },
      {
        type: "p",
        text: "So the math makes the decision for you. With a small budget you run one campaign and one, maybe two ad sets. Every extra ad set you add splits the learning data and slows everything down. The most common mistake we see in small accounts is too many ad sets, each starved of the data it needs to work.",
      },
      {
        type: "definition",
        term: "Learning phase",
        body: "The period after you launch or significantly edit an ad set while the system gathers data to predict who will convert. Delivery is unstable and costs swing. The ad set exits the phase after roughly 50 conversions in a week. Edit it and the clock resets, which is why constant tinkering keeps small accounts broke.",
      },
      { type: "h2", text: "Start with one campaign, broad targeting, and Advantage+", id: "structure" },
      {
        type: "p",
        text: "In 2026, detailed interest targeting matters far less than it used to. Broad targeting and Advantage+ now read your creative and your pixel data to find buyers better than most hand-built audiences. For a small account that is good news: you can stop guessing at interests and let the system do the part it is genuinely good at.",
      },
      {
        type: "p",
        text: "We usually start with one sales or leads campaign, a broad audience (your city or service area, a wide age range, almost no interest stacking), and Advantage+ placements so the budget flows wherever it performs. Then we put the real energy where it belongs: the creative.",
      },
      {
        type: "callout",
        title: "Broad beats clever on a small budget",
        body: "Owners love to narrow the audience because it feels like control. On a small budget it backfires. Tight audiences hit frequency caps fast, costs climb, and you run out of people before the system learns. Go broad, give it strong creative, and let delivery find the buyers.",
      },
      { type: "h2", text: "Creative is the real lever", id: "creative" },
      {
        type: "p",
        text: "Here is the part nobody wants to hear: on Facebook and Instagram in 2026, your creative is your targeting. The system decides who sees your ad based largely on who responds to it. A great video shown to a broad audience will find its own audience. A weak ad with perfect targeting will still lose. If you only fix one thing in your account, fix the creative.",
      },
      {
        type: "p",
        text: "You do not need a studio. You need volume and variety. We typically launch with four to six pieces: a couple of plain phone-shot videos of the work or the product, a customer talking, a simple before-and-after, and one or two clean images with a clear offer. The point is range, so the system has different angles to test against different people.",
      },
      {
        type: "p",
        text: "Write for the feed. The first three seconds carry the whole ad, so open with the problem, the offer, or a face talking straight to the camera. Keep captions on, because most of the feed is watched on mute. Make the ad look like something a person would stop to watch. The feed is unforgiving to anything that announces itself as an ad.",
      },
      { type: "h2", text: "What should a small Meta Ads budget actually be spent on?", id: "budget-split" },
      {
        type: "p",
        text: "Split the thinking into three buckets, even when the budget is small. Most of the money goes to people who do not know you yet. A smaller slice retargets people who engaged or visited but did not act. And a tiny slice chases anyone who started a form or a checkout and stopped.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Cold (about 70%): broad prospecting with your strongest creative. This is where growth comes from and where most of the budget belongs.",
          "Warm retargeting (about 20%): video viewers, page engagers, and site visitors from the last 14 to 30 days. Cheap, and they already know you.",
          "Hot retargeting (about 10%): people who started a lead form or a checkout and abandoned. The closest money on the table.",
        ],
      },
      {
        type: "p",
        text: "On a hundred dollars a day, that is roughly seventy on cold, twenty on warm, ten on hot. You do not need separate campaigns for each on day one. Start with the cold engine, get it working, then add retargeting once there is enough traffic to retarget.",
      },
      { type: "h2", text: "Give it two weeks before you judge anything", id: "patience" },
      {
        type: "p",
        text: "The fastest way to waste money here is to panic on day three. You launch, the first day looks rough, you switch off the ad, change the audience, and reset the learning phase. Now the system starts over and you have learned nothing except how to keep it permanently confused.",
      },
      {
        type: "p",
        text: "We hold changes for the first seven to fourteen days unless something is clearly broken, like a disapproved ad or a tracking error. We judge on cost per result over a week, not a day. Daily numbers on a small budget are noise; weekly numbers are signal. Once an ad set is stable and profitable, we scale it slowly, raising the budget about twenty percent every few days so we do not knock it back into learning.",
      },
      { type: "h2", text: "The mistakes that quietly drain small accounts", id: "mistakes" },
      {
        type: "p",
        text: "Most small accounts do not fail dramatically. They bleed. Here are the leaks we fix most often when we take over a Meta Ads account that is not working:",
      },
      {
        type: "list",
        items: [
          "Too many ad sets. The budget is sliced so thin nothing ever exits the learning phase. Consolidate down to one or two.",
          "Editing every day. Each edit resets learning. Set it up well, then leave it alone for a week.",
          "One ad, no variety. The system has nothing to optimize between. Give it a handful of different angles.",
          "No tracking. Without a working pixel and the conversions API, you are flying blind and so is the platform. Set this up before you spend a dollar.",
          "Sending clicks to a weak page. A great ad pointed at a slow, vague landing page wastes the whole budget. The page has to match the promise in the ad.",
        ],
      },
      {
        type: "p",
        text: "None of these are about finding a secret audience or a magic button. They are about discipline. A small budget punishes mistakes faster than a big one, which is exactly why a simple, patient account beats a busy, clever one almost every time.",
      },
      { type: "h2", text: "How do you know if it's working?", id: "measurement" },
      {
        type: "p",
        text: "Pick one number that matches your business and watch that, not the vanity metrics. For a lead business it is cost per qualified lead. For a shop it is cost per purchase and return on ad spend. Reach, clicks, and engagement are interesting but they do not pay anyone. If your cost per real result is at or below what a customer is worth to you, the account is working, even when the dashboard looks unglamorous.",
      },
      {
        type: "p",
        text: "Set up tracking so that number is trustworthy: a working pixel, the conversions API connected, and your key events firing. On a small budget, bad data is worse than no data, because it tells you to scale the wrong thing. We get tracking clean before we ever talk about spending more.",
      },
      { type: "h2", text: "What happens after the click", id: "after-click" },
      {
        type: "p",
        text: "The ad's only job is to get the right person to raise their hand. What happens next decides whether the money was worth spending. A lead that comes in and sits in an inbox for two days is a lead you paid for and threw away. Before you scale spend, make sure every lead gets a fast, real response with a follow-up sequence behind it. The campaign and the follow-up are one system, and the ad just opens the door.",
      },
      {
        type: "pullquote",
        text: "On a small budget, your creative is your targeting. A strong ad finds its own audience; a weak one loses with perfect settings.",
      },
      {
        type: "p",
        text: "None of this requires a big budget or a clever hack. It requires a simple account, real creative, honest tracking, and the patience to let the platform learn. Get those four right and a hundred dollars a day can carry a small business a long way. Get them wrong and no amount of budget will save the account. Start small, keep it boring, and let the results grow from there.",
      },
    ],
    internalLinks: [
      { href: "/services/meta-ads", label: "Meta Ads services" },
      { href: "/services/creative-direction", label: "Creative Direction" },
      { href: "/journal/lead-follow-up-where-businesses-lose-money", label: "The follow-up problem" },
      { href: "/journal/topics/meta-ads", label: "More on Meta Ads" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "See what your budget could actually do.",
      body: "Book a 30-minute call. We'll look at your account, your offer, and where a small budget is most likely to pay back.",
      primary: { label: "Book a strategy call", href: "/contact" },
      secondary: { label: "See the work", href: "/work" },
    },
  },
  {
    slug: "google-ads-playbook",
    title: "Google Ads in 2026: an operator's playbook for service businesses",
    dek: "Where search beats every other channel, where it quietly overcharges you, and how we'd structure an account to capture demand instead of renting clicks.",
    topic: "google-ads",
    isPillar: true,
    status: "published",
    publishedAt: "2026-06-27",
    updatedAt: "2026-06-27",
    readingMinutes: 8,
    tags: ["Google Ads", "Paid search", "Performance marketing"],
    excerpt:
      "Google Ads captures demand that already exists, which makes it the highest-intent channel most service businesses can buy and the easiest to overpay for. Here's how we structure an account that works.",
    seo: {
      metaTitle: "Google Ads in 2026: An Operator's Playbook — JDT",
      metaDescription:
        "How we run Google Ads to capture high-intent demand: account structure, match types, Performance Max, Smart Bidding, and where small budgets quietly leak.",
      primaryKeyword: "google ads",
      secondaryKeywords: [
        "google ads strategy",
        "google ads agency",
        "performance max",
        "smart bidding",
        "paid search",
        "google ads for small business",
      ],
    },
    body: [
      {
        type: "p",
        text: "Most of the money wasted in a paid search account isn't lost on bad keywords. It's lost on the quiet assumption that the platform's defaults are tuned for your results instead of Google's revenue. The two goals overlap often enough to keep advertisers comfortable, and diverge often enough to drain a budget over a quarter without anyone noticing.",
      },
      {
        type: "p",
        text: "Google Ads is the most misunderstood channel we run. Not because it's complicated, though it can be, but because it looks simple enough that an owner turns it on, watches clicks arrive, and assumes motion is progress. Clicks are not the product. Booked work is the product, and the distance between the two is where most accounts leak.",
      },
      {
        type: "p",
        text: "This is an operator's view of how the channel actually behaves in 2026: what it's genuinely good at, where it quietly overcharges you, and how we'd structure an account for a service business that wants calls and form fills rather than a dashboard full of impressions.",
      },
      { type: "h2", text: "What is Google Ads actually good at?", id: "what-good-at" },
      {
        type: "p",
        text: "Every paid channel does one of two jobs. It either creates demand or it captures demand that already exists. Meta, billboards, most of social: those create demand, interrupting someone who wasn't looking for you and convincing them to care. Search does the opposite. When a homeowner types 'emergency AC repair Coral Gables' at 9pm, the wanting is already there. You aren't persuading anyone to need you. You're trying to be the one they pick at the exact moment they've decided to buy.",
      },
      {
        type: "p",
        text: "That single difference explains most of what's true about the channel. Intent is the highest-value signal in marketing, and search is the only place you can buy it directly. It's why a well-run account for a plumber, a clinic, or a law firm can outperform every other line on the media plan. It's also why the channel is so unforgiving: when someone is ready to buy and your ad shows up slow, vague, or pointed at the wrong page, you've paid for the click and handed the customer to the competitor in the next slot.",
      },
      {
        type: "callout",
        title: "The one-line test",
        body: "Before you spend a dollar on search, ask whether people are already typing what you sell into the box. If they are, this is probably your best channel. If they aren't yet, you have a demand-generation problem, and search is the wrong tool to solve it.",
      },
      { type: "h2", text: "Structure beats settings", id: "structure" },
      {
        type: "p",
        text: "The instinct with a new account is to obsess over bids and budgets. The real gains are upstream of both, in how the account is organized. We build around how a customer actually thinks, not how the interface invites you to think.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Tight ad groups. A handful of closely related search terms per group, each with an ad written to echo the exact phrase someone searched. One ad group trying to cover 'AC repair,' 'AC installation,' and 'duct cleaning' will lose to three groups that each say one thing well.",
          "Match types you control. Broad match hands keyword selection to the algorithm. It has its place once you have conversion data and tight negatives, but starting there is how new accounts bleed. Begin with phrase and exact, read the search terms report weekly, and expand deliberately.",
          "A negative keyword list you actually maintain. The search terms report shows what people really typed to trigger your ad. 'Free,' 'jobs,' 'DIY,' 'salary,' a competitor's name you don't want: every irrelevant term you add as a negative is budget redirected to a buyer.",
        ],
      },
      {
        type: "p",
        text: "None of this is exotic. It's the unglamorous maintenance that separates an account that keeps improving from one that plateaus. We review search terms every week on active accounts, because the queries that trigger your ads drift, and the drift is always toward waste if no one is watching.",
      },
      {
        type: "p",
        text: "Tight structure also pays you back in a place owners rarely look: Quality Score. Google rates how relevant your keyword, ad, and landing page are to each other, and a higher score earns you a lower cost per click and better positions for the same bid. It isn't a vanity metric. It's a discount the platform hands to advertisers who keep the search, the ad, and the page saying the same thing. The plumber with three focused ad groups pointed at three matching pages will quietly pay less per click than the one running everything through a single catch-all ad and a homepage. Relevance is cheaper than money.",
      },
      { type: "h2", text: "Should you trust Performance Max?", id: "performance-max" },
      {
        type: "p",
        text: "Performance Max is Google's most aggressive push toward automation: one campaign type that spreads your budget across Search, Display, YouTube, Gmail, and Maps, with targeting and placement handled by the algorithm. It can work. It can also become a black box that spends smoothly while showing you almost nothing about where the money went.",
      },
      {
        type: "p",
        text: "Our position is practical. For a business with real conversion data and a clean feed, Performance Max can find buyers that manual campaigns miss. For a small service business just starting out, it's usually the wrong first move, because it learns from your conversions, and if your tracking is thin it optimizes toward noise. We tend to earn the right to run it: establish exact and phrase search campaigns first, get the measurement honest, then test Performance Max against that baseline with proper account-level negatives and disciplined asset groups.",
      },
      {
        type: "callout",
        title: "Guard the brand",
        body: "Left unchecked, Performance Max and broad match will both spend heavily on people already heading to you and report those cheap conversions as wins. Add your brand terms as a negative where they belong, so you can see what the account is really doing to find new demand.",
      },
      { type: "h2", text: "Smart Bidding is only as smart as your conversions", id: "smart-bidding" },
      {
        type: "p",
        text: "Smart Bidding (Target CPA, Target ROAS, Maximize Conversions) lets Google set bids in real time using signals no human could process at auction speed. The catch is in what it optimizes toward: conversions. If your conversion is a button click that doesn't correlate with revenue, the algorithm will get very good at buying button clicks.",
      },
      {
        type: "p",
        text: "This is the failure mode we see most often. An account hands bidding to the machine while feeding it a weak definition of success, then wonders why the cost-per-lead looks fine and the phone isn't ringing with the right calls. The fix isn't a different bid strategy. It's better conversion data: track calls over 60 seconds, mark which form fills became booked jobs, and feed offline conversions back from the CRM so the system learns what a good customer looks like and bids toward more of them.",
      },
      {
        type: "definition",
        term: "Enhanced Conversions",
        body: "A Google feature that sends hashed first-party data, like email and phone, back to match conversions more accurately as third-party cookies fade. For service businesses it's one of the highest-return setup steps available, and one of the most commonly skipped.",
      },
      { type: "h2", text: "How much should a small business spend?", id: "budget" },
      {
        type: "p",
        text: "There's no universal number, but there is a floor. Search bids are an auction, and in competitive local categories a single click can run from a few dollars to well over fifty. If your market's clicks cost $20 and it takes ten to book a job, a $300 monthly budget buys you fifteen clicks and a misleading conclusion that the channel doesn't work. It can't work at that volume, because you never gave the math a chance to play out.",
      },
      {
        type: "p",
        text: "We'd rather a client run one tightly built campaign, in one service, in one geography, with enough budget to gather real signal, than spread the same money across five half-funded campaigns that each starve. Concentration is how small budgets buy learning. Once a single campaign is profitable and the measurement is trustworthy, expanding is arithmetic.",
      },
      { type: "h2", text: "Where Google Ads fits with everything else", id: "the-stack" },
      {
        type: "p",
        text: "The channel is strongest when it isn't asked to work alone. Search captures the buyer at the bottom of the funnel; it doesn't fill the funnel. Pair it with Meta to build the awareness that puts you in the consideration set before anyone searches, and the same query starts converting better because they've seen you. The click is cheaper to win when the name is already familiar.",
      },
      {
        type: "p",
        text: "Just as important is what happens after the click. The fastest way to ruin a good account is to send hard-won, high-intent traffic to a slow homepage that makes a ready buyer hunt for the phone number. A focused landing page that matches the search, loads fast, and makes the next step obvious will often beat a bid increase. And a lead is only worth what your follow-up makes of it, which is the part most businesses quietly lose.",
      },
      {
        type: "pullquote",
        text: "Capture the demand that exists with search, create the demand that doesn't with social, and point both at pages built to convert.",
      },
      {
        type: "p",
        text: "Run together, the picture is simple: capture existing demand with search, create new demand with social, point both at pages built to convert, and answer the leads fast. Google Ads is the sharpest instrument on that bench. It just rewards the businesses that treat it as one instrument in a set.",
      },
      { type: "divider" },
      {
        type: "p",
        text: "If you take one thing from this: clicks are inventory, and inventory only matters if everything downstream turns it into booked work. A paid search account earns its budget when the page, the offer, and the follow-up are all built to convert intent. Get that right and search becomes the most reliable line on the plan. Skip it and you're just renting traffic.",
      },
    ],
    internalLinks: [
      { href: "/services/google-ads", label: "Google Ads services" },
      { href: "/services/funnel-optimization", label: "Funnel Optimization" },
      { href: "/journal/meta-ads-2026-guide", label: "Meta Ads in 2026" },
      { href: "/journal/lead-follow-up-where-businesses-lose-money", label: "The follow-up problem" },
      { href: "/journal/topics/google-ads", label: "More on Google Ads" },
    ],
    cta: {
      eyebrow: "Engage",
      title: "See what your search budget is really buying.",
      body: "Book a 30-minute call. We'll look at your account, your search terms, and where the spend turns into booked work instead of clicks.",
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
