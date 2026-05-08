/**
 * /locations/miami — Miami pillar page.
 *
 * The canonical Miami SEO anchor. Targets "Miami AI marketing agency"
 * + the related local cluster. Heavy schema stack: LocalBusiness with
 * full Miami areaServed, BreadcrumbList, FAQPage. Internal-links
 * outward to the 5 neighborhood pages and inward from the homepage,
 * services, and footer.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import { miami } from "@/lib/locations";
import { caseStudies } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  localBusinessSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: miami.seo.metaTitle,
  description: miami.seo.metaDescription,
  keywords: [miami.seo.primaryKeyword, ...miami.seo.secondaryKeywords],
  alternates: { canonical: "/locations/miami" },
  openGraph: {
    title: miami.seo.metaTitle,
    description: miami.seo.metaDescription,
    url: `${site.url}/locations/miami`,
    type: "website",
  },
};

export default function MiamiLocation() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Locations", url: `${site.url}/locations/miami` },
    { name: "Miami", url: `${site.url}/locations/miami` },
  ]);
  const faqs = faqSchema(miami.faqs);

  // Re-emit LocalBusiness here with a more specific @id keyed to the
  // Miami location page — Google reads this as the canonical Miami
  // entity surface, distinct from the site-wide one.
  const local = localBusinessSchema();

  const relatedStudies = miami.relatedCaseStudies
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, local, faqs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <div className="flex flex-col gap-10">
          <p className="eyebrow">{miami.hero.eyebrow}</p>

          <h1 className="display text-hero max-w-6xl">{miami.hero.h1}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              {miami.hero.subheadline}
            </p>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                Book a strategy call
                <span
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full border border-ink px-6 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
              >
                See the work
                <span
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* MARKET CONTEXT — dark band, parallel to service "Outcomes" rhythm */}
      <Section dark padded={false} className="py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              Why Miami
            </p>
            <h2 className="display mt-6 text-display">
              A different sport.
            </h2>
          </div>
          <p className="lg:col-span-8 text-lg text-paper/70 leading-relaxed max-w-2xl self-end">
            {miami.marketContext.intro}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-paper/15 pt-10">
          {miami.marketContext.pillars.map((p, i) => (
            <li key={p.title} className="grid grid-cols-12 gap-4">
              <span className="col-span-2 text-sm text-paper/50 font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-10">
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tightest">
                  {p.title}
                </h3>
                <p className="mt-3 text-paper/70 leading-relaxed">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* INDUSTRIES */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Industries</p>
            <h2 className="display mt-6 text-display max-w-md">
              The verticals we run hardest in.
            </h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-md">
              JDT Inc. concentrates on five Miami verticals where the work
              compounds — and where editorial standards and performance
              math are both required to win.
            </p>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {miami.industries.map((ind) => (
              <li
                key={ind.name}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6"
              >
                <h3 className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest">
                  {ind.name}
                </h3>
                <p className="col-span-12 sm:col-span-7 text-black/70 leading-relaxed">
                  {ind.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* NEIGHBORHOODS */}
      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Neighborhoods</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Where we work across the city.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-l border-black/10">
          {miami.neighborhoods.map((n, i) => (
            <Link
              key={n.slug}
              href={`/locations/miami/${n.slug}`}
              className="group flex flex-col p-8 sm:p-10 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <span
                  className="text-black/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink"
                  aria-hidden
                >
                  →
                </span>
              </div>
              <h3 className="display mt-8 text-3xl leading-[1.05]">
                {n.name}
              </h3>
              <p className="mt-5 text-black/70 leading-relaxed flex-1">
                {n.short}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* BILINGUAL */}
      {miami.bilingualNote && (
        <Section className="border-t border-black/10 bg-paper-muted">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">A Miami advantage</p>
              <h2 className="display mt-6 text-display max-w-3xl">
                {miami.bilingualNote.title}
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg text-black/70 leading-relaxed">
              {miami.bilingualNote.body}
            </p>
          </div>
        </Section>
      )}

      {/* SELECTED WORK */}
      {relatedStudies.length > 0 && (
        <Section className="border-t border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="display mt-6 text-display max-w-3xl">
                Built in Miami.
              </h2>
            </div>
            <Link
              href="/work"
              className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
            >
              All case studies
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {relatedStudies.map((c, i) => (
              <CaseStudyCard key={c.slug} study={c} index={i} size="lg" />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Frequently asked</p>
            <h2 className="display mt-6 text-display max-w-md">
              Quick answers about working with us in Miami.
            </h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {miami.faqs.map((q) => (
              <div
                key={q.question}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6"
              >
                <dt className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest text-ink">
                  {q.question}
                </dt>
                <dd className="col-span-12 sm:col-span-7 text-black/70 leading-relaxed">
                  {q.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CTA
        eyebrow="Engage"
        title="Bring senior operators to your Miami program."
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your goals, your numbers, and where the next 90 days should focus."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
