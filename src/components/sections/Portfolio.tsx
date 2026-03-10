"use client";

import { motion } from "framer-motion";

const portfolioItems = [
  { label: "그림책", emoji: "📚", desc: "수강생이 직접 기획·완성한 그림책" },
  { label: "시 그림책", emoji: "🌸", desc: "나의 시로 만든 감성 그림책" },
  { label: "AI 이미지", emoji: "🎨", desc: "Ideogram으로 만든 창작 이미지" },
  { label: "영상 콘텐츠", emoji: "🎬", desc: "AI로 제작한 유튜브 영상" },
  { label: "전자책", emoji: "📱", desc: "디지털로 배포 가능한 전자책" },
  { label: "수강생 결과물", emoji: "✨", desc: "실제 수강생이 완성한 작품들" },
];

export default function Portfolio() {
  return (
    <section className="bg-bg py-20 md:py-28" id="portfolio">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            실제로 이런 것들을 만들어요
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold mb-4">
            대표 결과물 & 포트폴리오
          </h2>
          <p className="text-subtext text-base md:text-lg">
            AI를 활용해 수강생들이 직접 완성한 창작물입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-cream rounded-2xl aspect-square flex flex-col items-center justify-center p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-3">{item.emoji}</div>
              <p className="font-heading font-bold text-dark text-base mb-1">{item.label}</p>
              <p className="text-subtext text-xs text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-subtext text-sm mt-8"
        >
          * 실제 수강생 결과물 이미지는 순차적으로 업데이트됩니다.
        </motion.p>
      </div>
    </section>
  );
}
