/**
 * /journal/[slug] — article detail page.
 *
 * Editorial article layout with:
 *  - eyebrow + topic + reading time
 *  - serif H1 + dek
 *  - structured-block body (rendered by ArticleBody)
 *  - related articles inside the topic
 *  - article-specific CTA
 *  - Article + BreadcrumbList JSON-LD
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import ArticleBody from "@/components/ArticleBody";
import JsonLd from "@/components/JsonLd";
import {
  articles,
  getArticle,
  getArticlesByTopic,
  isLive,
  topics,
} from "@/lib/journal";
import { site } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdGraph,
} from "@/lib/schema";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  // Only generate static pages for live articles. Drafts and future-
  // scheduled posts won't be in the build output, so even direct URL
  // access returns the 404 page.
  return articles.filter((a) => isLive(a)).map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const a = getArticle(params.slug);
  if (!a) return { title: "Article" };
  const url = `${site.url}/journal/${a.slug}`;
  return {
    title: a.seo.metaTitle,
    description: a.seo.metaDescription,
    keywords: [a.seo.primaryKeyword, ...a.seo.secondaryKeywords],
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      title: a.seo.metaTitle,
      description: a.seo.metaDescription,
      url,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      authors: [site.name],
      tags: a.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: a.seo.metaTitle,
      description: a.seo.metaDescription,
    },
  };
}

export default function ArticlePage({ params }: Params) {
  const a = getArticle(params.slug);
  // Hard gate: drafts and future-dated scheduled posts 404 even if
  // someone has the URL. This complements generateStaticParams above.
  if (!a || !isLive(a)) notFound();

  const topic = topics.find((t) => t.slug === a.topic);
  const related = getArticlesByTopic(a.topic)
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  const url = `${site.url}/journal/${a.slug}`;
  const graph = jsonLdGraph([
    breadcrumbSchema([
      { name: "Home", url: `${site.url}/` },
      { name: "Journal", url: `${site.url}/journal` },
      ...(topic
        ? [
            {
              name: topic.name,
              url: `${site.url}/journal/topics/${topic.slug}`,
            },
          ]
        : []),
      { name: a.title, url },
    ]),
    articleSchema({
      url,
      headline: a.title,
      description: a.seo.metaDescription,
      datePublished: a.publishedAt,
      dateModified: a.updatedAt ?? a.publishedAt,
    }),
  ]);

  return (
    <>
      <JsonLd data={graph} />

      {/* HEADER */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-16 sm:pb-20">
        <Link
          href="/journal"
          className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> Journal
        </Link>

        <div className="mt-12 flex flex-col gap-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-black/55">
            {a.isPillar && (
              <>
                <span>Pillar</span>
                <span aria-hidden>·</span>
              </>
            )}
            {topic && (
              <>
                <Link
                  href={`/journal/topics/${topic.slug}`}
                  className="link-underline hover:text-ink"
                >
                  {topic.name}
                </Link>
                <span aria-hidden>·</span>
              </>
            )}
            <span>
              <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            </span>
            <span aria-hidden>·</span>
            <span>{a.readingMinutes} min read</span>
          </div>

          <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.98]">
            {a.title}
          </h1>

          <p className="text-xl sm:text-2xl text-black/70 leading-[1.4] font-serif tracking-tight max-w-3xl">
            {a.dek}
          </p>
        </div>
      </Section>

      {/* BODY */}
      <Section padded={false} className="pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <ArticleBody blocks={a.body} />

            {a.tags?.length > 0 && (
              <div className="mt-16 pt-8 border-t border-black/10">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-4">
                  Filed under
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-black/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* SIDE RAIL — sticky internal links + topic anchor */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-10">
              {a.internalLinks && a.internalLinks.length > 0 && (
                <div className="border-t border-black/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/55 mb-5">
                    Read alongside
                  </p>
                  <ul className="flex flex-col gap-3">
                    {a.internalLinks.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="link-underline text-base text-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {topic && (
                <div className="border-t border-black/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/55 mb-5">
                    Topic
                  </p>
                  <Link
                    href={`/journal/topics/${topic.slug}`}
                    className="font-serif text-2xl sm:text-3xl tracking-tightest leading-tight link-underline"
                  >
                    {topic.name}
                  </Link>
                  <p className="mt-3 text-sm text-black/65 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {/* RELATED — same topic */}
      {related.length > 0 && (
        <Section className="border-t border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">More in this topic</p>
              <h2 className="display mt-6 text-display max-w-3xl">
                Continue reading.
              </h2>
            </div>
            {topic && (
              <Link
                href={`/journal/topics/${topic.slug}`}
                className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
              >
                All of {topic.name}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-l border-black/10">
            {related.map((r, i) => (
              <Link
                key={r.slug}
                href={`/journal/${r.slug}`}
                className="group flex flex-col p-8 sm:p-10 border-t border-r border-black/10 hover:bg-paper-muted transition-colors duration-500"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-tightest leading-tight mt-8">
                  {r.title}
                </h3>
                <p className="mt-5 text-sm text-black/65 leading-relaxed flex-1">
                  {r.dek}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-black/45">
                  {r.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTA
        eyebrow={a.cta?.eyebrow ?? "Engage"}
        title={a.cta?.title ?? "Want this kind of thinking inside your business?"}
        body={
          a.cta?.body ??
          "Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your numbers and where the next 90 days should focus."
        }
        primary={
          a.cta?.primary ?? {
            label: "Book a strategy call",
            href: "/contact",
          }
        }
        secondary={a.cta?.secondary ?? { label: "See the work", href: "/work" }}
      />
    </>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
