import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import PriorityBadge from "@/components/admin/PriorityBadge";
import TemperatureBadge from "@/components/admin/TemperatureBadge";
import ActivityList from "@/components/admin/ActivityList";
import InlineSelectForm from "@/components/admin/InlineSelectForm";
import { getLeadWithDetails } from "@/lib/leads";
import {
  BUDGET_RANGES,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STAGES,
  LEAD_TEMPERATURES,
  SERVICE_INTERESTS,
} from "@/lib/crm";
import { formatDate, formatDateTime, timeAgo } from "@/lib/format";
import {
  addNoteAction,
  deleteLeadAction,
  markContactedAction,
  setFollowUpAction,
  updateLeadAction,
  updatePriorityAction,
  updateStatusAction,
  updateTemperatureAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Admin · Lead",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = await getLeadWithDetails(params.id);
  if (!lead) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/leads", label: "All leads" }}
        eyebrow={lead.source}
        title={lead.fullName}
        description={`Created ${formatDateTime(lead.createdAt)} · Updated ${timeAgo(
          lead.updatedAt
        )}`}
        actions={
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={lead.status} />
            <TemperatureBadge temperature={lead.temperature} />
            <PriorityBadge priority={lead.priority} />
          </div>
        }
      />

      <div className="px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: contact + qualification + original message */}
        <aside className="lg:col-span-1 flex flex-col gap-10">
          <section>
            <h2 className="font-serif text-2xl tracking-tightest mb-4">
              Contact
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              <Row label="Email">
                <a
                  href={`mailto:${lead.email}`}
                  className="hover:underline break-all"
                >
                  {lead.email}
                </a>
              </Row>
              <Row label="Company">{lead.company || "—"}</Row>
              <Row label="Phone">
                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="hover:underline"
                  >
                    {lead.phone}
                  </a>
                ) : (
                  "—"
                )}
              </Row>
              <Row label="Source">{lead.source}</Row>
            </dl>
          </section>

          <section>
            <h2 className="font-serif text-2xl tracking-tightest mb-4">
              Qualification
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              <Row label="Service interest">
                {lead.serviceInterest || "—"}
              </Row>
              <Row label="Estimated budget">
                {lead.estimatedBudget || "—"}
              </Row>
            </dl>
          </section>

          {lead.message && (
            <section>
              <h2 className="font-serif text-2xl tracking-tightest mb-4">
                Original message
              </h2>
              <div className="rounded-xl border border-black/10 bg-paper-muted p-4 text-sm whitespace-pre-wrap">
                {lead.message}
              </div>
            </section>
          )}

          <EditLeadSection lead={lead} />
          <DangerZone id={lead.id} />
        </aside>

        {/* RIGHT: pipeline controls + follow-up + notes + activity */}
        <section className="lg:col-span-2 flex flex-col gap-10">
          <PipelineControls lead={lead} />
          <FollowUpControls lead={lead} />

          {/* NOTES */}
          <section>
            <h2 className="font-serif text-2xl tracking-tightest mb-4">
              Internal notes
            </h2>

            <form action={addNoteAction} className="flex flex-col gap-3 mb-6">
              <input type="hidden" name="id" value={lead.id} />
              <textarea
                name="body"
                required
                rows={3}
                placeholder="Write a note…"
                className="w-full bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none resize-none"
              />
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
                >
                  Add note
                </button>
              </div>
            </form>

            {lead.notes.length === 0 ? (
              <p className="text-sm text-black/50">
                No notes yet — add the first one above.
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {lead.notes.map((note) => (
                  <li
                    key={note.id}
                    className="border border-black/10 rounded-xl p-4"
                  >
                    <p className="text-sm whitespace-pre-wrap">{note.body}</p>
                    <p className="text-xs text-black/50 mt-3">
                      {note.author?.name || note.author?.email || "System"} ·{" "}
                      {timeAgo(note.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* ACTIVITY */}
          <section>
            <h2 className="font-serif text-2xl tracking-tightest mb-4">
              Activity
            </h2>
            <ActivityList items={lead.activities} />
          </section>
        </section>
      </div>
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-black/50">
        {label}
      </dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

/** Inline status + temperature + priority selects that auto-submit. */
function PipelineControls({
  lead,
}: {
  lead: {
    id: string;
    status: string;
    priority: string;
    temperature: string;
  };
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InlineSelectForm
        action={updateStatusAction}
        hidden={{ id: lead.id }}
        name="status"
        value={lead.status}
        options={LEAD_STAGES as readonly string[]}
        label="Stage"
      />
      <InlineSelectForm
        action={updateTemperatureAction}
        hidden={{ id: lead.id }}
        name="temperature"
        value={lead.temperature}
        options={LEAD_TEMPERATURES as readonly string[]}
        label="Temperature"
      />
      <InlineSelectForm
        action={updatePriorityAction}
        hidden={{ id: lead.id }}
        name="priority"
        value={lead.priority}
        options={LEAD_PRIORITIES as readonly string[]}
        label="Priority"
      />
    </section>
  );
}

/**
 * Follow-up section: shows last contacted with a "Mark contacted now"
 * button, and a date picker for the next follow-up (with a clear button).
 */
function FollowUpControls({
  lead,
}: {
  lead: {
    id: string;
    lastContactedAt: Date | null;
    nextFollowUpAt: Date | null;
  };
}) {
  const nextValue = lead.nextFollowUpAt ? toYmd(lead.nextFollowUpAt) : "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue =
    !!lead.nextFollowUpAt &&
    new Date(lead.nextFollowUpAt).getTime() <= today.getTime();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-black/10 rounded-xl p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
          Last contacted
        </p>
        <p className="text-sm">
          {lead.lastContactedAt ? (
            <>
              {formatDateTime(lead.lastContactedAt)}{" "}
              <span className="text-black/50">
                · {timeAgo(lead.lastContactedAt)}
              </span>
            </>
          ) : (
            <span className="text-black/50">Not contacted yet.</span>
          )}
        </p>
        <form action={markContactedAction} className="mt-4">
          <input type="hidden" name="id" value={lead.id} />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm hover:bg-paper-muted transition-colors"
          >
            Mark contacted now
          </button>
        </form>
      </div>

      <div
        className={`border rounded-xl p-5 ${
          isOverdue ? "border-red-300 bg-red-50" : "border-black/10"
        }`}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-3">
          Next follow-up
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <form
            action={setFollowUpAction}
            className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1"
          >
            <input type="hidden" name="id" value={lead.id} />
            <input
              type="date"
              name="nextFollowUpAt"
              defaultValue={nextValue}
              className="bg-transparent border border-black/15 rounded-lg px-3 py-2 text-sm focus:border-ink focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-4 py-2 text-sm hover:bg-ink-soft transition-colors"
            >
              Save
            </button>
          </form>
          {lead.nextFollowUpAt && (
            <form action={setFollowUpAction}>
              <input type="hidden" name="id" value={lead.id} />
              <input type="hidden" name="nextFollowUpAt" value="" />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm hover:bg-paper-muted transition-colors"
              >
                Clear
              </button>
            </form>
          )}
        </div>
        {lead.nextFollowUpAt && (
          <p
            className={`mt-3 text-xs ${
              isOverdue ? "text-red-700" : "text-black/60"
            }`}
          >
            {isOverdue ? "Overdue · " : "Scheduled for "}
            {formatDate(lead.nextFollowUpAt)}
          </p>
        )}
      </div>
    </section>
  );
}

function toYmd(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Collapsible "Edit details" via a <details> element. */
function EditLeadSection({
  lead,
}: {
  lead: {
    id: string;
    fullName: string;
    email: string;
    company: string | null;
    phone: string | null;
    message: string | null;
    source: string;
    serviceInterest: string | null;
    estimatedBudget: string | null;
  };
}) {
  return (
    <section>
      <details className="group rounded-xl border border-black/10 p-5">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span className="font-serif text-xl tracking-tightest">
            Edit lead
          </span>
          <span className="text-xs text-black/50 group-open:hidden">Open</span>
          <span className="text-xs text-black/50 hidden group-open:inline">
            Close
          </span>
        </summary>

        <form action={updateLeadAction} className="mt-5 flex flex-col gap-4">
          <input type="hidden" name="id" value={lead.id} />
          <EditField
            name="fullName"
            label="Full name"
            defaultValue={lead.fullName}
            required
          />
          <EditField
            name="email"
            label="Email"
            type="email"
            defaultValue={lead.email}
            required
          />
          <EditField
            name="company"
            label="Company"
            defaultValue={lead.company ?? ""}
          />
          <EditField
            name="phone"
            label="Phone"
            defaultValue={lead.phone ?? ""}
          />
          <EditSelect
            name="serviceInterest"
            label="Service interest"
            defaultValue={lead.serviceInterest ?? ""}
            options={SERVICE_INTERESTS as readonly string[]}
            allowBlank
          />
          <EditSelect
            name="estimatedBudget"
            label="Estimated budget"
            defaultValue={lead.estimatedBudget ?? ""}
            options={BUDGET_RANGES as readonly string[]}
            allowBlank
          />
          <EditField
            name="message"
            label="Message"
            defaultValue={lead.message ?? ""}
            textarea
          />
          <EditSelect
            name="source"
            label="Source"
            defaultValue={lead.source}
            options={LEAD_SOURCES as readonly string[]}
          />
          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </details>
    </section>
  );
}

function EditField({
  name,
  label,
  defaultValue,
  type = "text",
  textarea,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          required={required}
          className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          className="bg-transparent border border-black/15 rounded-lg px-3 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
      )}
    </label>
  );
}

function EditSelect({
  name,
  label,
  defaultValue,
  options,
  allowBlank,
}: {
  name: string;
  label: string;
  defaultValue: string;
  options: readonly string[];
  allowBlank?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
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

function DangerZone({ id }: { id: string }) {
  return (
    <section>
      <details className="rounded-xl border border-red-200 p-5">
        <summary className="cursor-pointer list-none text-sm text-red-700">
          Delete lead…
        </summary>
        <form action={deleteLeadAction} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <p className="text-sm text-black/70 mb-3">
            This permanently deletes the lead, its notes, and its activity
            history. This cannot be undone.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700 transition-colors"
          >
            Delete permanently
          </button>
        </form>
      </details>
    </section>
  );
}
