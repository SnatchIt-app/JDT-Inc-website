export const site = {
  name: "JDT Inc.",
  legalName: "JDT Inc.",
  shortName: "JDT",
  tagline: "AI-powered marketing & growth systems agency in Miami.",
  description:
    "JDT Inc. is a Miami-based AI-powered marketing and growth systems agency. We pair senior strategy and editorial creative with Meta Ads, Google Ads, AI automation, lead generation, CRM systems, and funnel optimization — building growth systems for ambitious brands.",
  // Canonical production domain. Apex jdt-inc.com and the legacy jdtinc.com
  // should 301 to this host at the DNS / hosting layer.
  url: "https://www.jdt-inc.com",
  location: "Miami, FL",
  // City-level location anchoring for LocalBusiness schema. Street + phone
  // intentionally omitted at this stage — they can be added without code
  // changes other than these fields.
  address: {
    streetAddress: "",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "",
    addressCountry: "US",
  },
  // Approximate Miami centroid — used as a stable hint for LocalBusiness
  // until a precise studio address is published.
  geo: {
    latitude: 25.7617,
    longitude: -80.1918,
  },
  // Region we serve for AreaServed in LocalBusiness schema.
  areaServed: ["Miami", "Miami-Dade County", "South Florida", "United States"],
  email: "hello@jdt-inc.com",
  phone: "",
  // Founding year drives the Organization schema's foundingDate.
  foundedYear: "2023",
  calendly: "https://calendly.com/gnvprod/30min",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/jdt_inc_/" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
  /**
   * Authority profiles surfaced to schema as Organization.sameAs.
   * Replace empty strings with real URLs as profiles are verified —
   * the schema layer filters out empties so partials are safe to ship.
   */
  authorityProfiles: {
    linkedinCompany: "", // https://www.linkedin.com/company/jdt-inc
    crunchbase: "", // https://www.crunchbase.com/organization/jdt-inc
    clutch: "", // https://clutch.co/profile/jdt-inc
    designRush: "", // https://www.designrush.com/agency/profile/jdt-inc
    goodFirms: "", // https://www.goodfirms.co/company/jdt-inc
    g2: "", // https://www.g2.com/products/jdt-inc
    googleBusinessProfile: "", // GBP listing URL when verified
  },
  /**
   * Operating hours used by LocalBusiness.openingHoursSpecification.
   * "By appointment" is honest for an agency without a public office —
   * hours apply to phone/email response, not walk-ins.
   */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  ] as Array<{ days: string[]; opens: string; closes: string }>,
  paymentAccepted: ["Wire transfer", "ACH", "Credit Card"],
  currenciesAccepted: "USD",
  // ─── Founder block ─────────────────────────────────────────────────
  // Anchors the Person schema on the About page and the founder's
  // editorial section. Update `name`, `bio`, and `socials` with real
  // values before launch — the schema will render correctly with
  // whatever is here, but Google and AI engines will pick up the live
  // values, so accuracy matters.
  // -------------------------------------------------------------------
  founder: {
    name: "Jose Tascon",
    title: "Founder & Studio Lead",
    /**
     * PLACEHOLDER BIO. Replace with a real bio before launch. Keeping
     * the editorial voice consistent with the rest of the site:
     * confident, specific, no buzzword pile, hyphens for parenthetical
     * thoughts. Keep it ~80–140 words.
     */
    bio: "Jose Tascon is the founder of JDT Inc., a Miami-based AI-powered marketing agency. He built the studio after a decade running performance, creative, and growth programs for founder-led brands — and a deepening conviction that the next generation of agencies would be defined by senior operators, AI-native operating systems, and editorial standards held without compromise.\n\nHe lives and works in Miami, where JDT operates as the kind of agency the city's most ambitious brands actually deserve.",
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
  } as const,
};
