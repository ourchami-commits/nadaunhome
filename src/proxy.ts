import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

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
