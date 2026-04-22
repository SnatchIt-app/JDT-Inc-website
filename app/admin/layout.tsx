/**
 * Admin root layout — no marketing chrome.
 * Each nested segment provides its own visual shell:
 *   - /admin/login                       → bare centered card
 *   - /admin/(authed)/...                → sidebar + main layout
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-paper text-ink">{children}</div>;
}
