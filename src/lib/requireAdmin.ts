import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function requireAdmin(): Promise<{ error: NextResponse } | null> {
  const session = await getSession();
  if (!session.isAdmin) {
    return { error: NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 }) };
  }
  return null;
}
