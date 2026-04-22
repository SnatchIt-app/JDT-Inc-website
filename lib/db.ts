import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton — avoids creating a new client on every hot reload in dev.
 * In production (Vercel), each serverless invocation uses a fresh module scope
 * so this is still safe.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
