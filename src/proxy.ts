import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login is always accessible
  if (pathname === "/admin/login") return NextResponse.next();

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("nadaun-admin-session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
