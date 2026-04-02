import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";

interface SessionData {
  isAdmin?: boolean;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req, res, {
      password: process.env.SESSION_SECRET as string,
      cookieName: "nadaun-admin-session",
    });

    if (!session.isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
