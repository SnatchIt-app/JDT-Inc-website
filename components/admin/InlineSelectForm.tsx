"use client";

import { useRef, useTransition } from "react";

type Props = {
  /** Server action the form submits to. */
  action: (formData: FormData) => Promise<void> | void;
  /** Hidden fields forwarded with every submission. */
  hidden: Record<string, string>;
  /** Select input name. */
  name: string;
  /** Current value. */
  value: string;
  options: readonly string[];
  label: string;
};

/**
 * Tiny client component — renders a labeled <select> that auto-submits its
 * parent form whenever the user picks a new value. Keeps the detail page
 * mostly server-rendered while still giving instant feedback on changes.
 */
export default function InlineSelectForm({
  action,
  hidden,
  name,
  value,
  options,
  label,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, start] = useTransition();

  return (
    <div className="border border-black/10 rounded-xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
        {label}
      </p>
      <form ref={formRef} action={action}>
        {Object.entries(hidden).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
        <select
          name={name}
          defaultValue={value}
          onChange={() => start(() => formRef.current?.requestSubmit())}
          disabled={pending}
          className="w-full bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none disabled:opacity-60"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <p className="mt-2 text-[11px] text-black/40">
          {pending ? "Saving…" : "Saves automatically"}
        </p>
      </form>
    </div>
  );
}
