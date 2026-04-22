"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import {
  contactedSchema,
  followUpSchema,
  noteSchema,
  prioritySchema,
  statusSchema,
  temperatureSchema,
  updateLeadSchema,
} from "@/lib/validators";
import {
  addNote,
  changePriority,
  changeStatus,
  changeTemperature,
  deleteLead,
  markContacted,
  setFollowUp,
  updateLead,
} from "@/lib/leads";

async function requireAuthorId() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return String(session.sub);
}

export async function updateStatusAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  const parsed = statusSchema.safeParse(formData.get("status"));
  if (!id || !parsed.success) return;
  await changeStatus(id, parsed.data, { authorId });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
}

export async function updatePriorityAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  const parsed = prioritySchema.safeParse(formData.get("priority"));
  if (!id || !parsed.success) return;
  await changePriority(id, parsed.data, { authorId });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function updateTemperatureAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  const parsed = temperatureSchema.safeParse(formData.get("temperature"));
  if (!id || !parsed.success) return;
  await changeTemperature(id, parsed.data, { authorId });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
}

/**
 * One-click "I just reached out" — stamps `lastContactedAt = now`.
 * If the form carries a non-empty `at`, we use that date instead.
 */
export async function markContactedAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const parsed = contactedSchema.safeParse({ at: formData.get("at") ?? "" });
  const at = parsed.success ? parsed.data.at : null;
  await markContacted(id, { authorId, at });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/dashboard");
}

/** Set or clear the next follow-up date. Empty string clears it. */
export async function setFollowUpAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  if (!id) return;
  const parsed = followUpSchema.safeParse({
    nextFollowUpAt: formData.get("nextFollowUpAt") ?? "",
  });
  const next = parsed.success ? parsed.data.nextFollowUpAt : null;
  await setFollowUp(id, next, { authorId });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/dashboard");
}

export async function addNoteAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  const parsed = noteSchema.safeParse({ body: formData.get("body") });
  if (!id || !parsed.success) return;
  await addNote(id, parsed.data.body, { authorId });
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadAction(formData: FormData) {
  const authorId = await requireAuthorId();
  const id = String(formData.get("id") || "");
  const parsed = updateLeadSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
    source: formData.get("source"),
    serviceInterest: formData.get("serviceInterest") ?? "",
    estimatedBudget: formData.get("estimatedBudget") ?? "",
  });
  if (!id || !parsed.success) return;
  await updateLead(id, parsed.data, { authorId });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAuthorId();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await deleteLead(id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  redirect("/admin/leads");
}
