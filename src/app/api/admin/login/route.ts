import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // Check Firestore for overridden password first
  const doc = await db.collection("settings").doc("admin_password").get();
  const validPassword = doc.exists ? doc.data()?.value : process.env.ADMIN_PASSWORD;

  if (password !== validPassword) {
    return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ success: true });
}
