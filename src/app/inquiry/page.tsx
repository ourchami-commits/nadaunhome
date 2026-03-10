import Link from "next/link";

export default function InquiryComplete() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="font-heading text-dark text-2xl md:text-3xl font-bold mb-4">
          문의가 접수되었습니다!
        </h1>
        <p className="text-subtext text-base md:text-lg leading-relaxed mb-8">
          소중한 문의 감사합니다.<br />
          1~2일 내로 답변 드리겠습니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
