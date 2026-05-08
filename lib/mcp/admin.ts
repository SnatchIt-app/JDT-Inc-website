import "server-only";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

/**
 * Service-account admin used to attribute writes coming through the MCP
 * server (note creation, status changes, etc.).
 *
 * Lookup order:
 *   1. Admin matching `MCP_ADMIN_EMAIL` (if set).
 *   2. Auto-created "MCP Agent" admin at the same email (created on first
 *      call so the activity log always shows a real `authorId`).
 *   3. First admin in the table — only used if `MCP_ADMIN_EMAIL` is unset.
 *
 * The auto-created admin gets a long random password it never uses; nothing
 * can log in as it because no one knows the password.
 */
let cachedAdminId: string | null = null;

export async function resolveMcpAdminId(): Promise<string> {
  if (cachedAdminId) return cachedAdminId;

  const email = process.env.MCP_ADMIN_EMAIL?.trim().toLowerCase();

  if (email) {
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      cachedAdminId = existing.id;
      return cachedAdminId;
    }
    // Auto-create the service admin so writes can attribute to it.
    const created = await prisma.admin.create({
      data: {
        email,
        name: "MCP Agent",
        passwordHash: await hashPassword(crypto.randomUUID() + crypto.randomUUID()),
      },
    });
    cachedAdminId = created.id;
    return cachedAdminId;
  }

  // No MCP_ADMIN_EMAIL — fall back to the first admin in the table.
  const fallback = await prisma.admin.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  if (!fallback) {
    throw new Error(
      "No admin user exists. Run `npm run db:seed` or set MCP_ADMIN_EMAIL."
    );
  }
  cachedAdminId = fallback.id;
  return cachedAdminId;
}
