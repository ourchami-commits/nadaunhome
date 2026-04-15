import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const snapshot = await db.collection("settings").get();
  const settings: Record<string, string> = {};
  snapshot.docs.forEach((doc) => {
    settings[doc.id] = doc.data().value;
  });
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const body = await req.json();
  const batch = db.batch();

  for (const [key, value] of Object.entries(body)) {
    const ref = db.collection("settings").doc(key);
    batch.set(ref, { value, updatedAt: new Date() }, { merge: true });
  }

  await batch.commit();
  return NextResponse.json({ success: true });
}
