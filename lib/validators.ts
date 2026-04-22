import { z } from "zod";
import {
  BUDGET_RANGES,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STAGES,
  LEAD_TEMPERATURES,
  SERVICE_INTERESTS,
} from "./crm";

/**
 * Helpers.
 * - `optionalString`: allows missing or empty-string, normalises to undefined.
 * - `optionalDate`: accepts "" or yyyy-mm-dd and returns a Date | null.
 */
const optionalString = (max = 200) =>
  z
    .string()
    .max(max)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v && v.length > 0 ? v : undefined));

const optionalDate = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((v) => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  });

/** Public contact form (submitted by website visitors). */
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Enter a valid email").max(200),
  company: optionalString(200),
  phone: optionalString(60),
  serviceInterest: z
    .enum(SERVICE_INTERESTS)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof SERVICE_INTERESTS)[number]) : undefined)),
  estimatedBudget: z
    .enum(BUDGET_RANGES)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof BUDGET_RANGES)[number]) : undefined)),
  message: optionalString(5000),
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

/** Manual lead creation from the admin dashboard. */
export const newLeadSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  company: optionalString(200),
  phone: optionalString(60),
  message: optionalString(5000),
  source: z.enum(LEAD_SOURCES).default("Manual Entry"),
  status: z.enum(LEAD_STAGES).default("New"),
  priority: z.enum(LEAD_PRIORITIES).default("Medium"),
  temperature: z.enum(LEAD_TEMPERATURES).default("Cold"),
  serviceInterest: z
    .enum(SERVICE_INTERESTS)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof SERVICE_INTERESTS)[number]) : undefined)),
  estimatedBudget: z
    .enum(BUDGET_RANGES)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof BUDGET_RANGES)[number]) : undefined)),
  nextFollowUpAt: optionalDate,
});
export type NewLeadInput = z.infer<typeof newLeadSchema>;

/** Full edit of a lead's core fields. */
export const updateLeadSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  company: optionalString(200),
  phone: optionalString(60),
  message: optionalString(5000),
  source: z.enum(LEAD_SOURCES),
  serviceInterest: z
    .enum(SERVICE_INTERESTS)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof SERVICE_INTERESTS)[number]) : undefined)),
  estimatedBudget: z
    .enum(BUDGET_RANGES)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? (v as (typeof BUDGET_RANGES)[number]) : undefined)),
});
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

export const statusSchema = z.enum(LEAD_STAGES);
export const prioritySchema = z.enum(LEAD_PRIORITIES);
export const temperatureSchema = z.enum(LEAD_TEMPERATURES);

/** "Mark contacted" — no body, just stamps `lastContactedAt = now`. */
export const contactedSchema = z.object({
  // Optional explicit datetime; if empty we use now() server-side.
  at: optionalDate,
});

/** Set or clear the next follow-up date. Empty string clears it. */
export const followUpSchema = z.object({
  nextFollowUpAt: optionalDate,
});

export const noteSchema = z.object({
  body: z.string().min(1, "Note cannot be empty").max(5000),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
