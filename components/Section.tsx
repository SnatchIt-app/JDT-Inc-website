import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Adds top/bottom padding appropriate for an editorial section */
  padded?: boolean;
  /** Constrain inner content width */
  container?: boolean;
  /** Render as dark (ink) section */
  dark?: boolean;
};

export default function Section({
  children,
  className,
  id,
  padded = true,
  container = true,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        dark ? "bg-ink text-paper" : "bg-paper text-ink",
        padded && "py-24 sm:py-32",
        className
      )}
    >
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
