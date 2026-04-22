"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createSessionToken,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function signIn(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const next = String(formData.get("next") || "") || "/admin/dashboard";

  if (!parsed.success) {
    redirect(`/admin/login?error=invalid${next ? `&next=${next}` : ""}`);
  }

  const admin = await prisma.admin.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (!admin || !(await verifyPassword(parsed.data.password, admin.passwordHash))) {
    redirect(`/admin/login?error=invalid${next ? `&next=${next}` : ""}`);
  }

  const token = await createSessionToken({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
  });
  setSessionCookie(token);

  redirect(next);
}
