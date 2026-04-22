import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "JDT Inc. is a Miami-based digital marketing agency pairing AI-driven strategy with senior creative and media execution.",
};

export default function AboutPage() {
  return (
    <>
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <p className="eyebrow">About — {site.location}</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          A modern agency, built for how brands actually grow today.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          JDT Inc. is a Miami-based digital agency. We pair AI-driven strategy
          with senior creative and media operators to help ambitious brands
          move faster, make better decisions, and grow with intent — not noise.
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
              Most marketing fails for the same reason: great tactics executed
              without a real strategy behind them. We flip the order. Every
              engagement starts with a clear picture of the business, the
              audience, and the outcome — then we build the system that gets
              you there.
            </p>
            <p>
              AI is part of how we work, not a buzzword. We use it to model
              audiences, accelerate creative testing, and surface signals that
              would take a team of analysts weeks to catch. That edge is
              multiplied by senior operators who&apos;ve actually run brands —
              not a layer of junior account managers between you and the work.
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
                  title: "Senior operators, every engagement",
                  body: "You work directly with strategists and creative leads — no handoffs to a junior team.",
                },
                {
                  title: "Strategy grounded in data",
                  body: "AI-assisted research, audience modeling, and measurement woven into every decision.",
                },
                {
                  title: "Creative that performs",
                  body: "Editorial-quality direction tuned for the feed, the funnel, and the brand — at once.",
                },
                {
                  title: "Accountable to outcomes",
                  body: "We report on the metrics that actually move the business, not vanity dashboards.",
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

      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Based in Miami</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Built in Miami. Working with brands everywhere.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-black/70 leading-relaxed">
              Our team is headquartered in Miami, FL — but we partner with
              ambitious brands across the country, fully remote when it makes
              sense, in-person when it matters.
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
