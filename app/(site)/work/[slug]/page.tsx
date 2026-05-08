import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdGraph,
  reviewSchema,
} from "@/lib/schema";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case study" };
  const url = `${site.url}/work/${study.slug}`;
  return {
    title: `${study.client} — Case Study`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${study.client} — ${study.title}`,
      description: study.summary,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client} — Case Study`,
      description: study.summary,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  const url = `${site.url}/work/${study.slug}`;
  const graph = jsonLdGraph([
    breadcrumbSchema([
      { name: "Home", url: `${site.url}/` },
      { name: "Work", url: `${site.url}/work` },
      { name: study.client, url },
    ]),
    articleSchema({
      url,
      headline: study.title,
      description: study.summary,
      datePublished: `${study.year}-01-01`,
    }),
    // Only emit Review JSON-LD when we have an authorized real quote.
    // Placeholder testimonials render visually but are excluded from
    // schema so we never claim a rating we can't substantiate.
    ...(study.testimonial?.isReal
      ? [
          reviewSchema({
            body: study.testimonial.quote,
            authorName: study.testimonial.attribution,
            authorRole: study.testimonial.role,
            caseStudyUrl: url,
          }),
        ]
      : []),
  ]);

  return (
    <>
      <JsonLd data={graph} />
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <Link
          href="/work"
          className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> Back to work
        </Link>

        <div className="mt-10 flex flex-col gap-8">
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-black/50">
            <span>{study.industry}</span>
            <span>·</span>
            <span>{study.year}</span>
          </div>
          <p className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-black/40">
            {study.client}
          </p>
          <h1 className="display text-display max-w-5xl">{study.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-black/70 leading-relaxed">
            {study.summary}
          </p>
        </div>
      </Section>

      {/* Metrics band */}
      <Section dark padded={false} className="py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="border-t border-paper/20 pt-6"
            >
              <p className="font-serif text-5xl sm:text-6xl tracking-tightest">
                {m.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-paper/60">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sections */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <p className="eyebrow">Services</p>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm text-black/75">
                {study.services.map((s, i) => {
                  const slug = study.serviceSlugs?.[i];
                  return (
                    <li key={s} className="flex gap-3">
                      <span aria-hidden className="text-black/30">
                        —
                      </span>
                      {slug ? (
                        <Link
                          href={`/services/${slug}`}
                          className="link-underline"
                        >
                          {s}
                        </Link>
                      ) : (
                        s
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {study.timeline && (
              <div>
                <p className="eyebrow">Timeline</p>
                <p className="mt-6 font-serif text-2xl tracking-tightest">
                  {study.timeline}
                </p>
              </div>
            )}

            {study.stack && study.stack.length > 0 && (
              <div>
                <p className="eyebrow">Stack</p>
                <ul className="mt-6 flex flex-col gap-2 text-sm text-black/75">
                  {study.stack.map((tool) => (
                    <li key={tool} className="flex gap-3">
                      <span aria-hidden className="text-black/30">
                        —
                      </span>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col gap-16">
            {study.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-tightest">
                  {section.heading}
                </h2>
                <p className="mt-6 text-lg text-black/75 leading-relaxed max-w-2xl">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* OUTCOMES — narrative breakdown beyond the metrics band. */}
      {study.outcomes && study.outcomes.length > 0 && (
        <Section className="border-t border-black/10 bg-paper-muted">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Outcomes</p>
              <h2 className="display mt-6 text-display max-w-md">
                What changed.
              </h2>
            </div>
            <ul className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
              {study.outcomes.map((o) => (
                <li
                  key={o.value}
                  className="py-8 sm:py-10 grid grid-cols-12 gap-6"
                >
                  <h3 className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest">
                    {o.value}
                  </h3>
                  <p className="col-span-12 sm:col-span-7 text-black/70 leading-relaxed">
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* TESTIMONIAL — pull-quote from the engagement.
          PLACEHOLDER content is rendered visually but excluded from
          Review JSON-LD (see the schema graph above). Replace with a
          real, authorized quote and set isReal: true to enable the
          schema layer. */}
      {study.testimonial && (
        <Section className="border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <p className="eyebrow">In their words</p>
            </div>
            <figure className="lg:col-span-9">
              <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest leading-[1.1] text-ink">
                <span aria-hidden className="text-black/30">
                  &ldquo;
                </span>
                {study.testimonial.quote}
                <span aria-hidden className="text-black/30">
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/55">
                  {study.testimonial.attribution}
                </span>
                <span className="text-sm text-black/70">
                  · {study.testimonial.role}
                </span>
              </figcaption>
            </figure>
          </div>
        </Section>
      )}

      {/* Next case study */}
      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <p className="eyebrow">Next project</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl leading-[1] max-w-3xl">
              {next.client}
            </h2>
            <p className="mt-4 text-black/60 max-w-xl">{next.title}</p>
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-center gap-3 rounded-full border border-ink px-6 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
          >
            View case study
            <span
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </Section>

      <CTA />
    </>
  );
}
