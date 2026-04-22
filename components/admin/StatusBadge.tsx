import { STAGE_DOT, type LeadStage } from "@/lib/crm";
import { cn } from "@/lib/cn";

export default function StatusBadge({ status }: { status: string }) {
  const dot = STAGE_DOT[status as LeadStage] ?? "bg-zinc-400";
  return (
    <span className="inline-flex items-center gap-2 border border-black/15 rounded-full px-2.5 py-1 text-xs">
      <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
      {status}
    </span>
  );
}
