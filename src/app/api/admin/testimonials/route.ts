import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  const snapshot = await db
    .collection("testimonials")
    .orderBy("sortOrder", "asc")
    .get();

  const testimonials = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  }));

  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const ref = await db.collection("testimonials").add({
    ...data,
    visible: true,
    sortOrder: 0,
    createdAt: FieldValue.serverTimestamp(),
  });
  return NextResponse.json({ id: ref.id });
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  await db.collection("testimonials").doc(id).update(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await db.collection("testimonials").doc(id).delete();
  return NextResponse.json({ success: true });
}
