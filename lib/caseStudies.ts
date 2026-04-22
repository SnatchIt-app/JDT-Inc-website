export type Metric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  title: string;
  summary: string;
  cover: string; // background treatment id for styling
  metrics: Metric[];
  services: string[];
  sections: {
    heading: string;
    body: string;
  }[];
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
    metrics: [
      { value: "+37%", label: "Sales in 90 days" },
      { value: "2 of 3", label: "SKUs sold out" },
      { value: "4.2x", label: "Return on ad spend" },
    ],
    services: ["Brand Strategy", "Performance Advertising", "Funnels & Automation", "Content Strategy"],
    sections: [
      {
        heading: "The brief",
        body: "22NatiON needed a launch that felt bigger than the brand — one that could command attention in a crowded activewear category and convert interest into revenue within a tight window.",
      },
      {
        heading: "What we did",
        body: "We built a narrative around the collection, modeled the highest-intent audiences using AI-driven segmentation, and rolled out a coordinated paid, organic, and CRM push pointed at a custom conversion funnel.",
      },
      {
        heading: "The result",
        body: "Sales climbed 37% in the first three months post-launch, traffic compounded week over week, and two of the three headline products sold out — turning a single release into momentum for the next one.",
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
    metrics: [
      { value: "+28%", label: "Revenue" },
      { value: "-34%", label: "Cost per lead" },
      { value: "3x", label: "Qualified inbound" },
    ],
    services: ["Performance Advertising", "Funnels & Automation", "Brand Strategy"],
    sections: [
      {
        heading: "The brief",
        body: "A strong local operator wanted to expand reach without burning budget on unqualified clicks. They needed a system — not another vendor running ads.",
      },
      {
        heading: "What we did",
        body: "We segmented audiences around life events (new homeowners) and commercial signals (carpeted office spaces), then ran creative variants tuned to each. A rebuilt inbound funnel captured and qualified leads automatically.",
      },
      {
        heading: "The result",
        body: "Revenue lifted 28% and cost per lead dropped 34% — a structural improvement in unit economics, not just a short-term spike.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
