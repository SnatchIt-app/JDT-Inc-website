"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // TODO: Wire up to Formspree, Resend, or a Next.js route handler.
    // For now this is a frontend-only placeholder that simulates a submit.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <Field name="company" label="Company" />
      <Field name="message" label="What are you looking to build?" textarea />

      <div className="flex items-center gap-6 pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <span
            className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </button>
        {status === "sent" && (
          <p className="text-sm text-black/60">
            Thanks — we&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong. Try again?
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full bg-transparent border-b border-black/20 pt-6 pb-3 text-base text-ink placeholder-transparent focus:border-ink focus:outline-none transition-colors";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={label}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={label}
          className={cls}
        />
      )}
      <label
        htmlFor={name}
        className="absolute left-0 top-0 text-xs uppercase tracking-[0.2em] text-black/50 transition-all duration-300
          peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-black/40
          peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-ink"
      >
        {label}
      </label>
    </div>
  );
}
