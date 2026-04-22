import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { createLead } from "@/lib/leads";

/**
 * POST /api/contact
 * Public endpoint called by the website contact form.
 * Creates a Lead record with source "Website Contact Form".
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    await createLead({
      fullName: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      phone: parsed.data.phone,
      message: parsed.data.message,
      serviceInterest: parsed.data.serviceInterest,
      estimatedBudget: parsed.data.estimatedBudget,
      source: "Website Contact Form",
      status: "New",
      priority: "Medium",
      temperature: "Cold",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 }
    );
  }
}
