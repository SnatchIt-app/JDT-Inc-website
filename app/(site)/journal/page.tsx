/**
 * /journal — index page.
 *
 * Editorial publication landing — recent articles in cards, then the
 * 10 topic clusters as navigable tiles. No infinite scroll, no tag
 * cloud, no "popular posts" widget. Magazine architecture.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import {
  articles,
  topics,
  getRecentArticles,
  getArticlesByTopic,
} from "@/lib/journal";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes from JDT Inc. — long-form writing on AI marketing, performance media, funnel optimization, and the systems behind compounding growth.",
  alternates: {
    canonical: "/journal",
    languages: {
      "en-US": "/journal",
      "es-US": "/es/journal",
      "x-default": "/journal",
    },
  },
  openGraph: {
    title: `Journal — ${site.name}`,
    url: `${site.url}/journal`,
    type: "website",
  },
};

export default function JournalIndex() {
  const recent = getRecentArticles(6);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Journal", url: `${site.url}/journal` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <p className="eyebrow">Journal · Field notes</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Long-form writing on the systems behind growth.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          Working notes from senior operators — AI marketing, performance
          media, funnel work, creative systems. Slow journalism for an
          industry that talks too fast.
        </p>
      </Section>

      {/* RECENT — large feature + grid */}
      {recent.length > 0 && (
        <Section
          padded={false}
          className="border-t border-black/10 pt-16 sm:pt-20 pb-24 sm:pb-32"
        >
          <p className="eyebrow mb-12">Latest</p>

          {recent.length === 1 ? (
            // Single-feature layout when only one article exists yet.
            <FeatureArticle article={recent[0]} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-7">
                <FeatureArticle article={recent[0]} />
              </div>
              <div className="lg:col-span-5 flex flex-col divide-y divide-black/10 border-t border-black/10">
                {recent.slice(1).map((a) => (
                  <CompactArticleRow key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* TOPICS — the 10 cluster tiles */}
      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">By topic</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Ten clusters. One operating worldview.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-l border-black/10">
          {topics.map((t, i) => {
            const count = getArticlesByTopic(t.slug).length;
            return (
              <Link
                key={t.slug}
                href={`/journal/topics/${t.slug}`}
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
                <h3 className="display mt-8 text-2xl sm:text-3xl leading-[1.05]">
                  {t.name}
                </h3>
                <p className="mt-5 text-sm text-black/65 leading-relaxed flex-1">
                  {t.description}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-black/45">
                  {count === 0
                    ? "Forthcoming"
                    : count === 1
                    ? "1 article"
                    : `${count} articles`}
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <CTA
        eyebrow="Engage"
        title="Read what we've shipped, then talk shape."
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through what you're seeing in your numbers and what the first 90 days could look like."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}

function FeatureArticle({
  article,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group block border-t border-black/10 pt-8 sm:pt-10"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-black/55">
        {article.isPillar && <span>Pillar</span>}
        {article.isPillar && <span aria-hidden>·</span>}
        <span>{topicName(article.topic)}</span>
        <span aria-hidden>·</span>
        <span>{article.readingMinutes} min read</span>
      </div>
      <h3 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.02] max-w-3xl">
        {article.title}
      </h3>
      <p className="mt-6 text-lg text-black/70 leading-relaxed max-w-2xl">
        {article.dek}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 text-sm link-underline">
        Read the piece
        <span
          aria-hidden
          className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}

function CompactArticleRow({
  article,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group flex flex-col gap-3 py-6 sm:py-8 hover:bg-paper-muted/50 transition-colors duration-500 px-2 -mx-2"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-black/55">
        {topicName(article.topic)} · {article.readingMinutes} min
      </p>
      <h4 className="font-serif text-2xl sm:text-3xl tracking-tightest leading-tight">
        {article.title}
      </h4>
      <p className="text-sm text-black/65 leading-relaxed">{article.dek}</p>
    </Link>
  );
}

function topicName(slug: string) {
  return topics.find((t) => t.slug === slug)?.name ?? slug;
}
