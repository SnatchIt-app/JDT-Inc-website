import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import PriorityBadge from "@/components/admin/PriorityBadge";
import TemperatureBadge from "@/components/admin/TemperatureBadge";
import { getDashboardStats } from "@/lib/leads";
import { LEAD_STAGES } from "@/lib/crm";
import { formatDate, timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Admin · Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Everything in motion across the pipeline."
        actions={
          <Link
            href="/admin/leads/new"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            + New lead
          </Link>
        }
      />

      <div className="px-6 md:px-10 py-10">
        {/* Top row: sales-first KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="New leads"
            value={stats.newCount}
            hint="Awaiting first touch"
            dark
          />
          <StatCard
            label="Hot leads"
            value={stats.temperatureCounts["Hot"] ?? 0}
            hint="Ready to close"
          />
          <StatCard
            label="Overdue follow-ups"
            value={stats.overdue.length}
            hint="Due today or earlier"
          />
          <StatCard
            label="Won this month"
            value={stats.wonThisMonth}
            hint="Since 1st of month"
          />
        </div>

        {/* Secondary row: totals + pipeline snapshot */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total leads" value={stats.total} />
          <StatCard
            label="New this week"
            value={stats.thisWeek}
            hint="Last 7 days"
          />
          <StatCard
            label="In pipeline"
            value={
              (stats.statusCounts["New"] ?? 0) +
              (stats.statusCounts["Contacted"] ?? 0) +
              (stats.statusCounts["Qualified"] ?? 0) +
              (stats.statusCounts["Proposal Sent"] ?? 0)
            }
            hint="Active stages"
          />
          <StatCard
            label="Won (all time)"
            value={stats.statusCounts["Won"] ?? 0}
          />
        </div>

        {/* Overdue follow-ups */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section>
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-serif text-2xl tracking-tightest">
                Overdue follow-ups
              </h2>
              <Link
                href="/admin/leads"
                className="text-sm text-black/60 hover:text-ink link-underline"
              >
                All leads →
              </Link>
            </div>
            {stats.overdue.length === 0 ? (
              <p className="text-sm text-black/50 border border-dashed border-black/15 rounded-xl p-6">
                Inbox zero — no overdue follow-ups.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {stats.overdue.map((lead) => (
                  <li
                    key={lead.id}
                    className="border border-black/10 rounded-xl p-4 flex items-center gap-4 hover:bg-paper-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-medium hover:underline truncate block"
                      >
                        {lead.fullName}
                      </Link>
                      <p className="text-xs text-black/50 truncate">
                        {lead.company || lead.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={lead.status} />
                      <span className="text-xs text-red-600">
                        {lead.nextFollowUpAt
                          ? `${formatDate(lead.nextFollowUpAt)} · ${timeAgo(
                              lead.nextFollowUpAt
                            )}`
                          : "—"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Hot leads */}
          <section>
            <div className="flex items-end justify-between mb-4">
              <h2 className="font-serif text-2xl tracking-tightest">
                Hot leads
              </h2>
              <Link
                href="/admin/leads?temperature=Hot"
                className="text-sm text-black/60 hover:text-ink link-underline"
              >
                All hot →
              </Link>
            </div>
            {stats.hotLeads.length === 0 ? (
              <p className="text-sm text-black/50 border border-dashed border-black/15 rounded-xl p-6">
                No leads marked hot yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {stats.hotLeads.map((lead) => (
                  <li
                    key={lead.id}
                    className="border border-black/10 rounded-xl p-4 flex items-center gap-4 hover:bg-paper-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-medium hover:underline truncate block"
                      >
                        {lead.fullName}
                      </Link>
                      <p className="text-xs text-black/50 truncate">
                        {lead.company || lead.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <TemperatureBadge temperature={lead.temperature} />
                      <StatusBadge status={lead.status} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Stage breakdown */}
        <div className="mt-14">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-serif text-3xl tracking-tightest">
              Pipeline by stage
            </h2>
            <Link
              href="/admin/leads"
              className="text-sm text-black/60 hover:text-ink link-underline"
            >
              View all leads →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LEAD_STAGES.map((stage) => (
              <Link
                key={stage}
                href={`/admin/leads?status=${encodeURIComponent(stage)}`}
                className="p-4 rounded-xl border border-black/10 hover:bg-paper-muted transition-colors"
              >
                <StatusBadge status={stage} />
                <p className="mt-4 font-serif text-4xl tracking-tightest leading-none">
                  {stats.statusCounts[stage] ?? 0}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div className="mt-14">
          <h2 className="font-serif text-3xl tracking-tightest mb-4">
            Recent leads
          </h2>
          {stats.recent.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="border border-black/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-paper-muted text-black/60">
                  <tr className="text-left">
                    <Th>Name</Th>
                    <Th className="hidden md:table-cell">Company</Th>
                    <Th>Stage</Th>
                    <Th className="hidden md:table-cell">Temp</Th>
                    <Th className="hidden md:table-cell">Priority</Th>
                    <Th className="hidden sm:table-cell">Created</Th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-black/10 hover:bg-paper-muted transition-colors"
                    >
                      <Td>
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="font-medium hover:underline"
                        >
                          {lead.fullName}
                        </Link>
                        <p className="text-xs text-black/50">{lead.email}</p>
                      </Td>
                      <Td className="hidden md:table-cell">
                        {lead.company || "—"}
                      </Td>
                      <Td>
                        <StatusBadge status={lead.status} />
                      </Td>
                      <Td className="hidden md:table-cell">
                        <TemperatureBadge temperature={lead.temperature} />
                      </Td>
                      <Td className="hidden md:table-cell">
                        <PriorityBadge priority={lead.priority} />
                      </Td>
                      <Td className="hidden sm:table-cell text-black/60">
                        {formatDate(lead.createdAt)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 font-normal text-xs uppercase tracking-[0.18em] ${
        className ?? ""
      }`}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-4 ${className ?? ""}`}>{children}</td>;
}

function EmptyState() {
  return (
    <div className="border border-dashed border-black/15 rounded-xl p-10 text-center">
      <p className="font-serif text-2xl tracking-tightest">No leads yet.</p>
      <p className="mt-2 text-sm text-black/60">
        Submit the contact form to see leads land here — or add one manually.
      </p>
      <Link
        href="/admin/leads/new"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
      >
        + New lead
      </Link>
    </div>
  );
}
