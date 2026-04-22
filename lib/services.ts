export type Service = {
  slug: string;
  title: string;
  short: string;
  outcome: string;
  details: string[];
};

export const services: Service[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    short:
      "Positioning, narrative, and identity systems that make your brand impossible to ignore.",
    outcome: "A brand that commands attention and compounds every marketing dollar.",
    details: [
      "Market & competitor positioning",
      "Messaging architecture",
      "Visual identity direction",
      "Brand guidelines",
    ],
  },
  {
    slug: "content-strategy",
    title: "Content Strategy",
    short:
      "Editorial direction and production systems that turn content into a real growth channel.",
    outcome: "Consistent, high-signal content that builds trust and drives pipeline.",
    details: [
      "Content pillars & calendars",
      "Short-form & long-form direction",
      "Creator & talent sourcing",
      "Performance reporting",
    ],
  },
  {
    slug: "funnels-automation",
    title: "Funnels & Automation",
    short:
      "Full-funnel systems that capture demand, qualify leads, and hand off sales-ready buyers.",
    outcome: "Predictable pipeline with less manual work and higher close rates.",
    details: [
      "Lead capture & nurture flows",
      "CRM & email automation",
      "Landing pages & offers",
      "Conversion instrumentation",
    ],
  },
  {
    slug: "visual-design",
    title: "Visual Design",
    short:
      "Editorial design, campaign art direction, and content systems that look premium on every surface.",
    outcome: "Creative that elevates the brand and outperforms in feed.",
    details: [
      "Campaign art direction",
      "Social & ad creative",
      "Web & landing design",
      "Motion direction",
    ],
  },
  {
    slug: "performance-advertising",
    title: "Performance Advertising",
    short:
      "Paid media across Meta, Google, TikTok, and programmatic — built around measurable outcomes.",
    outcome: "Lower CAC, higher ROAS, and a media mix that scales with you.",
    details: [
      "Meta, Google, TikTok, YouTube",
      "Audience & creative testing",
      "Attribution & measurement",
      "Budget scaling frameworks",
    ],
  },
  {
    slug: "development",
    title: "Development",
    short:
      "Fast, modern websites and landing pages engineered for conversion and SEO.",
    outcome: "A site that looks premium, loads instantly, and converts visitors into revenue.",
    details: [
      "Marketing sites & landing pages",
      "Headless CMS integrations",
      "Analytics & tracking",
      "SEO & performance tuning",
    ],
  },
];
