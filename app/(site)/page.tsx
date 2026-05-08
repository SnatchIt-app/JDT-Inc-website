import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import ServiceCard from "@/components/ServiceCard";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/schema";

/**
 * Aggregate proof metrics shown in the hero trust strip.
 * Pulled directly from published case studies — nothing fabricated.
 * Update here when new case studies ship and we want to feature different
 * top-line outcomes on the homepage.
 */
const trustMetrics = [
  { value: "+37%", label: "Sales lifted in 90 days" },
  { value: "−34%", label: "Cost per lead reduction" },
  { value: "4.2×", label: "Return on ad spend" },
  { value: "< 24h", label: "Reply on every inquiry" },
];

/**
 * Homepage FAQ — designed for AEO/GEO.
 *
 * Each Q&A is structured for retrieval by Google AI Overviews, ChatGPT,
 * Perplexity, and Claude search. Answers are first-person plural, anchor
 * the Miami location, the AI-powered positioning, and the priority
 * services. The same content is also emitted as FAQPage JSON-LD so it's
 * eligible for rich results.
 */
const homepageFaqs = [
  {
    question: "What does JDT Inc. do?",
    answer:
      "JDT Inc. is a Miami-based AI-powered marketing agency. We design growth systems that combine senior strategy, editorial creative, performance media (Meta Ads, Google Ads), AI automation, lead generation, CRM systems, and funnel optimization — built to compound results month over month.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We partner with ambitious DTC brands, professional services firms, and luxury / lifestyle businesses — typically founder-led companies investing $50K–$500K+ a year in growth and ready to operate against a real system, not one-off campaigns.",
  },
  {
    question: "How is JDT different from a traditional agency?",
    answer:
      "Every engagement is run by senior operators, not a layer of junior account managers. We use AI to model audiences, accelerate creative testing, and surface signals weeks faster than a manual analyst team — then we report on the metrics that move the business, not vanity dashboards.",
  },
  {
    question: "Where is JDT Inc. located?",
    answer:
      "We're headquartered in Miami, Florida, and partner with brands across the United States — fully remote when it makes sense, in person when it matters.",
  },
];

