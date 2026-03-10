"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    question: '"AI는 젊은 사람들 것 아닌가요?"',
    answer: "나이와 상관없이, 스마트폰을 쓸 수 있으면 시작할 수 있어요.",
    icon: "🌱",
  },
  {
    question: '"배우고 싶은데 뭔가를 만들 수 있을지 모르겠어요"',
    answer: "이곳은 배우는 게 목표가 아니에요. 완성하는 게 목표입니다.",
    icon: "✨",
  },
  {
    question: '"기관에서 AI 교육을 해야 하는데 어디에 맡겨야 할지 몰라요"',
    answer: "창작 결과물까지 연결하는 현장 친화적 강의를 제공합니다.",
    icon: "🤝",
  },
];

export default function Empathy() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold mb-4">
            혹시 이런 생각 해보셨나요?
          </h2>
          <p className="text-subtext text-base md:text-lg">맞아요, 저도 그랬어요.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-7 shadow-sm"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <p className="text-dark font-semibold text-base md:text-lg mb-3 leading-snug">
                {item.question}
              </p>
              <div className="w-8 h-0.5 bg-secondary mb-3" />
              <p className="text-subtext text-sm md:text-base leading-relaxed">
                → {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
