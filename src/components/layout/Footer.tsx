import { db } from "@/lib/firebase";

async function getSettings() {
  try {
    const snap = await db.collection("settings").get();
    const s: Record<string, string> = {};
    snap.docs.forEach((doc) => { s[doc.id] = doc.data().value; });
    return s;
  } catch {
    return {};
  }
}

const FOOTER_BG   = "#3A3530";
const COPY_BG     = "#2E2A26";
const TEXT_PRIMARY = "#F0EBE3";
const TEXT_MUTED   = "#A09890";

export default async function Footer() {
  const settings = await getSettings();
  const contactEmail = settings["site_contact_email"] || "jpodo1@naver.com";
  const kakaoUrl = settings["site_kakao_url"] || "";

  return (
    <footer style={{ backgroundColor: FOOTER_BG }}>

      {/* 메인 푸터 */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* 브랜드 */}
          <div>
            <p className="font-heading font-bold text-lg mb-3" style={{ color: TEXT_PRIMARY }}>
              나다운 AI활용 창작 워크룸
            </p>
            <p className="text-sm leading-relaxed" style={{ color: TEXT_MUTED }}>
              누구나 창작의 즐거움을 경험하길<br />바라는 브랜드입니다.
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: TEXT_PRIMARY }}>바로가기</p>
            <ul className="space-y-2.5 text-sm" style={{ color: TEXT_MUTED }}>
              {[
                { label: "클래스 소개", href: "#classes" },
                { label: "대표 포트폴리오", href: "#portfolio" },
                { label: "수강 후기", href: "#testimonials" },
                { label: "자주 묻는 질문", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link"
                    style={{ color: TEXT_MUTED }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 문의 */}
          <div>
            <p className="text-sm font-semibold mb-4" style={{ color: TEXT_PRIMARY }}>문의하기</p>
            <ul className="space-y-2 text-sm" style={{ color: TEXT_MUTED }}>
              <li>{contactEmail}</li>
              <li>
                {kakaoUrl
                  ? <a href={kakaoUrl} target="_blank" rel="noopener noreferrer"
                      className="footer-link"
                      style={{ color: TEXT_MUTED }}
                    >카카오 채널 바로가기</a>
                  : "카카오 채널 준비 중"
                }
              </li>
              <li style={{ color: TEXT_MUTED }}>운영시간 · 월~금 10:00–18:00<br />(주말 및 공휴일 제외)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 사업자 정보 */}
      <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
          <p className="text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>
            상호명: 메리문곡 &nbsp;|&nbsp; 대표자: 임주희 &nbsp;|&nbsp; 사업자등록번호: 327-58-00610<br />
            통신판매업신고번호: 제2022-서울강남-03887호<br />
            주소: 서울시 강남구 영동대로 602, 6층 K189호 (삼성동, 삼성동미켈란107)<br />
            이메일: {contactEmail}
          </p>
        </div>
      </div>

      {/* 카피라이트 */}
      <div style={{ backgroundColor: COPY_BG }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2025 나다운 AI활용 창작 워크룸. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="#" className="footer-copy-link" style={{ color: "rgba(255,255,255,0.35)" }}>개인정보처리방침</a>
            <a href="#" className="footer-copy-link" style={{ color: "rgba(255,255,255,0.35)" }}>이용약관</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
