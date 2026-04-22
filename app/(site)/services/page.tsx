import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, content, funnels, visual design, performance advertising, and development — the full stack of services JDT Inc. brings to ambitious brands.",
};

export default function ServicesPage() {
  return (
    <>
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
            <div
              key={s.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 sm:py-20"
            >
              <div className="lg:col-span-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  0{i + 1}
                </p>
                <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.02]">
                  {s.title}
                </h2>
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
            </div>
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
