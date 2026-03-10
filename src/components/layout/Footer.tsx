export default function Footer() {
  return (
    <footer className="bg-cream border-t border-border">
      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-heading font-semibold text-dark text-xl mb-3">
              나다운 AI활용 창작 워크룸
            </p>
            <p className="text-subtext text-sm leading-relaxed">
              AI를 몰라도, 나다운 콘텐츠와 새로운 가능성을 만들 수 있도록 돕는 창작형 교육 브랜드입니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-dark mb-4">바로가기</p>
            <ul className="space-y-2 text-sm text-subtext">
              <li><a href="#classes" className="hover:text-primary transition-colors">클래스 소개</a></li>
              <li><a href="#instructor" className="hover:text-primary transition-colors">강사 소개</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">수강 후기</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">문의하기</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-dark mb-4">연락처</p>
            <ul className="space-y-2 text-sm text-subtext">
              <li>이메일: jpodo1@naver.com</li>
              <li>카카오 채널: 준비 중</li>
            </ul>
            <a
              href="#contact"
              className="mt-4 inline-block bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>

      {/* Business info */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
          <p className="text-xs text-subtext leading-relaxed">
            상호명: 메리문곡 &nbsp;|&nbsp; 대표자: 임주희 &nbsp;|&nbsp; 사업자등록번호: 327-58-00610 &nbsp;|&nbsp;
            통신판매업신고번호: 제2022-서울강남-03887호<br />
            주소: 서울시 강남구 영동대로 602, 6층 K189호 (삼성동, 삼성동미켈란107) &nbsp;|&nbsp; 이메일: jpodo1@naver.com
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/60">
            © 2025 나다운 AI활용 창작 워크룸. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/60">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
