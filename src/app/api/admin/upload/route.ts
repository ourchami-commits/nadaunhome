import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `portfolio/${Date.now()}.${ext}`;

  const bucket = storage.bucket();
  const fileRef = bucket.file(filename);

  await fileRef.save(buffer, { contentType: file.type });
  await fileRef.makePublic();

  const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;
  return NextResponse.json({ url });
}
