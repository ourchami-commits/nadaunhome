import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "나다운 AI활용 창작 워크룸";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#FDF6EE",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* 배경 원 장식 */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "#3D6B4F",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "200px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "#E8956D",
            opacity: 0.6,
          }}
        />

        {/* 브랜드 태그 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#3D6B4F",
              color: "#FDF6EE",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "100px",
            }}
          >
            나다운 AI활용 창작 워크룸
          </div>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#1C1C1A",
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          누구나 자신의 이야기를
          <br />
          나다운 작품으로
        </div>

        {/* 서브 텍스트 */}
        <div
          style={{
            fontSize: "28px",
            color: "#6B6B6B",
            lineHeight: 1.5,
          }}
        >
          AI 몰라도 괜찮아요 · 그림책 · 영상 · 시집 출판
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            fontSize: "20px",
            color: "#3D6B4F",
            fontWeight: 600,
          }}
        >
          nadaunhome.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
