import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenEdge, SESSION_COOKIE } from "@/lib/auth-edge";

/**
 * Protects /admin/* — anyone without a valid session is redirected to
 * /admin/login. The login page itself and the logout endpoint are public.
 */
export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public admin endpoints
  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionTokenEdge(token) : null;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
