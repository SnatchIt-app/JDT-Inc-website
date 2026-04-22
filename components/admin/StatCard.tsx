import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  dark?: boolean;
};

export default function StatCard({ label, value, hint, dark }: Props) {
  return (
    <div
      className={cn(
        "p-6 border rounded-xl flex flex-col justify-between min-h-[140px]",
        dark
          ? "bg-ink text-paper border-ink"
          : "bg-paper border-black/10"
      )}
    >
      <p
        className={cn(
          "text-xs uppercase tracking-[0.2em]",
          dark ? "text-paper/60" : "text-black/50"
        )}
      >
        {label}
      </p>
      <div>
        <p className="font-serif text-5xl tracking-tightest leading-none">
          {value}
        </p>
        {hint && (
          <p
            className={cn(
              "mt-2 text-xs",
              dark ? "text-paper/60" : "text-black/50"
            )}
          >
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
