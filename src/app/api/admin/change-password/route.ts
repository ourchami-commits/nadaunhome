import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const { currentPassword, newPassword } = await req.json();

  const doc = await db.collection("settings").doc("admin_password").get();
  const storedPassword = doc.exists ? doc.data()?.value : process.env.ADMIN_PASSWORD;

  if (currentPassword !== storedPassword) {
    return NextResponse.json({ error: "현재 비밀번호가 틀렸습니다." }, { status: 401 });
  }

  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "새 비밀번호는 6자 이상이어야 합니다." }, { status: 400 });
  }

  await db.collection("settings").doc("admin_password").set({
    value: newPassword,
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
