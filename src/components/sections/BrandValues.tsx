"use client";

import { motion } from "framer-motion";

const values = [
  {
    icon: "🌱",
    title: "초보도 시작할 수 있어요",
    description: "AI를 처음 접하는 분도, 스마트폰만 있으면 시작할 수 있습니다.",
  },
  {
    icon: "📖",
    title: "내 이야기가 결과물이 됩니다",
    description: "경험과 감정을 그림책·영상·콘텐츠로 직접 완성합니다.",
  },
  {
    icon: "✨",
    title: "취미를 넘어 새로운 역할로",
    description: "창작 경험이 성취감이 되고, 새로운 사회적 역할로 이어집니다.",
  },
  {
    icon: "🏆",
    title: "배움보다 완성이 먼저",
    description: "기능 설명보다 결과물 완성에 집중하는 커리큘럼.",
  },
  {
    icon: "🤝",
    title: "기관에서도 바로 쓸 수 있어요",
    description: "현장 경험 기반의 친절하고 실전적인 교육 설계.",
  },
];

export default function BrandValues() {
  return (
    <section className="bg-bg py-20 md:py-28" id="values">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            나다운 AI창작 워크룸이 다른 이유
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold">
            5가지 핵심 가치
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-white rounded-2xl p-7 shadow-sm border border-border ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-heading text-dark font-bold text-lg mb-2">
                {value.title}
              </h3>
              <p className="text-subtext text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
