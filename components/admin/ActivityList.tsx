import { ACTIVITY } from "@/lib/crm";
import { timeAgo } from "@/lib/format";

type ActivityItem = {
  id: string;
  type: string;
  meta: unknown;
  createdAt: Date | string;
  author?: { name: string | null; email: string } | null;
};

export default function ActivityList({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-black/50">No activity yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((a) => (
        <li key={a.id} className="flex gap-4">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/40 shrink-0"
            aria-hidden
          />
          <div className="flex-1">
            <p className="text-sm">
              {describe(a.type, a.meta)}
              {a.author && (
                <span className="text-black/50">
                  {" "}
                  · {a.author.name || a.author.email}
                </span>
              )}
            </p>
            <p className="text-xs text-black/40 mt-0.5">
              {timeAgo(a.createdAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function describe(type: string, meta: unknown): string {
  const m = (meta ?? {}) as Record<string, unknown>;
  switch (type) {
    case ACTIVITY.leadCreated:
      return `Lead created${m.source ? ` (${m.source})` : ""}`;
    case ACTIVITY.statusChanged:
      return `Stage changed: ${m.from ?? "?"} → ${m.to ?? "?"}`;
    case ACTIVITY.priorityChanged:
      return `Priority changed: ${m.from ?? "?"} → ${m.to ?? "?"}`;
    case ACTIVITY.temperatureChanged:
      return `Temperature changed: ${m.from ?? "?"} → ${m.to ?? "?"}`;
    case ACTIVITY.noteAdded:
      return "Note added";
    case ACTIVITY.leadUpdated:
      return "Lead details updated";
    case ACTIVITY.contacted:
      return "Marked contacted";
    case ACTIVITY.followUpScheduled:
      return typeof m.at === "string"
        ? `Follow-up scheduled for ${new Date(m.at).toLocaleDateString()}`
        : "Follow-up scheduled";
    case ACTIVITY.followUpCleared:
      return "Follow-up cleared";
    default:
      return type.replace(/_/g, " ");
  }
}
