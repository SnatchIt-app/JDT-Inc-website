/**
 * Minimal classNames helper — no extra dependency required.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
