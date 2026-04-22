import Link from "next/link";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section padded={false} className="pt-40 sm:pt-48 pb-32">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-8 text-hero max-w-4xl">
        Page not found.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-black/70">
        The page you&apos;re looking for doesn&apos;t exist — or was moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
      >
        Back to home <span aria-hidden>→</span>
      </Link>
    </Section>
  );
}
