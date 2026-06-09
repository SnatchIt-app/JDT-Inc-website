/**
 * JDT Inc. — Locations data.
 *
 * Local SEO architecture for Miami. The Miami pillar page lives at
 * /locations/miami and anchors the city-level keyword cluster.
 * Five neighborhood pages live at /locations/miami/[neighborhood] and
 * each targets a hyper-local keyword + a specific industry vertical.
 *
 * The data shape is parallel to lib/services.ts so the same template
 * patterns apply: structured content, FAQs co-emitted as schema, dense
 * internal linking. Add new cities or neighborhoods by appending here —
 * no template changes required.
 */

export type Neighborhood = {
  slug: string;
  name: string;
  /** Card / index summary. */
  short: string;
  /** Hero subheadline. */
  intro: string;
  /** SEO. */
  seo: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  /** Editorial body — what defines this neighborhood as a market. */
  marketProfile: { intro: string; signals: string[] };
  /** Industries we work with most heavily here. */
  industries: { name: string; body: string }[];
  /** Neighborhood-specific outcomes / differentiators. */
  whatWeDo: string[];
  /** Local-flavor FAQs. */
  faqs: { question: string; answer: string }[];
};

export type Location = {
  slug: string; // city-level slug, e.g. "miami"
  name: string; // "Miami"
  state: string; // "Florida"
  stateAbbr: string; // "FL"
  /** SEO for the city pillar page. */
  seo: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  hero: {
    eyebrow: string;
    h1: string;
    subheadline: string;
  };
  /** "Why Miami" section. */
  marketContext: { intro: string; pillars: { title: string; body: string }[] };
  /** Industries served at the city level. */
  industries: { name: string; body: string }[];
  /** Neighborhoods covered. */
  neighborhoods: Neighborhood[];
  /** Bilingual / cultural section — Miami-specific advantage. */
  bilingualNote?: { title: string; body: string };
  faqs: { question: string; answer: string }[];
  /** Slugs from caseStudies. */
  relatedCaseStudies: string[];
};

