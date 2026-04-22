import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import LeadFilters from "@/components/admin/LeadFilters";
import StatusBadge from "@/components/admin/StatusBadge";
import PriorityBadge from "@/components/admin/PriorityBadge";
import TemperatureBadge from "@/components/admin/TemperatureBadge";
import { listLeads } from "@/lib/leads";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  status?: string;
  priority?: string;
  source?: string;
  temperature?: string;
  from?: string;
  to?: string;
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const leads = await listLeads(searchParams);

  return (
    <>
      <PageHeader
        eyebrow={`${leads.length} result${leads.length === 1 ? "" : "s"}`}
        title="Leads"
        description="Every contact in the pipeline. Filter, search, or open one to update its stage."
        actions={
          <Link
            href="/admin/leads/new"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            + New lead
          </Link>
        }
      />

      <div className="px-6 md:px-10 py-8 flex flex-col gap-6">
        <LeadFilters defaults={searchParams} />

        {leads.length === 0 ? (
          <div className="border border-dashed border-black/15 rounded-xl p-10 text-center">
            <p className="font-serif text-2xl tracking-tightest">
              No leads match those filters.
            </p>
            <p className="mt-2 text-sm text-black/60">
              Try clearing filters or create a new lead.
            </p>
          </div>
        ) : (
          <div className="border border-black/10 rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-paper-muted text-black/60">
                <tr className="text-left">
                  <Th>Name</Th>
                  <Th>Company</Th>
                  <Th>Stage</Th>
                  <Th>Temp</Th>
                  <Th>Priority</Th>
                  <Th>Source</Th>
                  <Th>Next follow-up</Th>
                  <Th>Created</Th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
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
                    <Td>{lead.company || "—"}</Td>
                    <Td>
                      <StatusBadge status={lead.status} />
                    </Td>
                    <Td>
                      <TemperatureBadge temperature={lead.temperature} />
                    </Td>
                    <Td>
                      <PriorityBadge priority={lead.priority} />
                    </Td>
                    <Td className="text-black/60">{lead.source}</Td>
                    <Td className="text-black/60">
                      {lead.nextFollowUpAt
                        ? formatDate(lead.nextFollowUpAt)
                        : "—"}
                    </Td>
                    <Td className="text-black/60">
                      {formatDate(lead.createdAt)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-black/40">
          Showing up to 200 most recent results.
        </p>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-normal text-xs uppercase tracking-[0.18em]">
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
