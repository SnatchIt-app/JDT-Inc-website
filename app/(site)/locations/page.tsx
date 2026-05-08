/**
 * /locations — index page.
 *
 * Currently lists Miami (the only city) and surfaces the five
 * neighborhood pages. Built as a real index now so the breadcrumb
 * trail Home › Locations › Miami resolves cleanly, and the URL has
 * a canonical surface for AI engines that ask "where does JDT work."
 *
 * As new cities ship, append to lib/locations.ts and they appear
 * here without page edits.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { locations, miami } from "@/lib/locations";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Where JDT Inc. works — Miami, Florida and across South Florida. Brickell, Wynwood, Miami Beach, Coral Gables, and the Design District.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: `Locations — ${site.name}`,
    url: `${site.url}/locations`,
    type: "website",
  },
};

export default function LocationsIndex() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Locations", url: `${site.url}/locations` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />

      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <p className="eyebrow">Locations</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Where the work happens.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          JDT Inc. is headquartered in Miami, Florida. We work across the
          city's primary commercial neighborhoods — and partner with
          ambitious brands across the United States from our base in the
          Magic City.
        </p>
      </Section>

      {/* Cities */}
      <Section className="border-t border-black/10">
        <p className="eyebrow mb-10">By city</p>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-l border-black/10">
          {locations.map((loc, i) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group flex flex-col p-10 sm:p-12 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {String(i + 1).padStart(2, "0")} · {loc.stateAbbr}
              </p>
              <h2 className="display mt-8 text-4xl sm:text-5xl leading-[1.02]">
                {loc.name}
              </h2>
              <p className="mt-6 text-black/70 leading-relaxed flex-1">
                {loc.hero.subheadline}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm link-underline">
                Open city page
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Miami neighborhoods */}
      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Miami · Neighborhoods</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Where we work across the city.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-l border-black/10">
          {miami.neighborhoods.map((n, i) => (
            <Link
              key={n.slug}
              href={`/locations/miami/${n.slug}`}
              className="group flex flex-col p-8 sm:p-10 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {String(i + 1).padStart(2, "0")}
              </p>
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

      <CTA
        eyebrow="Engage"
        title="Bring senior operators to your local program."
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your goals, your numbers, and where the next 90 days should focus."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
