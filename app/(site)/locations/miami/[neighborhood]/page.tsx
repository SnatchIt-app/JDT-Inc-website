/**
 * /locations/miami/[neighborhood] — neighborhood landing page.
 *
 * Renders any of the 5 Miami neighborhoods (Brickell, Wynwood,
 * Miami Beach, Coral Gables, Design District) from data in
 * lib/locations.ts. Each page is a hyper-local SEO surface targeting
 * "[neighborhood] marketing agency" and the local industry vertical.
 *
 * Schema stack: BreadcrumbList + LocalBusiness (with neighborhood as
 * areaServed) + FAQPage.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { miami, getNeighborhood } from "@/lib/locations";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  localBusinessSchema,
} from "@/lib/schema";

type Params = { params: { neighborhood: string } };

export function generateStaticParams() {
  return miami.neighborhoods.map((n) => ({ neighborhood: n.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const n = getNeighborhood("miami", params.neighborhood);
  if (!n) return { title: "Neighborhood" };
  return {
    title: n.seo.metaTitle,
    description: n.seo.metaDescription,
    keywords: [n.seo.primaryKeyword, ...n.seo.secondaryKeywords],
    alternates: { canonical: `/locations/miami/${n.slug}` },
    openGraph: {
      title: n.seo.metaTitle,
      description: n.seo.metaDescription,
      url: `${site.url}/locations/miami/${n.slug}`,
      type: "website",
    },
  };
}

export default function NeighborhoodPage({ params }: Params) {
  const n = getNeighborhood("miami", params.neighborhood);
  if (!n) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Locations", url: `${site.url}/locations/miami` },
    { name: "Miami", url: `${site.url}/locations/miami` },
    { name: n.name, url: `${site.url}/locations/miami/${n.slug}` },
  ]);
  const faqs = faqSchema(n.faqs);
  const local = localBusinessSchema();

  // Cross-links to other neighborhoods for internal linking.
  const otherNeighborhoods = miami.neighborhoods.filter(
    (x) => x.slug !== n.slug,
  );

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, local, faqs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <Link
          href="/locations/miami"
          className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> All Miami neighborhoods
        </Link>

        <div className="mt-12 flex flex-col gap-10">
          <p className="eyebrow">
            Miami · {n.name}
          </p>

          <h1 className="display text-hero max-w-6xl">
            {n.name} marketing, run by senior operators.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              {n.intro}
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
                href="/services"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full border border-ink px-6 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
              >
                Our services
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

      {/* MARKET PROFILE — the local read */}
      <Section dark className="border-t border-paper/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              The market
            </p>
            <h2 className="display mt-6 text-display">
              How {n.name} actually moves.
            </h2>
            <p className="mt-8 text-paper/70 text-lg leading-relaxed max-w-md">
              {n.marketProfile.intro}
            </p>
          </div>
          <ul className="lg:col-span-8 divide-y divide-paper/15 border-t border-paper/15">
            {n.marketProfile.signals.map((signal, i) => (
              <li
                key={signal}
                className="py-6 sm:py-7 grid grid-cols-12 gap-6 items-start"
              >
                <span className="col-span-2 text-sm text-paper/50 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="col-span-10 text-paper/85 leading-relaxed">
                  {signal}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Industries</p>
            <h2 className="display mt-6 text-display max-w-md">
              Who we work with in {n.name}.
            </h2>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {n.industries.map((ind) => (
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

      {/* WHAT WE DO HERE */}
      <Section className="border-t border-black/10 bg-paper-muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">What we do here</p>
            <h2 className="display mt-6 text-display max-w-md">
              The work that lands.
            </h2>
          </div>
          <ul className="lg:col-span-8 flex flex-col gap-5">
            {n.whatWeDo.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-12 gap-6 items-start border-t border-black/10 pt-5"
              >
                <span className="col-span-2 text-sm text-black/45 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="col-span-10 text-lg text-black/80 leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Frequently asked</p>
            <h2 className="display mt-6 text-display max-w-md">
              About working with us in {n.name}.
            </h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {n.faqs.map((q) => (
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

      {/* OTHER NEIGHBORHOODS */}
      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Across Miami</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Where else we work.
            </h2>
          </div>
          <Link
            href="/locations/miami"
            className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
          >
            Miami overview
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-l border-black/10">
          {otherNeighborhoods.map((other, i) => (
            <Link
              key={other.slug}
              href={`/locations/miami/${other.slug}`}
              className="group flex flex-col p-8 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tightest leading-tight mt-6">
                {other.name}
              </h3>
              <p className="mt-4 text-sm text-black/65 leading-relaxed flex-1">
                {other.short}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Engage"
        title={`Bring senior operators to your ${n.name} program.`}
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your goals, your numbers, and what the first 90 days should look like."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
