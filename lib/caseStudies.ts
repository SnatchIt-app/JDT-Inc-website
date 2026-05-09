export type Metric = {
  value: string;
  label: string;
};

export type Testimonial = {
  /** The quote itself, no surrounding quotation marks. */
  quote: string;
  /** Person's name. Use "[Name withheld]" if private. */
  attribution: string;
  /** Title + company line. */
  role: string;
  /**
   * Whether this is a real, authorized client quote. Defaults to false.
   * When false, the page renders the section but the schema layer omits
   * Review JSON-LD (we don't claim aggregate ratings on placeholder
   * content).
   */
  isReal?: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  title: string;
  summary: string;
  cover: string; // background treatment id for styling
  /**
   * Per-case-study accent class fragments. Keep them as full Tailwind
   * class strings so they're literal in the source — the JIT compiler
   * needs to see the full class name to include it in the build.
   * Example: { rule: "border-snatch", text: "text-snatch", bg: "bg-snatch" }
   * When omitted, defaults to ink/black.
   */
  accent?: { rule: string; text: string; bg: string };
  /**
   * Image paths under /public. Drop the file at the matching path in
   * /public and it appears automatically. When the path is absent, the
   * image slot is gracefully omitted — no broken-image icon.
   */
  heroImage?: string;
  gallery?: string[];
  /**
   * How gallery images render inside their frames. Use "contain" when
   * the gallery contains posters, brand marks, or any visual where
   * cropping would destroy the composition. Defaults to "cover".
   */
  galleryFit?: "cover" | "contain";
  /**
   * Letterbox background under fit="contain". Defaults to paper-muted
   * (warm cream). Set to "ink" for dark-poster galleries (Snatch It)
   * so the letterbox reads as gallery framing, not as a missing crop.
   */
  galleryBg?: "paper-muted" | "paper" | "ink" | "gray-50" | "transparent";
  metrics: Metric[];
  /** Display names for the services rendered in the sidebar. */
  services: string[];
  /**
   * Optional service-page slugs aligned to `services` (same length).
   * When present, each service in the sidebar deep-links to
   * /services/[slug]. When absent, the sidebar renders plain text.
   */
  serviceSlugs?: string[];
  sections: {
    heading: string;
    body: string;
  }[];
  /** Tools / platforms used during the engagement. Renders as a
   *  hairline strip on the case study page. Adds tech-stack entity
   *  density that AI engines weight when answering "what tools
   *  does JDT use." */
  stack?: string[];
  /** Engagement length headline (e.g. "90 days", "6 months"). */
  timeline?: string;
  /** Optional narrative breakdown of outcomes — used after the
   *  metrics band when richer storytelling is needed. */
  outcomes?: { value: string; body: string }[];
  /** Single testimonial pull-quote. Set isReal: true only after
   *  receiving written permission from the client. */
  testimonial?: Testimonial;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "22nation",
    client: "22NatiON",
    industry: "Apparel · DTC",
    year: "2024",
    title:
      "A precision launch that turned a new collection into a sell-out moment.",
    summary:
      "We paired JDT Inc.'s AI-driven audience modeling with a full inbound funnel to launch 22NatiON's new collection across channels — targeting a fitness-focused female buyer with a narrative built to convert.",
    cover: "ink",
    // 22nation stays in the editorial ink/cream palette — no accent.
    heroImage: "/work/22nation/cover.png",
    gallery: [
      "/work/22nation/visual-01.png",
      "/work/22nation/visual-02.png",
      "/work/22nation/visual-03.png",
    ],
    metrics: [
      { value: "+26%", label: "Conversion rate" },
      { value: "Ongoing", label: "Engagement" },
      { value: "Steady", label: "Audience growth" },
    ],
    services: [
      "Creative Direction",
      "Meta Ads",
      "Content Production",
      "Funnel Optimization",
    ],
    serviceSlugs: [
      "creative-direction",
      "meta-ads",
      "content-production",
      "funnel-optimization",
    ],
    timeline: "Ongoing engagement",
    stack: ["Meta Ads Manager", "Shopify", "Klaviyo", "GA4"],
    outcomes: [
      {
        value: "Conversion rate up 26%",
        body: "Storefront conversion lifted as creative cohorts moved from broad-reach experiments into the audience territories the data actually rewarded. The lift held cohort over cohort.",
      },
      {
        value: "Audience that compounds",
        body: "Steady audience growth across paid and organic, driven by editorial-grade drops that hold the brand bar — the kind of compounding that paid acquisition alone can't produce.",
      },
      {
        value: "Revenue contribution",
        body: "Performance media now contributes meaningfully to monthly revenue, with creative production batched for repurposing across owned, paid, and organic surfaces.",
      },
    ],
    testimonial: {
      quote:
        "JDT didn't run a campaign — they built the system the brand runs on. The work compounds month over month, and the creative bar keeps rising.",
      attribution: "Founder",
      role: "22NatiON",
      isReal: false,
    },
    sections: [
      {
        heading: "The brief",
        body: "22NatiON wanted to grow a women's activewear brand without flattening it — paid acquisition that could scale revenue while protecting the editorial bar that defines the line.",
      },
      {
        heading: "How we run it",
        body: "Senior creative direction sets the editorial standard each drop has to clear. Meta Ads operate in cohorts — audience territories tested against the brand's own first-party data, not platform defaults — with creative variants produced in-house and refreshed on a steady cadence. The funnel is instrumented end to end, so each drop reads cleanly against revenue and audience signal alike.",
      },
      {
        heading: "What's working",
        body: "Conversion rate has lifted 26% as the system has compounded — creative gets sharper each cohort, audience models improve as data accrues, and the brand-bar holds while paid scales. The engagement is ongoing because the next 90 days always look like a more refined version of the last.",
      },
    ],
  },
  {
    slug: "carpet-cleaning-xperts",
    client: "Carpet Cleaning Xperts",
    industry: "Local Services",
    year: "2024",
    title:
      "Cutting cost per lead by a third while growing revenue across new territories.",
    summary:
      "For Carpet Cleaning Xperts, we ran a precision acquisition campaign built around new homeowners and local commercial offices — with AI-driven targeting handling the heavy lifting.",
    cover: "light",
    accent: { rule: "border-xperts", text: "text-xperts", bg: "bg-xperts" },
    heroImage: "/work/carpet-cleaning-xperts/cover.png",
    // Curated four-card narrative: cover (proof in action) → offer
    // (Agenda Hoy) → problem-state (Eso no se va solo) → result-state
    // (Eso salió de tu alfombra). Together: the bilingual Meta program
    // condensed into a single editorial grid.
    gallery: [
      "/work/carpet-cleaning-xperts/visual-01.png",
      "/work/carpet-cleaning-xperts/visual-02.png",
      "/work/carpet-cleaning-xperts/visual-03.png",
    ],
    metrics: [
      { value: "+28%", label: "Revenue in 60 days" },
      { value: "Bilingual", label: "Creative across EN / ES" },
      { value: "Local", label: "Service-area targeted" },
    ],
    services: ["Meta Ads", "Creative Direction"],
    serviceSlugs: ["meta-ads", "creative-direction"],
    timeline: "60-day campaign",
    stack: ["Meta Ads Manager", "Meta Pixel", "GA4"],
    outcomes: [
      {
        value: "Revenue up 28% in 60 days",
        body: "A focused Meta Ads program — service-area targeted, creative tuned to a Hispanic-leaning South Florida audience — lifted topline revenue 28% inside the first two months.",
      },
      {
        value: "Bilingual creative system",
        body: "Static and short-form creative produced in English and Spanish, with copy and offer framing tuned to the language each segment actually responds to. Spanish creative consistently outperformed in the local market.",
      },
    ],
    testimonial: {
      quote:
        "We tried running ads on our own and nothing moved. JDT took it over and inside two months we were booked out — and the calls coming in were the right ones.",
      attribution: "Operations lead",
      role: "Carpet Cleaning Xperts",
      isReal: false,
    },
    sections: [
      {
        heading: "The brief",
        body: "Carpet Cleaning Xperts wanted to grow without burning budget. The previous attempts at paid had been ad-hoc — mixed offers, mixed creative, mixed targeting. They needed someone to take it over and run it like a system, even at small scale.",
      },
      {
        heading: "How we ran it",
        body: "A focused Meta Ads program, geo-targeted to active service zones, with creative produced in English and Spanish for the local Hispanic audience. Offer framing was kept simple — a clear price floor, an immediate booking path, a phone number — and creative was rotated on a steady cadence so the audience didn't fatigue. No funnel theatrics, no over-engineering: a clean campaign run by senior hands.",
      },
      {
        heading: "Outcome",
        body: "Revenue lifted 28% inside the first two months. The lift came from two places at once — better-qualified inbound from sharper local targeting, and stronger conversion from creative that spoke to the audience in their own language. The program continues at the cadence the business can absorb.",
      },
    ],
  },

  // ─── SNATCH IT — full marketing ecosystem engagement ──────────────
  {
    slug: "snatch-it",
    client: "Snatch It",
    industry: "Nightlife & Marketplace · App",
    year: "2026",
    title:
      "Building the marketing ecosystem behind a nightlife marketplace.",
    summary:
      "JDT Inc. operates the full marketing ecosystem for Snatch It — branding, art direction, the website, Meta Ads, content, and the systems that tie them together. Built for a nightlife marketplace where the audience is fast-moving, image-led, and demands a real point of view.",
    cover: "ink",
    accent: { rule: "border-snatch", text: "text-snatch", bg: "bg-snatch" },
    heroImage: "/work/snatch-it/cover.png",
    // Snatch It visuals span horizontal posters, vertical posters,
    // sticker mockups, and atmospheric photography — all very different
    // aspect ratios. The gallery uses fit="contain" so every visual
    // shows in full without cropping out the composition or text.
    // Ink letterbox reads as a gallery wall behind black/red posters;
    // a cream letterbox would fight the brand.
    galleryFit: "contain",
    galleryBg: "ink",
    gallery: [
      "/work/snatch-it/visual-02.png", // SNATCH IT. MIAMI. LIVE IN THE APP.
      "/work/snatch-it/visual-01.jpg", // SNATCH IT cinematic TV
      "/work/snatch-it/visual-03.jpg", // BID cinematic TV
      "/work/snatch-it/visual-04.png", // Sticker: This is your sign.
      "/work/snatch-it/visual-05.png", // Sticker: Why TF are you home.
      "/work/snatch-it/logo.png", // SN brand mark
    ],
    metrics: [
      { value: "Full-stack", label: "Marketing engagement" },
      { value: "EN / ES", label: "Bilingual rollout" },
      { value: "Ongoing", label: "Build & operate" },
    ],
    services: [
      "Creative Direction",
      "Meta Ads",
      "Content Production",
      "Funnel Optimization",
    ],
    serviceSlugs: [
      "creative-direction",
      "meta-ads",
      "content-production",
      "funnel-optimization",
    ],
    timeline: "Ongoing — built through 2026",
    stack: [
      "Meta Ads Manager",
      "Figma",
      "Next.js",
      "GA4",
      "Custom marketing stack",
    ],
    outcomes: [
      {
        value: "A bold visual identity",
        body: "Editorial-grade direction in a deliberately maximalist register — high-contrast type, declarative one-liners, restraint where it counts. Range across the studio's work means we can build either luxury restraint or cultural confrontation, and brief either with the same operator-level rigor.",
      },
      {
        value: "Performance built into launch",
        body: "Meta Ads, content production, and the funnel were designed alongside the brand — not bolted on after. Launch creative is testing-ready from day one; the funnel is instrumented before the first dollar of spend.",
      },
      {
        value: "A system, not a campaign",
        body: "What we ship is the operating engine — calendar, creative pipeline, paid program, measurement. Snatch It's team can publish, learn, and scale against the system without rebuilding it every quarter.",
      },
    ],
    testimonial: {
      quote:
        "JDT built the entire engine — the brand, the site, the campaigns, the system. They operate at our pace, not an agency's pace. That's the only reason this works.",
      attribution: "Founder",
      role: "Snatch It",
      isReal: false,
    },
    sections: [
      {
        heading: "The brief",
        body: "Snatch It is a nightlife marketplace app — entry, access, and bidding in venues where guest lists used to do the gating. The brand had to land with a real point of view in a category that punishes anything generic. JDT was hired to build the entire marketing ecosystem from the ground up.",
      },
      {
        heading: "Brand & art direction",
        body: "We led the brand direction in a maximalist register — high-contrast type, declarative one-line campaigns, a visual system that holds at the speed nightlife audiences scroll. The voice is short, confident, deliberate. The system is documented so the in-house team can extend it without supervision.",
      },
      {
        heading: "Website & funnel",
        body: "The marketing site is built on a modern stack with conversion instrumentation in place from day one — every event tracked, every step measured, the path from impression to install pre-mapped. No retrofitting at the next stage.",
      },
      {
        heading: "Meta Ads & content",
        body: "Performance media and content production run through the same editorial direction the brand was built on — so creative, paid, and organic stay in lockstep. The result is a marketing operation that compounds rather than swings between agencies and disciplines.",
      },
      {
        heading: "What's next",
        body: "The engagement is ongoing. The next quarters add SEO depth, lifecycle automation, and a content cadence built for the cultural surfaces the audience actually lives on. Snatch It launches with a marketing engine — not a marketing campaign.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