export default function HomePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
  ]);
  const faqs = faqSchema(homepageFaqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, faqs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <div className="flex flex-col gap-10">
          <p className="eyebrow">
            Miami · AI-Powered Growth Agency · Est. JDT Inc.
          </p>

          <h1 className="display text-hero max-w-6xl">
            Strategy, creative, and AI — in service of growth.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              JDT Inc. is a Miami-based AI-powered marketing agency. We
              engineer growth systems for ambitious brands — pairing senior
              strategy and editorial creative with Meta Ads, Google Ads, AI
              automation, lead generation, and CRM systems that compound month
              over month.
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
                See our work
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

      {/* TRUST STRIP — aggregate proof metrics from published case studies.
          Hairline rules above and below; serif numerals + tracked-uppercase
          labels keep this in the editorial voice. */}
      <Section
        padded={false}
        className="border-t border-b border-gray-200/70 py-14 sm:py-16"
        aria-label="Selected client outcomes"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-12">
          {trustMetrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-3">
              <p className="font-serif text-4xl sm:text-5xl tracking-tightest leading-none">
                {m.value}
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-600 leading-snug">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FEATURED WORK — moved here so proof leads explanation. Each card
          deep-links to its case study; the per-study accent (snatch red,
          xperts teal) lives inside the CaseStudyCard component. */}
      <Section className="border-t border-gray-200/60">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Outcomes that compound, not coincidences.
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
          {caseStudies.map((c, i) => (
            <CaseStudyCard key={c.slug} study={c} index={i} size="lg" />
          ))}
        </div>
      </Section>

      {/* PRACTICE / POSITIONING — moved below the work so it reads as a
          point of view we've already proven, not a promise we haven't. */}
      <Section className="bg-paper-warm border-t border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-3">
            <p className="eyebrow text-ink/70 before:bg-accent">
              Practice
            </p>
          </div>
          <p className="lg:col-span-9 font-serif tracking-tightest text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-ink max-w-4xl">
            We work like an editorial publication that ships paid media.
            Senior hands, restrained creative, systems that compound — and
            a refusal to flatten the brand for a short-term number.
          </p>
        </div>
      </Section>

      {/* INTRO — kept as a Services preamble so the section that follows
          has a frame. Single short panel; preserves SEO copy. */}
      <Section className="border-t border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">What we do</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-display max-w-4xl">
              We build marketing systems — not one-off campaigns.
            </h2>
            <p className="mt-10 text-lg text-gray-700 leading-relaxed max-w-2xl">
              Most agencies hand you tactics. We design the full system —
              positioning, creative, funnels, and paid media — tuned in real
              time with AI automation and grounded in senior strategy. The
              result is compounding growth, not short-term spikes.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section padded={false} className="pt-24 sm:pt-32 pb-24 sm:pb-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Built for the full growth picture.
            </h2>
          </div>
          <Link
            href="/services"
            className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
          >
            All services
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-gray-200/70">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* TESTIMONIAL — single editorial pull-quote.
          --------------------------------------------------------------
          PLACEHOLDER CONTENT. The quote and attribution below are written
          to read as a believable client voice but they are NOT a real
          published quote. Before launching to production, replace with a
          real, attributed quote from a JDT client (with their permission).
          Keeping a placeholder live in production risks misrepresentation.
          --------------------------------------------------------------
      */}
      <Section className="border-t border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">In their words</p>
          </div>
          <figure className="lg:col-span-9">
            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest leading-[1.1] text-ink">
              <span aria-hidden className="text-gray-300">
                &ldquo;
              </span>
              They didn&apos;t sell us a campaign — they built us a growth
              system. Six months in, our cost per lead is down by a third and
              we&apos;re hiring against a pipeline that finally feels real.
              <span aria-hidden className="text-gray-300">
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                Founder
              </span>
              <span className="text-sm text-gray-700">
                · DTC apparel brand · 2024 cohort
              </span>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* PROCESS / WHY JDT */}
      <Section dark className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              Why JDT
            </p>
            <h2 className="display mt-6 text-display">
              A process designed for results.
            </h2>
            <p className="mt-8 text-paper/70 text-lg leading-relaxed max-w-md">
              Every engagement runs through the same four-stage system — so
              strategy, creative, and media stay aligned and keep improving.
            </p>
          </div>

          <ol className="lg:col-span-8 divide-y divide-paper/15 border-t border-paper/15">
            {[
              {
                step: "01",
                title: "Strategy",
                body: "Deep research, audience modeling, and positioning — the foundation everything else is built on.",
              },
              {
                step: "02",
                title: "Creative",
                body: "Editorial direction, campaign creative, and content systems that elevate the brand and perform in feed.",
              },
              {
                step: "03",
                title: "Execution",
                body: "Paid media, funnels, AI automation, and launches — run by senior operators, not junior account managers.",
              },
              {
                step: "04",
                title: "Optimization",
                body: "AI-assisted testing and iteration loops — turning every cohort of data into compounding performance.",
              },
            ].map((p) => (
              <li
                key={p.step}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6 items-start"
              >
                <span className="col-span-2 text-sm text-paper/50 font-mono">
                  {p.step}
                </span>
                <div className="col-span-10">
                  <h3 className="font-serif text-3xl sm:text-4xl tracking-tightest">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-paper/70 leading-relaxed max-w-xl">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ — editorial Q&A.
          Each item also surfaces in the FAQPage JSON-LD declared at the top
          of this page so AI engines and Google can cite the same content
          they're rendering visually here. */}
      <Section className="border-t border-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Frequently asked</p>
            <h2 className="display mt-6 text-display max-w-md">
              Quick answers, before the call.
            </h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-gray-200 border-t border-gray-200">
            {homepageFaqs.map((q) => (
              <div
                key={q.question}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6"
              >
                <dt className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest text-ink">
                  {q.question}
                </dt>
                <dd className="col-span-12 sm:col-span-7 text-gray-700 leading-relaxed">
                  {q.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CLOSING CTA — explicit copy beats the default. Specific timeframe
          ("first 90 days") and specific commitment ("30 minutes, no pitch
          deck") consistently outperform generic CTAs on B2B services sites. */}
      <CTA
        eyebrow="Engage"
        title="Map your first 90 days."
        body="Most engagements start with a 30-minute strategy call — no pitch deck. We'll walk through your goals, your numbers, and what the first 90 days should look like."
        primary={{ label: "Book a strategy call", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
