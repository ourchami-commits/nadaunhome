import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const snapshot = await db
    .collection("faqs")
    .orderBy("sortOrder", "asc")
    .get();

  const faqs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(faqs);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const data = await req.json();
  const ref = await db.collection("faqs").add({
    ...data,
    visible: true,
    sortOrder: 0,
    createdAt: FieldValue.serverTimestamp(),
  });
  return NextResponse.json({ id: ref.id });
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const { id, ...data } = await req.json();
  await db.collection("faqs").doc(id).update(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const { id } = await req.json();
  await db.collection("faqs").doc(id).delete();
  return NextResponse.json({ success: true });
}
