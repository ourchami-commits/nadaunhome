"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const values = [
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "초보도 시작할 수 있어요",
    description: "AI를 처음 접하는 분도, 스마트폰만 있으면 시작할 수 있습니다.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "내 이야기가 결과물이 됩니다",
    description: "경험과 감정을 그림책·영상·콘텐츠로 직접 완성합니다.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "취미를 넘어 새로운 역할로",
    description: "창작 경험이 성취감이 되고, 새로운 사회적 역할로 이어집니다.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "배움보다 완성이 먼저",
    description: "기능 설명보다 결과물 완성에 집중하는 커리큘럼.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "기관에서도 바로 쓸 수 있어요",
    description: "현장 경험 기반의 친절하고 실전적인 교육 설계.",
  },
];

export default function BrandValues() {
  return (
    <section className="bg-bg py-20 md:py-28 relative overflow-hidden" id="values">
      {/* 일러스트 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute bottom-12 right-6 w-20 h-20 text-point-green/30 rotate-[15deg]" fill="none" stroke="currentColor" strokeWidth={0.9} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <svg className="absolute top-16 left-6 w-10 h-10 text-soft-blue/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
        <div className="absolute top-1/3 right-4 w-5 h-5 rounded-full bg-secondary/30" />
      </div>
      <div className="section-inner relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header-lg"
        >
          <span className="label-tag label-tag-secondary">나다운 AI창작 워크룸이 다른 이유</span>
          <h2 className="section-title">5가지 핵심 가치</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7 flex flex-col gap-4"
            >
              {/* 아이콘 박스 */}
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                {value.icon}
              </div>

              {/* 텍스트 */}
              <div>
                <h3 className="font-heading text-dark font-bold text-base md:text-lg leading-snug mb-2">
                  {value.title}
                </h3>
                <p className="text-subtext text-sm md:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* 6번째 슬롯 — 이미지 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative rounded-2xl overflow-hidden min-h-[220px] shadow-card"
          >
            <Image
              src="/images/brand-values.png"
              alt="나다운 AI창작 워크룸 — 창작 무드"
              fill
              className="object-cover"
            />
            {/* 하단 브랜드 태그 */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-5 py-4">
              <p className="text-white text-sm font-semibold leading-snug">
                내 이야기가<br />나다운 작품으로
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
