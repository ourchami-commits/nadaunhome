import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const snapshot = await db
    .collection("portfolios")
    .orderBy("sortOrder", "asc")
    .get();

  const portfolios = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return NextResponse.json(portfolios);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const data = await req.json();
  const ref = await db.collection("portfolios").add({
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
  await db.collection("portfolios").doc(id).update(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth.error;

  const { id } = await req.json();
  await db.collection("portfolios").doc(id).delete();
  return NextResponse.json({ success: true });
}
