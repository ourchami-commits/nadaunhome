import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const snapshot = await db
    .collection("inquiries")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();

  const inquiries = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return NextResponse.json(inquiries);
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const { id, read } = await req.json();
  await db.collection("inquiries").doc(id).update({ read });
  return NextResponse.json({ success: true });
}
