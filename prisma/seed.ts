/**
 * Seed script — creates the first admin user and a few sample leads.
 * Run with: `npm run db:seed`
 * Env:
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME (optional overrides)
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Helper: yyyy-mm-dd offset from today, as a Date. */
function daysFromNow(days: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@jdtinc.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_NAME ?? "JDT Admin";

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { name },
    create: { email, name, passwordHash },
  });
  console.log(`✓ Admin ready: ${admin.email}`);

  const existing = await prisma.lead.count();
  if (existing > 0) {
    console.log(`• ${existing} leads already present — skipping sample leads.`);
    return;
  }

  const samples = [
    {
      fullName: "Alex Rivera",
      email: "alex@northstar.co",
      company: "Northstar Athletics",
      phone: "+1 305 555 0191",
      message:
        "Looking for help with a spring launch — performance ads + creative direction.",
      source: "Website Contact Form",
      status: "New",
      priority: "High",
      temperature: "Hot",
      serviceInterest: "Paid Media",
      estimatedBudget: "$10k–$25k/mo",
      nextFollowUpAt: daysFromNow(-1), // overdue — shows up in dashboard
    },
    {
      fullName: "Priya Patel",
      email: "priya@bloomskincare.com",
      company: "Bloom Skincare",
      phone: "+1 786 555 0123",
      message: "Our funnel is leaking. Need someone to audit and rebuild.",
      source: "Referral",
      status: "Contacted",
      priority: "Medium",
      temperature: "Warm",
      serviceInterest: "Full-Service Growth",
      estimatedBudget: "$5k–$10k/mo",
      lastContactedAt: daysFromNow(-2),
      nextFollowUpAt: daysFromNow(3),
    },
    {
      fullName: "Marcus Lee",
      email: "marcus@lakefrontmgmt.com",
      company: "Lakefront Management",
      message: "Interested in a brand + web refresh for our new verticals.",
      source: "Calendly",
      status: "Qualified",
      priority: "High",
      temperature: "Warm",
      serviceInterest: "Branding & Identity",
      estimatedBudget: "One-time project",
      lastContactedAt: daysFromNow(-5),
      nextFollowUpAt: daysFromNow(2),
    },
    {
      fullName: "Sofia Ramirez",
      email: "sofia@casacollective.io",
      company: "Casa Collective",
      message: "Paid media lead for Q3. Budget ~$25k/mo.",
      source: "Meta Ads",
      status: "Proposal Sent",
      priority: "High",
      temperature: "Hot",
      serviceInterest: "Paid Media",
      estimatedBudget: "$25k+/mo",
      lastContactedAt: daysFromNow(-1),
      nextFollowUpAt: daysFromNow(1),
    },
    {
      fullName: "Jordan Kim",
      email: "jordan@drydockdrinks.com",
      company: "Drydock Drinks",
      message: "Won — launching June 1.",
      source: "Website Contact Form",
      status: "Won",
      priority: "Medium",
      temperature: "Warm",
      serviceInterest: "Web Design & Development",
      estimatedBudget: "$10k–$25k/mo",
      lastContactedAt: daysFromNow(-7),
    },
  ];

  for (const s of samples) {
    await prisma.lead.create({
      data: {
        ...s,
        activities: {
          create: { type: "lead_created", meta: { source: s.source } },
        },
      },
    });
  }
  console.log(`✓ Seeded ${samples.length} sample leads.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
