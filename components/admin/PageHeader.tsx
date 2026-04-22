import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  back?: { href: string; label: string };
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  back,
}: Props) {
  return (
    <div className="border-b border-black/10 bg-paper">
      <div className="px-6 md:px-10 py-8 md:py-10">
        {back && (
          <Link
            href={back.href}
            className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2 mb-6"
          >
            <span aria-hidden>←</span> {back.label}
          </Link>
        )}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                {eyebrow}
              </p>
            )}
            <h1 className="font-serif tracking-tightest text-4xl md:text-5xl leading-[1] mt-3">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-black/60 max-w-2xl">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap gap-3">{actions}</div>
          )}
        </div>
      </div>
    </div>
  );
}
