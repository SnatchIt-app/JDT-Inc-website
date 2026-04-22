import type { Metadata } from "next";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with JDT Inc. — tell us about your brand and what you're looking to build.",
};

export default function ContactPage() {
  return (
    <>
      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-24">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Tell us what you&apos;re building.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          Share a few details below. We reply to every inquiry within two
          business days — usually faster.
        </p>
      </Section>

      <Section padded={false} className="pb-24 sm:pb-32 border-t border-black/10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
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
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
                Studio
              </p>
              <p className="text-xl font-serif tracking-tightest">
                {site.location}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
                Prefer a call?
              </p>
              <a
                href="#book"
                className="text-xl font-serif tracking-tightest link-underline"
              >
                Book a 30-min intro →
              </a>
              <p className="mt-3 text-sm text-black/55 max-w-sm">
                Drop your Calendly or booking link into the button below when
                you&apos;re ready.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section
        id="book"
        dark
        className="relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              Book a call
            </p>
            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              Skip the form — pick a time.
            </h2>
            <p className="mt-8 max-w-xl text-paper/70 text-lg">
              30 minutes, no pitch deck. We&apos;ll walk through your goals,
              where you are today, and what a first engagement could look like.
            </p>
          </div>
          <div className="lg:col-span-4">
            {/* Replace `#` with your Calendly / booking URL */}
            <a
              href="#"
              className="group inline-flex w-full items-center justify-between rounded-full bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-paper/90 transition-colors"
            >
              Schedule a call
              <span
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
