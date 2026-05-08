import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Meta Ads, Google Ads, AI automation, content production, creative direction, lead generation, CRM systems, and funnel optimization — the full stack JDT Inc. brings to ambitious brands.",
  alternates: {
    canonical: "/services",
    languages: {
      "en-US": "/services",
      "es-US": "/es/services",
      "x-default": "/services",
    },
  },
  openGraph: {
    title: `Services — ${site.name}`,
    url: `${site.url}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <p className="eyebrow">Services</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          A full-stack growth partner — not a vendor.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          We plug into your business as an extension of your team. Each service
          stands on its own, but they&apos;re designed to work as one system —
          so the brand, the creative, and the numbers move in the same
          direction.
        </p>
      </Section>

      <Section padded={false} className="border-t border-black/10">
        <div className="divide-y divide-black/10">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 sm:py-20 hover:bg-paper-muted/60 transition-colors duration-500"
              aria-label={`${s.title} — service detail`}
            >
              <div className="lg:col-span-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                    0{i + 1}
                  </p>
                  <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.02]">
                    {s.title}
                  </h2>
                </div>
                <span
                  className="hidden lg:inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-black/15 text-ink transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper"
                  aria-hidden
                >
                  →
                </span>
              </div>

              <div className="lg:col-span-5">
                <p className="text-lg text-black/75 leading-relaxed">
                  {s.short}
                </p>
                <p className="mt-6 text-sm text-black/55 italic">
                  {s.outcome}
                </p>
              </div>

              <div className="lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
                  Includes
                </p>
                <ul className="flex flex-col gap-2.5 text-sm text-black/75">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="text-black/30">
                        —
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Engage"
        title="Not sure where to start?"
        body="Most engagements start with a short strategy call — we'll map what you need, what you don't, and what the first 90 days should look like."
        primary={{ label: "Book a call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
