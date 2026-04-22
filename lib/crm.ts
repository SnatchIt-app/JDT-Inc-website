/**
 * Central list of CRM constants.
 * Edit here to add/rename stages, priorities, sources, temperatures, etc.
 * Values are stored as strings in the DB — no migration required.
 */

export const LEAD_STAGES = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

export const LEAD_PRIORITIES = ["Low", "Medium", "High"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];

export const LEAD_SOURCES = [
  "Website Contact Form",
  "Calendly",
  "Manual Entry",
  "Referral",
  "Meta Ads",
  "Google Ads",
  "Other",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

/**
 * Lead temperature — used for quick sales triage.
 * Cold: hasn't engaged yet.
 * Warm: replying, interested, not ready to buy.
 * Hot:  ready-to-close — show up on dashboard and follow up today.
 */
export const LEAD_TEMPERATURES = ["Cold", "Warm", "Hot"] as const;
export type LeadTemperature = (typeof LEAD_TEMPERATURES)[number];

/**
 * Service interests match the offering on the public marketing site.
 * Keep in sync with `lib/services.ts` headings when they change.
 */
export const SERVICE_INTERESTS = [
  "Paid Media",
  "Branding & Identity",
  "Web Design & Development",
  "SEO & Content",
  "Creative Production",
  "Full-Service Growth",
  "Not sure yet",
] as const;
export type ServiceInterest = (typeof SERVICE_INTERESTS)[number];

/** Budget bands used on the contact form + lead detail page. */
export const BUDGET_RANGES = [
  "Under $2k/mo",
  "$2k–$5k/mo",
  "$5k–$10k/mo",
  "$10k–$25k/mo",
  "$25k+/mo",
  "One-time project",
  "Not sure yet",
] as const;
export type BudgetRange = (typeof BUDGET_RANGES)[number];

// Colors used by the UI for the small dot next to each stage.
export const STAGE_DOT: Record<LeadStage, string> = {
  New: "bg-black",
  Contacted: "bg-zinc-400",
  Qualified: "bg-black",
  "Proposal Sent": "bg-zinc-600",
  Won: "bg-emerald-500",
  Lost: "bg-red-500",
};

export const PRIORITY_DOT: Record<LeadPriority, string> = {
  Low: "bg-zinc-300",
  Medium: "bg-zinc-500",
  High: "bg-red-500",
};

export const TEMPERATURE_DOT: Record<LeadTemperature, string> = {
  Cold: "bg-sky-400",
  Warm: "bg-amber-400",
  Hot: "bg-red-500",
};

/** Activity types used in the Activity table `type` column. */
export const ACTIVITY = {
  leadCreated: "lead_created",
  statusChanged: "status_changed",
  priorityChanged: "priority_changed",
  temperatureChanged: "temperature_changed",
  noteAdded: "note_added",
  leadUpdated: "lead_updated",
  contacted: "contacted",
  followUpScheduled: "follow_up_scheduled",
  followUpCleared: "follow_up_cleared",
} as const;
export type ActivityType = (typeof ACTIVITY)[keyof typeof ACTIVITY];
