import { PRIORITY_DOT, type LeadPriority } from "@/lib/crm";
import { cn } from "@/lib/cn";

export default function PriorityBadge({ priority }: { priority: string }) {
  const dot = PRIORITY_DOT[priority as LeadPriority] ?? "bg-zinc-400";
  return (
    <span className="inline-flex items-center gap-2 text-xs text-black/70">
      <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
      {priority}
    </span>
  );
}
