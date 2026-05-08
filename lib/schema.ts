/**
 * JSON-LD schema helpers for JDT Inc.
 *
 * Centralizing schema here keeps the page components clean and ensures the
 * entity graph stays consistent across the site. Every helper returns a
 * plain object that should be JSON.stringified inside a
 * <script type="application/ld+json"> tag.
 *
 * Why this matters:
 * - Organization + LocalBusiness give Google + AI engines (ChatGPT,
 *   Perplexity, Google AI Overviews) a clean entity to cite.
 * - Service / Article / BreadcrumbList unlock rich results.
 * - WebSite enables sitelinks search.
 *
 * All schema is rendered server-side, so it costs zero JS at runtime.
 */

import { site } from "@/lib/site";

const LOGO_URL = `${site.url}/icon.png`;
const DEFAULT_OG = `${site.url}/opengraph-image`;

/**
 * Joins one or more JSON-LD blocks into the @graph form Google prefers
 * when multiple entities live on the same page.
 */
export function jsonLdGraph(blocks: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": blocks,
  };
}

/**
 * The canonical Organization entity for JDT Inc.
 * Used on every page via the root layout.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG,
    description: site.description,
    foundingDate: site.foundedYear,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      addressCountry: site.address.addressCountry,
      ...(site.address.streetAddress
        ? { streetAddress: site.address.streetAddress }
        : {}),
      ...(site.address.postalCode
        ? { postalCode: site.address.postalCode }
        : {}),
    },
    sameAs: [
      ...site.socials.map((s) => s.href),
      // Pull in any populated authority profiles (LinkedIn company,
      // Clutch, Crunchbase, etc.). Empty strings are filtered out so
      // ungated placeholders don't pollute the schema.
      ...Object.values(site.authorityProfiles).filter((u) => Boolean(u)),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };
}

/**
 * LocalBusiness — the local SEO anchor. ProfessionalService is the most
 * accurate subtype for a marketing agency (it's a recognized schema.org
 * subtype of LocalBusiness).
 */
export function localBusinessSchema() {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    image: DEFAULT_OG,
    logo: LOGO_URL,
    url: site.url,
    email: site.email,
    description:
      "AI-powered marketing and growth systems agency in Miami — Meta Ads, Google Ads, AI automation, lead generation, CRM systems, content production, and funnel optimization.",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      addressCountry: site.address.addressCountry,
      ...(site.address.streetAddress
        ? { streetAddress: site.address.streetAddress }
        : {}),
      ...(site.address.postalCode
        ? { postalCode: site.address.postalCode }
        : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    knowsAbout: [
      "Meta Ads",
      "Google Ads",
      "AI automation",
      "Lead generation",
      "CRM systems",
      "Funnel optimization",
      "Content production",
      "Creative direction",
      "Brand strategy",
      "Performance marketing",
    ],
    paymentAccepted: site.paymentAccepted.join(", "),
    currenciesAccepted: site.currenciesAccepted,
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    ...(site.authorityProfiles.googleBusinessProfile
      ? { hasMap: site.authorityProfiles.googleBusinessProfile }
      : {}),
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

/**
 * AggregateRating — only emit when authentic reviews exist (gated by
 * the caller). Schema spam from invented ratings is the single
 * fastest way to lose Google trust; this helper is intentionally
 * called from nowhere by default.
 */
export function aggregateRatingSchema(opts: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${site.url}/#organization` },
    ratingValue: opts.ratingValue,
    reviewCount: opts.reviewCount,
    bestRating: opts.bestRating ?? 5,
    worstRating: opts.worstRating ?? 1,
  };
}

/**
 * WebSite schema — enables sitelinks search box and gives crawlers a
 * canonical reference for the property.
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
  };
}

/**
 * BreadcrumbList — pass an ordered list of [{ name, url }] from the
 * homepage downward (root included).
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Service schema — used on per-service pages once Sprint 3 ships.
 */
export function serviceSchema(opts: {
  slug: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "Service",
    "@id": `${site.url}/services/${opts.slug}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    url: `${site.url}/services/${opts.slug}`,
  };
}

/**
 * Article schema — used on case studies and journal posts.
 */
export function articleSchema(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    image: opts.image ?? DEFAULT_OG,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: opts.authorName ?? site.name,
      "@id": `${site.url}/#organization`,
    },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: opts.url,
  };
}

/**
 * Person schema — used for the founder block on About and anywhere
 * else we publish founder bylines. The Person is linked to the
 * Organization via `worksFor` so AI engines and Google can resolve
 * the founder ↔ company relationship cleanly.
 */
export function personSchema(opts: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}) {
  return {
    "@type": "Person",
    "@id": `${site.url}/about#person-${opts.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: opts.name,
    jobTitle: opts.jobTitle,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.url ? { url: opts.url } : {}),
    ...(opts.sameAs ? { sameAs: opts.sameAs } : {}),
    worksFor: { "@id": `${site.url}/#organization` },
  };
}

/**
 * Review schema — used on case study pages when a real, authorized
 * client testimonial exists. Never emitted for placeholder content
 * (we don't claim aggregate ratings on text we wrote ourselves).
 *
 * Linked to the Organization @id via itemReviewed so the rating
 * attaches to JDT, not to the case study page.
 */
export function reviewSchema(opts: {
  body: string;
  authorName: string;
  authorRole?: string;
  caseStudyUrl: string;
}) {
  return {
    "@type": "Review",
    "@id": `${opts.caseStudyUrl}#review`,
    reviewBody: opts.body,
    author: {
      "@type": "Person",
      name: opts.authorName,
      ...(opts.authorRole ? { jobTitle: opts.authorRole } : {}),
    },
    itemReviewed: { "@id": `${site.url}/#organization` },
  };
}

/**
 * FAQPage schema — used wherever we render a structured Q&A block.
 * AI engines weight this heavily for citation eligibility.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
