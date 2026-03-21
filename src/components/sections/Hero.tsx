"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ heroSubtitle }: { heroSubtitle?: string }) {
  return (
    <section className="relative bg-bg overflow-hidden">

      {/* ── 모바일: 텍스트 + 원형 이미지 나란히 ── */}
      <div className="sm:hidden">
        <div className="section-inner pt-[6.5rem] pb-10">

          {/* 브랜드 라벨 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-cream border border-border rounded-full px-4 py-1.5 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm font-medium text-dark">나다운 AI활용 창작 워크룸</span>
          </motion.div>

          {/* 헤드라인 + 원형 이미지 */}
          <div className="flex items-center gap-4 mb-3">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-dark text-3xl font-bold leading-[1.2] flex-1"
            >
              내 이야기가<br />
              <span className="text-primary">나다운 작품</span>으로<br />
              완성됩니다
            </motion.h1>

            {/* 원형 이미지 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 relative shadow-card"
            >
              <Image
                src="/images/hero-mobile.png"
                alt="나다운 AI창작 워크룸 수업 장면"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>

          {/* 보조 설명 */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-subtext text-base leading-relaxed mb-6"
          >
            {heroSubtitle || <>AI를 몰라도 괜찮아요.<br />그림책·영상을 직접 완성하는 창작형 AI 교육입니다.</>}
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-2.5"
          >
            <a
              href="#classes"
              className="btn w-full"
              style={{ backgroundColor: "#C9E3B2", color: "#2D3540", boxShadow: "var(--shadow-card)", minHeight: "48px", padding: "0.75rem 1.75rem" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#B0D098")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C9E3B2")}
            >
              클래스 살펴보기
            </a>
            <a href="#contact" className="btn btn-soft w-full" style={{ minHeight: "48px", padding: "0.75rem 1.75rem" }}>
              기관 특강 문의
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── 데스크톱: 배경 이미지 + 텍스트 좌측 ── */}
      <div
        className="hidden sm:block relative"
        style={{ height: "calc(100vw * 1344 / 3168)", minHeight: "580px", maxHeight: "90vh" }}
      >
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg-v2.png"
            alt="나다운 AI창작 워크룸 수업 장면"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #FFFEFB 36%, rgba(255,254,251,0.75) 52%, rgba(255,254,251,0) 70%)" }}
          />
        </div>

        {/* 텍스트 */}
        <div className="relative section-inner h-full flex items-center" style={{ paddingTop: "5.5rem" }}>
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-cream border border-border rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm font-medium text-dark">나다운 AI활용 창작 워크룸</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-dark text-5xl lg:text-[3.25rem] font-bold leading-[1.2] mb-6"
            >
              내 이야기가<br />
              <span className="text-primary">나다운 작품</span>으로<br />
              완성됩니다
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-subtext text-lg leading-relaxed mb-10"
            >
              {heroSubtitle || <>AI를 몰라도 괜찮아요.<br />그림책·영상을 직접 완성하는 창작형 AI 교육입니다.</>}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-row gap-2.5"
            >
              <a
                href="#classes"
                className="btn"
                style={{ backgroundColor: "#C9E3B2", color: "#2D3540", boxShadow: "var(--shadow-card)", minHeight: "48px", padding: "0.75rem 1.75rem" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#B0D098")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C9E3B2")}
              >
                클래스 살펴보기
              </a>
              <a href="#contact" className="btn btn-soft" style={{ minHeight: "48px", padding: "0.75rem 1.75rem" }}>
                기관 특강 문의
              </a>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
