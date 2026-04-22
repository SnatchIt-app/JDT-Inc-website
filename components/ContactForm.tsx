"use client";

import { useState } from "react";
import { BUDGET_RANGES, SERVICE_INTERESTS } from "@/lib/crm";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Public contact form — submits to /api/contact which creates a Lead row
 * in the CRM database. Fields: name, email, company, phone, service
 * interest, estimated budget, message.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      phone: String(formData.get("phone") || ""),
      serviceInterest: String(formData.get("serviceInterest") || ""),
      estimatedBudget: String(formData.get("estimatedBudget") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Request failed");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field name="company" label="Company" />
        <Field name="phone" label="Phone" type="tel" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <SelectField
          name="serviceInterest"
          label="Service interest"
          options={SERVICE_INTERESTS as readonly string[]}
          placeholder="Select a service"
        />
        <SelectField
          name="estimatedBudget"
          label="Estimated budget"
          options={BUDGET_RANGES as readonly string[]}
          placeholder="Select a range"
        />
      </div>
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
            {errorMsg ?? "Something went wrong. Try again?"}
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

function SelectField({
  name,
  label,
  options,
  placeholder,
}: {
  name: string;
  label: string;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className="relative pt-6">
      <label
        htmlFor={name}
        className="absolute left-0 top-0 text-xs uppercase tracking-[0.2em] text-black/50"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full appearance-none bg-transparent border-b border-black/20 pb-3 text-base text-ink focus:border-ink focus:outline-none transition-colors pr-6"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-3 text-black/40"
      >
        ↓
      </span>
    </div>
  );
}
