"use client";

import { motion } from "framer-motion";

function Spark({ className, color, size = "w-4 h-4" }: { className: string; color: string; size?: string }) {
  return (
    <svg className={`absolute ${size} ${className}`} style={{ color }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}

export default function FinalCTA({ heading, subtitle, buttonUrl }: { heading?: string; subtitle?: string; buttonUrl?: string }) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "#7A8B6A" }}
    >
      {/* 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Spark className="top-10 left-16" color="rgba(255,255,255,0.25)" size="w-5 h-5" />
        <Spark className="top-16 right-32" color="rgba(255,255,255,0.15)" size="w-3 h-3" />
        <Spark className="bottom-16 left-1/4" color="rgba(255,255,255,0.20)" size="w-4 h-4" />
        <Spark className="bottom-12 right-20" color="rgba(255,255,255,0.15)" size="w-6 h-6" />
        <Spark className="top-1/2 right-12" color="rgba(255,255,255,0.12)" size="w-3 h-3" />
        <div className="absolute top-1/3 left-10 w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
        <div className="absolute bottom-1/3 right-1/3 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
        <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.20)" }} />
      </div>

      <div className="relative section-inner text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium mb-5 tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
            나다운 AI활용 창작 워크룸
          </p>

          <h2 className="font-heading font-bold text-white text-2xl md:text-4xl mb-5 leading-tight">
            {heading || "쉽고 즐겁게 창작을 시작해보세요"}
          </h2>

          <p className="text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            {subtitle || "클래스 안내와 모집 소식을 가장 먼저 받아볼 수 있는 나다운 AI활용 창작 워크룸 정보 공유방을 운영하고 있어요."}
          </p>

          <a
            href={buttonUrl || "#"}
            target={buttonUrl ? "_blank" : undefined}
            rel={buttonUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base transition-colors"
            style={{ backgroundColor: "#3D6B35" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2E5229")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3D6B35")}
          >
            정보 공유방 들어가기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
