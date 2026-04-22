import type { Metadata } from "next";
import PageHeader from "@/components/admin/PageHeader";
import {
  BUDGET_RANGES,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STAGES,
  LEAD_TEMPERATURES,
  SERVICE_INTERESTS,
} from "@/lib/crm";
import { createLeadAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin · New lead",
  robots: { index: false, follow: false },
};

export default function NewLeadPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <>
      <PageHeader
        back={{ href: "/admin/leads", label: "Back to leads" }}
        eyebrow="Manual entry"
        title="New lead"
        description="Add a lead that came from outside the website."
      />

      <div className="px-6 md:px-10 py-10 max-w-3xl">
        {searchParams.error && (
          <p className="mb-6 text-sm text-red-600">
            Please review the fields and try again.
          </p>
        )}

        <form action={createLeadAction} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="fullName" label="Full name" required />
            <Field name="email" label="Email" type="email" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="company" label="Company" />
            <Field name="phone" label="Phone" type="tel" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              name="serviceInterest"
              label="Service interest"
              options={SERVICE_INTERESTS as readonly string[]}
              allowBlank
            />
            <Select
              name="estimatedBudget"
              label="Estimated budget"
              options={BUDGET_RANGES as readonly string[]}
              allowBlank
            />
          </div>

          <Field name="message" label="Notes / message" textarea />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              name="source"
              label="Source"
              options={LEAD_SOURCES as readonly string[]}
              defaultValue="Manual Entry"
            />
            <Select
              name="status"
              label="Stage"
              options={LEAD_STAGES as readonly string[]}
              defaultValue="New"
            />
            <Select
              name="priority"
              label="Priority"
              options={LEAD_PRIORITIES as readonly string[]}
              defaultValue="Medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              name="temperature"
              label="Temperature"
              options={LEAD_TEMPERATURES as readonly string[]}
              defaultValue="Cold"
            />
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-black/50">
                Next follow-up (optional)
              </span>
              <input
                type="date"
                name="nextFollowUpAt"
                className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none"
              />
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors"
            >
              Create lead →
            </button>
          </div>
        </form>
      </div>
    </>
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
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-black/50">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      )}
    </label>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue,
  allowBlank,
}: {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  allowBlank?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-black/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none"
      >
        {allowBlank && <option value="">—</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
