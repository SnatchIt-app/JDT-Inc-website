import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

/** POST or GET /admin/logout → clears session and redirects to login. */
export async function POST(req: Request) {
  clearSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export async function GET(req: Request) {
  clearSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
