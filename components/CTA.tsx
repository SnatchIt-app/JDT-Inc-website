import Link from "next/link";
import Section from "./Section";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTA({
  eyebrow = "Next step",
  title = "Ready to make the next 12 months count?",
  body = "Tell us where you want to go. We'll put together a plan built around what actually moves the needle for your business.",
  primary = { label: "Book a call", href: "/contact" },
  secondary = { label: "See our work", href: "/work" },
}: CTAProps) {
  return (
    <Section dark className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow text-paper/70 before:bg-paper/40">{eyebrow}</p>
          <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
            {title}
          </h2>
          {body && (
            <p className="mt-8 max-w-xl text-paper/70 text-lg leading-relaxed">
              {body}
            </p>
          )}
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link
            href={primary.href}
            className="group inline-flex items-center justify-between rounded-full bg-paper text-ink px-6 py-4 text-sm font-medium hover:bg-paper/90 transition-colors"
          >
            {primary.label}
            <span
              className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="group inline-flex items-center justify-between rounded-full border border-paper/30 text-paper px-6 py-4 text-sm hover:border-paper transition-colors"
            >
              {secondary.label}
              <span
                className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
