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
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
  ],
};
