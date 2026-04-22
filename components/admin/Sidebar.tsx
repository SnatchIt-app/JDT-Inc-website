"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Leads", href: "/admin/leads" },
  { label: "New lead", href: "/admin/leads/new" },
];

export default function Sidebar({
  user,
}: {
  user: { email: string; name?: string | null };
}) {
  const pathname = usePathname();

  return (
    <aside className="md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-black/10 md:bg-paper flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 flex items-center justify-between md:justify-start md:gap-3 border-b border-black/10 md:border-b-0">
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium tracking-[0.08em] uppercase"
        >
          JDT Inc.
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="md:flex-1 md:flex md:flex-col md:px-3 md:py-4 overflow-x-auto md:overflow-visible">
        <ul className="flex md:flex-col gap-1 px-3 md:px-0 pb-4 md:pb-0 whitespace-nowrap">
          {NAV.map((item) => {
            const active =
              item.href === "/admin/leads"
                ? pathname.startsWith(item.href) &&
                  pathname !== "/admin/leads/new"
                : pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm transition-colors",
                    active
                      ? "bg-ink text-paper"
                      : "text-black/70 hover:bg-paper-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="hidden md:flex flex-col gap-3 border-t border-black/10 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">
            Signed in
          </p>
          <p className="mt-1 text-sm truncate">
            {user.name || user.email}
          </p>
          {user.name && (
            <p className="text-xs text-black/50 truncate">{user.email}</p>
          )}
        </div>
        <form action="/admin/logout" method="post">
          <button
            type="submit"
            className="w-full text-left text-sm text-black/60 hover:text-ink transition-colors"
          >
            Sign out →
          </button>
        </form>
      </div>
    </aside>
  );
}
