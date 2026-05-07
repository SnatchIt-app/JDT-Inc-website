import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's build a growth system for your business. Book a strategy call with JDT Inc. or send us the details of your project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    url: `${site.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Contact", url: `${site.url}/contact` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />
      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-24">
        <p className="eyebrow">Contact · {site.location}</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Let&apos;s build a growth system for your business.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          Tell us what you need and we&apos;ll map the next move — a focused
          plan for positioning, demand, and the systems that turn both into
          revenue.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href={site.calendly}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Book a strategy call
            <span
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>
          <a
            href="#message"
            className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full border border-ink px-6 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
          >
            Send a message
            <span
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            >
              ↓
            </span>
          </a>
        </div>

        {/* trust row */}
        <ul className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-black/10 pt-10">
          {[
            { k: "Reply", v: "< 24 hours" },
            { k: "Intro call", v: "30 minutes" },
            { k: "Discovery", v: "No fee" },
            { k: "Based", v: site.location },
          ].map((item) => (
            <li key={item.k}>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {item.k}
              </p>
              <p className="mt-2 font-serif text-xl sm:text-2xl tracking-tightest">
                {item.v}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* BOOK A CALL — embedded scheduler */}
      <Section
        id="book"
        dark
        padded={false}
        className="pt-24 sm:pt-32 pb-16 sm:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              Book a call
            </p>
            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              Pick a time that works.
            </h2>
            <p className="mt-8 max-w-xl text-paper/70 text-lg leading-relaxed">
              30 minutes, no pitch deck. We&apos;ll walk through your goals,
              where you are today, and whether JDT Inc. is the right fit for
              what&apos;s next.
            </p>
          </div>
          <div className="lg:col-span-4 flex sm:justify-end">
            <a
              href={site.calendly}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-paper/90 transition-colors"
            >
              Open in Calendly
              <span
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                aria-hidden
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </Section>

      {/* Embedded Calendly (light background so the widget looks clean) */}
      <Section padded={false} className="pb-24 sm:pb-32 -mt-px">
        <div className="rounded-2xl overflow-hidden border border-black/10 bg-paper">
          <CalendlyEmbed url={site.calendly} />
        </div>
      </Section>

      {/* MESSAGE FORM */}
      <Section
        id="message"
        padded={false}
        className="pb-24 sm:pb-32 border-t border-black/10 pt-16 sm:pt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <p className="eyebrow">Prefer to write?</p>
              <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.05] max-w-md">
                Send us the details.
              </h2>
              <p className="mt-6 text-black/65 leading-relaxed max-w-md">
                Share the shape of the project — timing, goals, what&apos;s
                working, what isn&apos;t. We reply to every inquiry within a
                business day.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-xl font-serif tracking-tightest link-underline"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
                  Studio
                </p>
                <p className="text-xl font-serif tracking-tightest">
                  {site.location}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
                  Follow
                </p>
                <ul className="flex flex-col gap-2.5">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
