import "server-only";
import { Resend } from "resend";

/**
 * Resend client singleton.
 *
 * If `RESEND_API_KEY` is missing we return `null` and the rest of the
 * app treats notifications as disabled — useful for local dev and CI
 * where we don't want to send real email.
 */
let client: Resend | null | undefined;

export function getResend(): Resend | null {
  if (client !== undefined) return client;
  const key = process.env.RESEND_API_KEY;
  client = key ? new Resend(key) : null;
  return client;
}

/** Whether outbound email is configured in this environment. */
export function isEmailEnabled(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);
}
