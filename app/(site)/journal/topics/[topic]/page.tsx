/**
 * /journal/topics/[topic] — topic cluster hub.
 *
 * Each of the 10 clusters gets a hub page. The pillar article is
 * featured prominently; supporting articles fill the grid below. As
 * the cluster grows, this page becomes one of the strongest internal
 * authority surfaces on the site — Google reads it as "JDT publishes
 * deeply on this topic."
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import {
  topics,
  getTopic,
  getArticlesByTopic,
  getArticle,
} from "@/lib/journal";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

type Params = { params: { topic: string } };

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const t = getTopic(params.topic as Parameters<typeof getTopic>[0]);
  if (!t) return { title: "Topic" };
  return {
    title: t.seo.metaTitle,
    description: t.seo.metaDescription,
    alternates: { canonical: `/journal/topics/${t.slug}` },
    openGraph: {
      title: t.seo.metaTitle,
      description: t.seo.metaDescription,
      url: `${site.url}/journal/topics/${t.slug}`,
      type: "website",
    },
  };
}

export default function TopicPage({ params }: Params) {
  const topic = getTopic(params.topic as Parameters<typeof getTopic>[0]);
  if (!topic) notFound();

  const all = getArticlesByTopic(topic.slug);
  const pillar = topic.pillarSlug ? getArticle(topic.pillarSlug) : undefined;
  const supporting = all.filter((a) => a.slug !== topic.pillarSlug);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Journal", url: `${site.url}/journal` },
    { name: topic.name, url: `${site.url}/journal/topics/${topic.slug}` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-24">
        <Link
          href="/journal"
          className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> Journal
        </Link>

        <p className="eyebrow mt-12">Topic · {topic.name}</p>
        <h1 className="display mt-8 text-hero max-w-5xl">{topic.name}</h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          {topic.description}
        </p>
      </Section>

      {/* PILLAR */}
      {pillar && (
        <Section
          padded={false}
          className="border-t border-black/10 pt-16 sm:pt-20 pb-20 sm:pb-24"
        >
          <p className="eyebrow mb-10">Start here · Pillar</p>
          <Link
            href={`/journal/${pillar.slug}`}
            className="group block max-w-5xl"
          >
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl leading-[1] max-w-4xl">
              {pillar.title}
            </h2>
            <p className="mt-8 max-w-2xl text-lg text-black/70 leading-relaxed">
              {pillar.dek}
            </p>
            <span className="mt-10 inline-flex items-center gap-2 text-sm link-underline">
              Read the pillar
              <span
                aria-hidden
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </Section>
      )}

      {/* SUPPORTING */}
      {supporting.length > 0 ? (
        <Section className="border-t border-black/10">
          <p className="eyebrow mb-10">More in {topic.name}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-l border-black/10">
            {supporting.map((a, i) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group flex flex-col p-8 sm:p-10 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tightest leading-tight mt-8">
                  {a.title}
                </h3>
                <p className="mt-5 text-sm text-black/65 leading-relaxed flex-1">
                  {a.dek}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-black/45">
                  {a.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Section>
      ) : (
        // No supporting articles published yet — still a strong page
        // because the pillar holds it. We surface a "what's next" stub
        // so Google sees an indexable, intentional editorial plan.
        <Section className="border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Forthcoming</p>
              <h2 className="display mt-6 text-display max-w-md">
                More writing on this topic, soon.
              </h2>
            </div>
            <div className="lg:col-span-8 max-w-2xl">
              <p className="text-lg text-black/70 leading-relaxed">
                We publish on the cadence the work allows — slow journalism
                for an industry that talks too fast. The cluster on{" "}
                {topic.name} expands across the next ninety days.
              </p>
              <Link
                href="/journal"
                className="mt-10 inline-flex items-center gap-2 text-sm link-underline"
              >
                Browse the rest of the journal
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Section>
      )}

      <CTA
        eyebrow="Engage"
        title={`Bring ${topic.name} thinking into your business.`}
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your goals, your numbers, and where this kind of work fits."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
