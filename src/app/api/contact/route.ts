import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, type, message } = await req.json();

    // Save to Firestore
    await db.collection("inquiries").add({
      name,
      email,
      phone,
      type,
      message,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Read notification email from Firestore settings
    const settingDoc = await db.collection("settings").doc("site_contact_email").get();
    const notifyEmail = settingDoc.exists ? (settingDoc.data()?.value as string) : "ourchami@gmail.com";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "나다운 AI창작 워크룸 <onboarding@resend.dev>",
      to: [notifyEmail],
      subject: `[문의] ${type} — ${name}님`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #3D6B4F; margin-bottom: 24px;">새 문의가 접수되었습니다</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #6B6B6B; width: 100px;">이름</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #1C1C1A;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #6B6B6B;">이메일</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #1C1C1A;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #6B6B6B;">연락처</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #1C1C1A;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #6B6B6B;">문의 유형</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5E0D8; color: #1C1C1A;">${type}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="color: #6B6B6B; margin-bottom: 8px;">문의 내용</p>
            <div style="background: #FDF6EE; border-radius: 12px; padding: 16px; color: #1C1C1A; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="margin-top: 24px; color: #6B6B6B; font-size: 13px;">
            나다운 AI활용 창작 워크룸 문의 시스템
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Add to Stibee address book
    await fetch("https://api.stibee.com/v1/lists/479296/subscribers", {
      method: "POST",
      headers: {
        AccessToken: process.env.STIBEE_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventOccuredBy: "SUBSCRIBER",
        confirmEmailYN: "N",
        subscribers: [{ email, name }],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
