import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/caseStudies";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <div className="flex flex-col gap-10">
          <p className="eyebrow">Miami · Digital Agency · Est. JDT Inc.</p>

          <h1 className="display text-hero max-w-6xl">
            Strategy, creative, and AI — in service of growth.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              JDT Inc. is a digital marketing agency that helps ambitious brands
              grow — combining AI-driven strategy with senior creative
              execution, performance media, and funnels that actually convert.
            </p>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                Book a call
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

      {/* INTRO */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">What we do</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-display max-w-4xl">
              We build marketing systems — not one-off campaigns.
            </h2>
            <p className="mt-10 text-lg text-black/70 leading-relaxed max-w-2xl">
              Most agencies hand you tactics. We design the full system:
              positioning, creative, funnels, and media — tuned in real time
              with AI and grounded in senior strategy. The result is
              compounding growth, not short-term spikes.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section padded={false} className="pb-24 sm:pb-32">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black/10">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* FEATURED WORK */}
      <Section className="border-t border-black/10">
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
                body: "Media, funnels, automation, and launches — run by senior operators, not junior account managers.",
              },
              {
                step: "04",
                title: "Optimization",
                body: "AI-assisted testing and iteration loops that compound performance month over month.",
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

      {/* CTA */}
      <CTA />
    </>
  );
}
