import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already verified the JWT — this is belt & suspenders + loads
  // the admin record so the sidebar can render their email.
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admin = await prisma.admin.findUnique({
    where: { id: String(session.sub) },
    select: { email: true, name: true },
  });
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Sidebar user={admin} />
      <div className="md:pl-64">{children}</div>
    </div>
  );
}
