"use client";

import {
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STAGES,
  LEAD_TEMPERATURES,
} from "@/lib/crm";

type Props = {
  defaults: {
    q?: string;
    status?: string;
    priority?: string;
    source?: string;
    temperature?: string;
    from?: string;
    to?: string;
  };
};

/**
 * Pure HTML GET form — filter state lives in the URL. No JS needed beyond
 * the reset button. Submitting navigates to the same page with new params.
 */
export default function LeadFilters({ defaults }: Props) {
  return (
    <form
      method="get"
      action="/admin/leads"
      className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 border border-black/10 rounded-xl bg-paper"
    >
      <input
        name="q"
        defaultValue={defaults.q ?? ""}
        placeholder="Search name, email, or company"
        className="md:col-span-4 bg-transparent border border-black/15 rounded-lg px-3 py-2 text-sm focus:border-ink focus:outline-none"
      />

      <Select
        name="status"
        defaultValue={defaults.status ?? ""}
        label="All stages"
        options={LEAD_STAGES as readonly string[]}
        className="md:col-span-2"
      />
      <Select
        name="temperature"
        defaultValue={defaults.temperature ?? ""}
        label="All temperatures"
        options={LEAD_TEMPERATURES as readonly string[]}
        className="md:col-span-2"
      />
      <Select
        name="priority"
        defaultValue={defaults.priority ?? ""}
        label="All priorities"
        options={LEAD_PRIORITIES as readonly string[]}
        className="md:col-span-2"
      />
      <Select
        name="source"
        defaultValue={defaults.source ?? ""}
        label="All sources"
        options={LEAD_SOURCES as readonly string[]}
        className="md:col-span-2"
      />

      <div className="md:col-span-6 grid grid-cols-2 gap-3">
        <DateInput name="from" defaultValue={defaults.from} label="From" />
        <DateInput name="to" defaultValue={defaults.to} label="To" />
      </div>

      <div className="md:col-span-6 flex gap-2 justify-end">
        <a
          href="/admin/leads"
          className="inline-flex items-center rounded-full border border-black/15 px-4 py-2 text-sm hover:bg-paper-muted"
        >
          Reset
        </a>
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-ink text-paper px-5 py-2 text-sm font-medium hover:bg-ink-soft transition-colors"
        >
          Apply filters
        </button>
      </div>
    </form>
  );
}

function Select({
  name,
  defaultValue,
  label,
  options,
  className,
}: {
  name: string;
  defaultValue?: string;
  label: string;
  options: readonly string[];
  className?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      className={`bg-transparent border border-black/15 rounded-lg px-3 py-2 text-sm focus:border-ink focus:outline-none ${
        className ?? ""
      }`}
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function DateInput({
  name,
  defaultValue,
  label,
}: {
  name: string;
  defaultValue?: string;
  label: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
        {label}
      </span>
      <input
        type="date"
        name={name}
        defaultValue={defaultValue}
        className="bg-transparent border border-black/15 rounded-lg px-3 py-2 text-sm focus:border-ink focus:outline-none"
      />
    </label>
  );
}
