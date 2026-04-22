"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { newLeadSchema } from "@/lib/validators";
import { createLead } from "@/lib/leads";

export async function createLeadAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const parsed = newLeadSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
    source: formData.get("source") || "Manual Entry",
    status: formData.get("status") || "New",
    priority: formData.get("priority") || "Medium",
    temperature: formData.get("temperature") || "Cold",
    serviceInterest: formData.get("serviceInterest") ?? "",
    estimatedBudget: formData.get("estimatedBudget") ?? "",
    nextFollowUpAt: formData.get("nextFollowUpAt") ?? "",
  });

  if (!parsed.success) {
    const params = new URLSearchParams({ error: "invalid" });
    redirect(`/admin/leads/new?${params.toString()}`);
  }

  const lead = await createLead(parsed.data, { authorId: String(session.sub) });

  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  redirect(`/admin/leads/${lead.id}`);
}
