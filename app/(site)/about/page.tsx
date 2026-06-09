import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  jsonLdGraph,
  personSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "JDT Inc. is a marketing agency in Miami. We run paid media, produce the creative, and build the funnels and automation behind them.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    url: `${site.url}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "About", url: `${site.url}/about` },
  ]);
  const founder = personSchema({
    name: site.founder.name,
    jobTitle: site.founder.title,
    description: site.founder.bio.replace(/\n+/g, " "),
    url: `${site.url}/about`,
    sameAs: site.founder.socials.map((s) => s.href),
  });

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, founder])} />
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <p className="eyebrow">About — {site.location}</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          A small Miami agency that does the work itself.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          JDT Inc. is a marketing agency in Miami. We run paid media, produce
          the creative, and build the funnels and automation behind them. You
          work directly with the people doing the work.
        </p>
      </Section>

      <Section padded={false} className="pb-24 sm:pb-32 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 sm:pt-20">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our philosophy</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.05]">
              Strategy first. Creative that earns attention. Numbers you can defend.
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-8 text-lg text-black/75 leading-relaxed max-w-2xl">
            <p>
              Most marketing fails for the same reason: decent tactics with no
              real strategy behind them. We flip the order. Every engagement
              starts with a clear picture of the business, the audience, and
              the outcome. Then we build toward it.
            </p>
            <p>
              We use AI for specific jobs: turning customer reviews and call
              notes into research, drafting copy variants for testing, and
              flagging odd movements in ad spend. A person reviews everything
              before it ships. And you work with people who have run brands,
              not a layer of junior account managers.
            </p>
          </div>
        </div>
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              What makes us different
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-paper/15 border-t border-paper/15">
              {[
                {
                  title: "No junior handoff",
                  body: "You work directly with the strategists and creative leads who run your account.",
                },
                {
                  title: "Decisions backed by data",
                  body: "Customer research, clean tracking, and measurement built into every decision.",
                },
                {
                  title: "Creative that performs",
                  body: "Direction with editorial standards, tuned for the feed, the funnel, and the brand.",
                },
                {
                  title: "Accountable to outcomes",
                  body: "We report on leads, cost per lead, and revenue. Not vanity dashboards.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="py-8 sm:py-10 grid grid-cols-12 gap-6"
                >
                  <h3 className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest">
                    {item.title}
                  </h3>
                  <p className="col-span-12 sm:col-span-7 text-paper/70 leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FOUNDER — editorial portrait block.
          --------------------------------------------------------------
          Bio is currently the placeholder content set in lib/site.ts.
          Replace `site.founder.bio` and `site.founder.name` (if needed)
          with real values before launch. The Person schema rendered at
          the top of this page reads from the same data source, so
          Google and AI engines will pick up whatever is published.
          --------------------------------------------------------------
      */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Founder</p>
            <h2 className="display mt-6 text-display max-w-md">
              {site.founder.name}.
            </h2>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/55">
              {site.founder.title}
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6 max-w-2xl">
            {site.founder.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-lg text-black/75 leading-relaxed"
              >
                {para}
              </p>
            ))}
            {site.founder.socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {site.founder.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {/* INDUSTRIES SERVED — entity density + topical authority.
          Same editorial pattern as the services index, condensed. */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Industries</p>
            <h2 className="display mt-6 text-display max-w-md">
              Where the work lands.
            </h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-md">
              We focus on a small number of industries we know well, where
              good creative and disciplined paid media make a visible
              difference.
            </p>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-black/10 pt-8">
            {[
              "Hospitality & F&B",
              "DTC apparel & lifestyle",
              "Beauty & personal care",
              "Health & wellness",
              "Luxury real estate",
              "Professional services",
              "B2B SaaS",
              "Fintech & financial services",
              "Bilingual / Latin American crossover",
              "Local & home services",
            ].map((industry, i) => (
              <li
                key={industry}
                className="grid grid-cols-12 gap-3 items-baseline border-b border-black/10 pb-4"
              >
                <span className="col-span-2 text-xs text-black/40 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 font-serif text-xl tracking-tightest text-ink">
                  {industry}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Based in Miami</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Built in Miami. Working with brands everywhere.
            </h2>
            <p className="mt-6 text-base text-black/55">
              <Link
                href="/locations/miami"
                className="link-underline"
              >
                See how we work in Miami
              </Link>
              {" — "}
              and across Brickell, Wynwood, Miami Beach, Coral Gables, and the
              Design District.
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-black/70 leading-relaxed">
              We&apos;re based in Miami, FL and work with brands across the
              country. Remote for most of the work, in person when it
              matters.
            </p>
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Let's talk"
        title="Want to see what the first 90 days could look like?"
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
