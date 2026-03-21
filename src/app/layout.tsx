import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const paperlogy = localFont({
  src: [
    { path: "../../public/fonts/Paperlogy-3Light.ttf",    weight: "300" },
    { path: "../../public/fonts/Paperlogy-4Regular.ttf",  weight: "400" },
    { path: "../../public/fonts/Paperlogy-5Medium.ttf",   weight: "500" },
    { path: "../../public/fonts/Paperlogy-6SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/Paperlogy-7Bold.ttf",     weight: "700" },
    { path: "../../public/fonts/Paperlogy-8ExtraBold.ttf",weight: "800" },
    { path: "../../public/fonts/Paperlogy-9Black.ttf",    weight: "900" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "나다운 AI활용 창작 워크룸 | AI 몰라도 그림책·영상 만들기",
  description:
    "AI를 몰라도 괜찮아요. 내 이야기로 그림책을 만들고 영상을 완성하는 창작형 AI 교육 브랜드, 나다운 AI활용 창작 워크룸입니다. 개인 클래스 · 기관 특강 모두 운영합니다.",
  keywords:
    "AI 그림책 만들기, AI 영상제작, AI 창작 교육, 중장년 AI 교육, 기관 AI 특강, 초보 AI 활용",
  openGraph: {
    title: "나다운 AI활용 창작 워크룸",
    description: "누구나 자신의 이야기를 꺼내어 나다운 작품으로 완성할 수 있도록",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "https://nadaunhome.vercel.app/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://nadaunhome.vercel.app/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={paperlogy.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
