import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signIn } from "./actions";

export const metadata: Metadata = {
  title: "Admin · Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  // If already signed in, send to the dashboard.
  const session = await getSession();
  if (session) redirect(searchParams.next || "/admin/dashboard");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            JDT Inc. · Admin
          </p>
          <h1 className="mt-6 font-serif text-5xl tracking-tightest leading-[0.95]">
            Sign in.
          </h1>
          <p className="mt-4 text-sm text-black/60">
            Protected area. Authorized operators only.
          </p>
        </div>

        <form action={signIn} className="flex flex-col gap-6">
          <input type="hidden" name="next" value={searchParams.next ?? ""} />

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black/50">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="bg-transparent border-b border-black/20 py-3 text-base focus:border-ink focus:outline-none transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-black/50">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="bg-transparent border-b border-black/20 py-3 text-base focus:border-ink focus:outline-none transition-colors"
            />
          </label>

          {searchParams.error && (
            <p className="text-sm text-red-600">
              {searchParams.error === "invalid"
                ? "Incorrect email or password."
                : "Something went wrong. Try again."}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Sign in
            <span aria-hidden>→</span>
          </button>
        </form>

        <p className="text-center mt-10 text-xs text-black/40">
          © JDT Inc.
        </p>
      </div>
    </div>
  );
}
