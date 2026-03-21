import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase";
import { getSession } from "@/lib/session";

const ALLOWED_EMAIL = process.env.ALLOWED_ADMIN_EMAIL;

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: "토큰이 없습니다." }, { status: 400 });
  }

  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: "유효하지 않은 토큰입니다." }, { status: 401 });
  }

  const email = decodedToken.email;

  if (!email || email !== ALLOWED_EMAIL) {
    return NextResponse.json(
      { error: "접근 권한이 없는 계정입니다." },
      { status: 403 }
    );
  }

  const session = await getSession();
  session.isAdmin = true;
  session.email = email;
  await session.save();

  return NextResponse.json({ success: true });
}