export const miami: Location = {
  slug: "miami",
  name: "Miami",
  state: "Florida",
  stateAbbr: "FL",
  seo: {
    metaTitle: "Miami Marketing Agency — JDT Inc.",
    metaDescription:
      "JDT Inc. is a marketing agency in Miami. Meta Ads, Google Ads, AI automation, lead generation, CRM systems, and creative direction for brands across South Florida.",
    primaryKeyword: "miami ai marketing agency",
    secondaryKeywords: [
      "miami marketing agency",
      "marketing agency miami",
      "meta ads agency miami",
      "google ads agency miami",
      "ai automation miami",
      "performance marketing miami",
      "luxury marketing miami",
    ],
  },
  hero: {
    eyebrow: "Locations · Miami, FL",
    h1: "Made in Miami, measured in results.",
    subheadline:
      "JDT Inc. is a marketing agency based in Miami, working with brands across South Florida and the United States. We run Meta and Google Ads, produce the creative, and build the lead generation and CRM systems behind them, from a studio rooted in the city.",
  },
  marketContext: {
    intro:
      "Miami is one of the few American cities where culture, capital, and consumer demand all flow through the same room. Marketing here is a different sport, and most agencies still play it like they're somewhere else.",
    pillars: [
      {
        title: "A bilingual market by default",
        body: "More than 70% of Miami-Dade is Hispanic. Spanish, English, and bilingual creative aren't a translation step; they're three audience programs running in parallel. We design for all three from day one.",
      },
      {
        title: "Hospitality-first commerce",
        body: "Miami's economy runs disproportionately on hospitality, lifestyle, real estate, and luxury retail. Paid marketing here has to perform without cheapening the brand. Craft is non-negotiable.",
      },
      {
        title: "A founder economy",
        body: "Miami's last five years have produced a dense layer of founder-led businesses building from here: tech, finance, fashion, F&B, professional services. They don't want junior account managers. They want people who've done it before.",
      },
      {
        title: "A visual-first audience",
        body: "Miami over-indexes on visual platforms: Instagram, TikTok, YouTube. Brands that show up with well-made creative outperform; brands that rely on stock and templates get scrolled past.",
      },
    ],
  },
  industries: [
    {
      name: "Hospitality & F&B",
      body: "Restaurants, hotels, members clubs, and venues across Brickell, Wynwood, South Beach, and the Design District. Ad creative that looks as good as the venue.",
    },
    {
      name: "Real estate & development",
      body: "Luxury condo, commercial, and short-term rental brands serving Miami-Dade and Broward. Lead generation systems built for high-ticket, long-sales-cycle pipelines.",
    },
    {
      name: "Fashion, beauty & lifestyle",
      body: "DTC apparel, beauty, and wellness brands rooted in the Miami aesthetic, from local launches to national scaling.",
    },
    {
      name: "Professional services",
      body: "Law, finance, healthcare, and B2B services concentrated in Brickell and Coral Gables. Lead-gen programs and CRM systems that match the sales cycle.",
    },
    {
      name: "Bilingual & Latin American crossover",
      body: "Brands serving the Spanish-speaking US market and Latin American expansion, with creative, copy, and CRM in both languages.",
    },
  ],
  bilingualNote: {
    title: "Bilingual by design, not by translation",
    body: "Miami marketing without Spanish-language fluency leaves money on the table. We design programs in English, Spanish, and bilingual modes, with native creative rather than translated decks, because audiences code-switch and our work has to follow.",
  },
  faqs: [
    {
      question: "Where exactly is JDT Inc. located?",
      answer:
        "JDT Inc. is based in Miami, Florida. We work across Miami-Dade (Brickell, Wynwood, Miami Beach, Coral Gables, and the Design District) and with brands across South Florida and the United States.",
    },
    {
      question: "Do you only work with Miami brands?",
      answer:
        "No. Most engagements run with brands across the United States. Our base is Miami; our work isn't restricted to it. We do bring a real local advantage to brands operating here: bilingual creative, neighborhood familiarity, and the relationships that come from being on the ground.",
    },
    {
      question: "Do you create Spanish-language and bilingual campaigns?",
      answer:
        "Yes, and we design for them as first-class audiences, not as translations. Native Spanish copy, culturally fluent creative direction, and CRM journeys in the language each segment actually uses.",
    },
    {
      question: "What's a typical Miami client engagement?",
      answer:
        "Most engagements start at $10K–$25K/month in retainer plus media spend. Smaller scopes (audits, productized engagements, single-service retainers) start lower. We work best with founder-led businesses past $1M in annual revenue that are done with one-off campaigns.",
    },
    {
      question: "Do you have an office we can visit?",
      answer:
        "We're a studio-first practice with a Miami base. Most engagements run remote-first with on-site sessions in the city when the work calls for it. If you'd prefer to start with an in-person strategy call in Miami, we can make that happen.",
    },
  ],
  relatedCaseStudies: ["22nation", "carpet-cleaning-xperts"],
  neighborhoods: [
    // BRICKELL — fully written as the sample template
    {
      slug: "brickell",
      name: "Brickell",
      short:
        "The financial district: professional services, fintech, and luxury condo programs.",
      intro:
        "Brickell is Miami's financial core: towers full of law firms, family offices, fintech operators, and the luxury condo programs that house them. The marketing problem here is rarely traffic. It's qualification, lifecycle, and trust.",
      seo: {
        metaTitle: "Brickell Marketing Agency — Miami — JDT Inc.",
        metaDescription:
          "Brickell marketing agency for fintech, professional services, and luxury condo brands. Meta Ads, Google Ads, lead generation, and CRM systems. JDT Inc., Miami.",
        primaryKeyword: "brickell marketing agency",
        secondaryKeywords: [
          "marketing agency brickell",
          "brickell ad agency",
          "brickell digital marketing",
          "fintech marketing miami",
          "professional services marketing miami",
        ],
      },
      marketProfile: {
        intro:
          "Brickell concentrates more lawyers, finance professionals, and luxury-condo developers per square mile than anywhere else in South Florida. Marketing for these buyers is a long-cycle, high-trust game.",
        signals: [
          "70+ towers of professional services and finance, with concentrated B2B demand inside a 1.2-square-mile core",
          "One of the highest median household incomes in Miami-Dade; luxury condo, hospitality, and high-end retail are the consumer overlay",
          "Cross-border capital: Latin American wealth, North American institutional money, and fintech founders sharing the same floor of Brickell City Centre",
          "B2B sales cycles measured in months, not weeks; lead quality matters more than lead volume",
        ],
      },
      industries: [
        {
          name: "Financial services & fintech",
          body: "Wealth management, fintech platforms, payments, and crypto operators headquartered in Brickell. Programs designed for compliance-aware paid acquisition and CRM-driven lifecycle.",
        },
        {
          name: "Professional services",
          body: "Boutique law firms, accounting practices, and consulting groups. Lead-gen systems tuned for high-ticket retainers and long deal cycles.",
        },
        {
          name: "Luxury condo & real estate",
          body: "Pre-construction and resale programs targeting domestic and international buyers. Multi-language creative and paid + CRM systems built for six-figure-plus transactions.",
        },
      ],
      whatWeDo: [
        "Lead-gen systems that prequalify by AUM, deal size, and intent before reaching reps",
        "Bilingual paid programs (EN / ES) for Latin American capital flows",
        "CRM and lifecycle automation tuned for long B2B sales cycles",
        "Creative that meets the standard of a luxury condo or wealth-management client",
      ],
      faqs: [
        {
          question: "Do you work with financial services brands in Brickell?",
          answer:
            "Yes: wealth management, fintech, payments, and a small number of crypto-adjacent operators. We work inside compliance constraints rather than around them, and our paid programs are built for high-trust verticals from the start.",
        },
        {
          question: "How is marketing for Brickell professional services different?",
          answer:
            "It's long-cycle and trust-led. Our work focuses on lead quality (enrichment and scoring on closed-won data), CRM-driven nurture, and creative that signals the standing of the practice. Lead volume isn't the metric; sales-qualified pipeline is.",
        },
        {
          question: "Do you handle bilingual programs for Latin American audiences?",
          answer:
            "Yes, and Brickell's cross-border capital flows are exactly where this matters most. We design EN, ES, and bilingual variants as first-class audiences, with native creative and CRM journeys in the language each segment actually uses.",
        },
      ],
    },

    // WYNWOOD — strong supporting content
    {
      slug: "wynwood",
      name: "Wynwood",
      short:
        "The arts district, where DTC fashion, F&B, and creative-led brands compete on craft and content.",
      intro:
        "Wynwood is Miami's creative engine: the neighborhood where fashion brands launch, restaurants set the city's standard, and visitors photograph the walls. Marketing here is a craft contest first, an attribution contest second.",
      seo: {
        metaTitle: "Wynwood Marketing Agency — Miami — JDT Inc.",
        metaDescription:
          "Wynwood marketing agency for DTC fashion, F&B, and creative-led brands. Editorial creative, Meta Ads, content production. JDT Inc., Miami.",
        primaryKeyword: "wynwood marketing agency",
        secondaryKeywords: [
          "marketing agency wynwood",
          "wynwood ad agency",
          "wynwood digital marketing",
          "miami fashion marketing",
          "miami restaurant marketing",
        ],
      },
      marketProfile: {
        intro:
          "Wynwood's brands compete on craft, not budget. The neighborhood's audience expects well-made work; anything less gets scrolled past.",
        signals: [
          "Densest concentration of independent F&B and DTC fashion in Miami",
          "Audience that over-indexes on Instagram, TikTok, and short-form video",
          "Tourist and local traffic at once, so brands need both acquisition and brand work",
          "Visual-first creative is the minimum, not a differentiator",
        ],
      },
      industries: [
        {
          name: "DTC fashion & lifestyle",
          body: "Apparel, accessories, and lifestyle brands launched from Wynwood. Editorial creative paired with paid acquisition that doesn't degrade the brand.",
        },
        {
          name: "Restaurants & F&B",
          body: "Independent restaurants, bars, and concepts with a real point of view. Programs that drive reservations, retail, and the press cycle.",
        },
        {
          name: "Arts, design & creative services",
          body: "Studios, galleries, and creative-led businesses. Content systems that keep a steady publishing pace.",
        },
      ],
      whatWeDo: [
        "Content production systems for restaurants and DTC brands, built around the editorial calendar",
        "Meta and TikTok programs with creative the audience doesn't skip",
        "Influencer and creator partnerships sourced and managed with senior judgment",
        "Bilingual creative for Latin American crossover audiences",
      ],
      faqs: [
        {
          question: "Do you work with restaurants and F&B brands in Wynwood?",
          answer:
            "Yes: independent restaurants, bars, and hospitality concepts where the brand has to look right. Programs cover content production, Meta and TikTok acquisition, and reservation-funnel work.",
        },
        {
          question: "Can you handle creator and influencer partnerships?",
          answer:
            "Yes: sourcing, briefing, and managing creators and presenters who actually fit the brand. Talent management runs through editorial direction, not just media buying.",
        },
        {
          question: "How is Wynwood different from other Miami neighborhoods for marketing?",
          answer:
            "Wynwood is the city's craft contest. Brands here compete on creative output and editorial credibility before they compete on price or paid efficiency. Our content production and creative direction services see the most demand here.",
        },
      ],
    },

    // MIAMI BEACH
    {
      slug: "miami-beach",
      name: "Miami Beach",
      short:
        "Hospitality, lifestyle, and retail. Paid programs for brands operating where the city meets the tourism economy.",
      intro:
        "Miami Beach runs on a layered economy of hospitality, lifestyle retail, and global tourism. Marketing here is a year-round sport with seasonal peaks and the highest creative bar in the city.",
      seo: {
        metaTitle: "Miami Beach Marketing Agency — JDT Inc.",
        metaDescription:
          "Miami Beach marketing agency for hospitality, lifestyle, and retail brands. Paid media, content systems, and CRM. JDT Inc.",
        primaryKeyword: "miami beach marketing agency",
        secondaryKeywords: [
          "marketing agency miami beach",
          "miami beach ad agency",
          "south beach marketing",
          "hotel marketing miami",
          "hospitality marketing south florida",
        ],
      },
      marketProfile: {
        intro:
          "Miami Beach's brands have to convert across three audiences at once (locals, domestic visitors, and international travelers), each with different intent and a different content schedule.",
        signals: [
          "Year-round tourism economy with concentrated peaks (Art Basel, Music Week, holidays)",
          "Hotel, F&B, retail, and wellness brands clustered along Collins Ave, Lincoln Road, and Sunset Harbour",
          "International audience requires bilingual and multi-platform programs",
          "Visual-first audience; creative bar set by the editorial publications covering the city",
        ],
      },
      industries: [
        {
          name: "Hotels & hospitality",
          body: "Independent and group hotels. Programs built around RevPAR, direct-booking funnels, and creative that supports the rate.",
        },
        {
          name: "Restaurants & F&B",
          body: "Concepts on Collins, Lincoln, and Sunset Harbour. Reservation-driven and retail-driven programs.",
        },
        {
          name: "Retail, lifestyle & wellness",
          body: "Boutique retail and wellness brands with both walk-in and DTC components. Paid + CRM systems for both channels.",
        },
      ],
      whatWeDo: [
        "Direct-booking programs designed to compete with OTA channels",
        "Multi-language creative for international visitor audiences",
        "Seasonal calendar and campaign systems aligned to the city's event peaks",
        "Lifecycle marketing for repeat-visit and members-club programs",
      ],
      faqs: [
        {
          question: "Do you work with hotels and hospitality brands?",
          answer:
            "Yes: independent and group hotels, restaurants, and wellness brands. Our programs focus on direct-booking funnels, creative that supports the rate, and lifecycle marketing for repeat-visit programs.",
        },
        {
          question: "Can you handle Art Basel and Music Week campaigns?",
          answer:
            "Yes. Miami Beach's seasonal peaks are part of every annual plan we build for clients here. Calendars, creative production, and paid + organic distribution are all sized against these events months in advance.",
        },
        {
          question: "Do you handle international audiences for Miami Beach brands?",
          answer:
            "Yes. Miami Beach's brands convert across local, domestic-visitor, and international audiences. We design programs in English, Spanish, and bilingual variants, with additional languages where the brand calls for it.",
        },
      ],
    },

    // CORAL GABLES
    {
      slug: "coral-gables",
      name: "Coral Gables",
      short:
        "Luxury real estate, professional services, and family-led brands. The market with the longest sales cycles and the highest expectations.",
      intro:
        "Coral Gables is Miami's most established residential and professional market: luxury real estate, legacy family-owned businesses, and the law firms and medical practices that serve them. The work here is patient and careful.",
      seo: {
        metaTitle: "Coral Gables Marketing Agency — JDT Inc.",
        metaDescription:
          "Coral Gables marketing agency for luxury real estate, professional services, and family-led brands. JDT Inc., Miami.",
        primaryKeyword: "coral gables marketing agency",
        secondaryKeywords: [
          "marketing agency coral gables",
          "coral gables ad agency",
          "luxury real estate marketing miami",
          "professional services marketing coral gables",
        ],
      },
      marketProfile: {
        intro:
          "Coral Gables has the longest median sales cycle in the city and the highest standard for the brands operating here. Marketing rewards patience, craft, and judgment over scale.",
        signals: [
          "Highest concentration of luxury single-family residences in Miami-Dade",
          "Established professional services (law, medicine, finance) with multi-generational practices",
          "Family-led businesses with long brand horizons and conservative creative standards",
          "Buyer audience expects sophistication; visible AI-generated content gets filtered out fast",
        ],
      },
      industries: [
        {
          name: "Luxury real estate",
          body: "Single-family luxury and pre-construction programs targeting domestic and international buyers. Bilingual creative and lead-gen systems built for million-dollar-plus transactions.",
        },
        {
          name: "Professional services",
          body: "Law, medicine, and financial advisory practices. Lead-gen and CRM systems designed for high-ticket retainers and referral-led growth.",
        },
        {
          name: "Family-led & legacy brands",
          body: "Multi-generational businesses building digital programs that protect brand equity while modernizing the customer journey.",
        },
      ],
      whatWeDo: [
        "Lead-gen systems for luxury real estate with international buyer reach",
        "Paid programs that protect the brand for legacy practices",
        "CRM and lifecycle work tuned for referral-driven growth",
        "Creative that meets a conservative-luxury standard",
      ],
      faqs: [
        {
          question: "Do you work with luxury real estate in Coral Gables?",
          answer:
            "Yes: single-family luxury and pre-construction programs targeting domestic and international buyers. Our work covers paid acquisition, bilingual creative, lead enrichment and qualification, and CRM journeys built for the long sales cycles these properties carry.",
        },
        {
          question: "Can you work inside conservative brand standards?",
          answer:
            "Yes, and we prefer to. Coral Gables clients consistently push us toward higher standards rather than away from them. The work here is rarely the loudest; it's the most carefully made.",
        },
      ],
    },

    // DESIGN DISTRICT
    {
      slug: "design-district",
      name: "Design District",
      short:
        "Luxury retail, fashion, and architecture. Brands where craft is the baseline and creative direction defines the work.",
      intro:
        "The Miami Design District is one of the most concentrated luxury retail districts in the United States, and one of the most demanding markets in the country for creative direction. The work has to meet a global brand standard and still perform.",
      seo: {
        metaTitle: "Design District Marketing Agency — Miami — JDT Inc.",
        metaDescription:
          "Miami Design District marketing agency for luxury retail, fashion, and architecture brands. Creative direction with editorial standards. JDT Inc.",
        primaryKeyword: "design district marketing agency",
        secondaryKeywords: [
          "marketing agency design district miami",
          "luxury fashion marketing miami",
          "luxury retail marketing miami",
          "miami design district advertising",
        ],
      },
      marketProfile: {
        intro:
          "Brands in the Design District are graded against the most established luxury houses in the world. Creative direction is non-negotiable; paid work that compromises it reads as off-brand and underperforms.",
        signals: [
          "Concentrated luxury retail: global houses, independent designers, gallery and architecture firms",
          "International audience with sophisticated brand expectations",
          "Visual standard set by the publications covering the district (Surface, Cultured, Wallpaper)",
          "Paid programs have to compete without cheapening the brand",
        ],
      },
      industries: [
        {
          name: "Luxury retail & fashion",
          body: "Houses and independent designers operating from the District. Creative direction and ad creative held to a global luxury standard.",
        },
        {
          name: "Architecture & interior design",
          body: "Studios and firms building brand programs that match their portfolio's standard. Content systems and lead-gen work pitched at the right buyer.",
        },
        {
          name: "Galleries, F&B, and design-led concepts",
          body: "Editorial-led brands working inside the District's cultural calendar.",
        },
      ],
      whatWeDo: [
        "Creative direction at a global luxury standard",
        "Editorial content systems for fashion, design, and architecture brands",
        "Paid programs that scale without cheapening the brand",
        "International + bilingual creative for global audiences",
      ],
      faqs: [
        {
          question: "Can you maintain a luxury brand standard while running performance media?",
          answer:
            "It's the entire point of how we work. Creative direction and media run under the same roof, so creative and media stay aligned and the brand holds its standard as spend scales.",
        },
        {
          question: "Do you work with international luxury brands?",
          answer:
            "Yes. Many of the Design District's most established houses run global programs that intersect Miami. Our bilingual creative and editorial direction extend across markets without losing the brand.",
        },
      ],
    },
  ],
};

export const locations: Location[] = [miami];

// ─── Helpers ───────────────────────────────────────────────────────

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export function getNeighborhood(citySlug: string, neighborhoodSlug: string) {
  const city = getLocation(citySlug);
  if (!city) return undefined;
  return city.neighborhoods.find((n) => n.slug === neighborhoodSlug);
}
