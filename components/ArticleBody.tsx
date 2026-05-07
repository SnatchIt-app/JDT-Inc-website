/**
 * Renders a structured-block article body.
 *
 * The block model is defined in lib/journal.ts. Each block type maps to
 * a single editorial element with brand-locked typography — there's no
 * way for an article to introduce a font, a color, or a layout that
 * doesn't match the rest of the site.
 *
 * Server component. No JS ships to the client.
 */

import type { Block } from "@/lib/journal";

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 sm:gap-7">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg sm:text-xl text-black/80 leading-[1.6] max-w-2xl">
          {block.text}
        </p>
      );

    case "h2":
      return (
        <h2
          id={block.id}
          className="display mt-10 sm:mt-14 mb-2 text-3xl sm:text-4xl leading-[1.05] scroll-mt-32 max-w-3xl"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3
          id={block.id}
          className="font-serif tracking-tightest mt-6 sm:mt-8 text-2xl sm:text-3xl leading-tight scroll-mt-32 max-w-3xl"
        >
          {block.text}
        </h3>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`flex flex-col gap-3 max-w-2xl text-lg text-black/80 leading-relaxed ${
            block.ordered ? "list-none counter-reset:item" : ""
          }`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 items-baseline">
              <span
                aria-hidden
                className="shrink-0 text-sm text-black/40 font-mono w-6 text-right"
              >
                {block.ordered ? `${String(i + 1).padStart(2, "0")}` : "—"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "pullquote":
      return (
        <figure className="my-10 sm:my-14 max-w-3xl border-y border-black/10 py-10 sm:py-12">
          <blockquote className="font-serif text-3xl sm:text-4xl tracking-tightest leading-[1.1] text-ink">
            <span aria-hidden className="text-black/30">
              &ldquo;
            </span>
            {block.text}
            <span aria-hidden className="text-black/30">
              &rdquo;
            </span>
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-black/55">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <aside className="my-4 max-w-2xl bg-paper-muted border-l-2 border-ink/80 px-6 py-5 sm:px-8 sm:py-7">
          <p className="text-xs uppercase tracking-[0.2em] text-black/60">
            {block.title}
          </p>
          <p className="mt-3 text-base sm:text-lg text-black/80 leading-relaxed">
            {block.body}
          </p>
        </aside>
      );

    case "definition":
      return (
        <dl className="my-4 max-w-2xl border-l-2 border-black/15 pl-6 sm:pl-8">
          <dt className="font-serif text-xl sm:text-2xl tracking-tightest text-ink">
            {block.term}
          </dt>
          <dd className="mt-3 text-base sm:text-lg text-black/75 leading-relaxed">
            {block.body}
          </dd>
        </dl>
      );

    case "divider":
      return (
        <div className="my-10 sm:my-14 max-w-2xl flex justify-center">
          <span aria-hidden className="text-black/25 tracking-[0.6em]">
            · · ·
          </span>
        </div>
      );

    default:
      return null;
  }
}
