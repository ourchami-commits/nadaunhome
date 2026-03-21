"use client";

import { motion } from "framer-motion";

const cards = [
  {
    chipBg: "bg-point-green/25",
    divider: "border-point-green/30",
    icon: (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    question: "AI는 젊은 사람들 것 아닌가요?",
    empathy: "맞아요, 저도 처음엔 그렇게 생각했어요.",
    answer: "나이와 상관없이, 스마트폰을 쓸 수 있으면 충분히 시작할 수 있어요.",
  },
  {
    chipBg: "bg-secondary/25",
    divider: "border-secondary/35",
    icon: (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
    question: "뭔가를 만들 수 있을지 모르겠어요",
    empathy: "완성하지 못할까봐 걱정되시죠.",
    answer: "이곳은 배우는 곳이 아니에요. 완성하는 곳입니다.",
  },
  {
    chipBg: "bg-primary/10",
    divider: "border-primary/15",
    icon: (
      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    question: "기관 AI 교육, 어디에 맡겨야 할지 몰라요",
    empathy: "맞는 강사를 찾기가 참 어렵죠.",
    answer: "창작 결과물까지 연결하는 현장 친화적 강의를 제공합니다.",
  },
];

export default function Empathy() {
  return (
    <section className="bg-cream py-20 md:py-28 relative overflow-hidden">
      {/* 일러스트 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-10 right-8 w-16 h-16 text-secondary/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <div className="absolute bottom-12 left-6 w-6 h-6 rounded-full bg-butter-yellow/50" />
        <div className="absolute top-1/2 left-4 w-4 h-4 rounded-full bg-point-green/40" />
      </div>
      <div className="section-inner relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title mb-3">혹시 이런 생각 해보셨나요?</h2>
          <p className="text-subtext text-base md:text-lg">맞아요, 저도 그랬어요.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card flex flex-col gap-5 p-7"
            >
              {/* 아이콘 칩 */}
              <div className={`w-9 h-9 rounded-lg ${card.chipBg} flex items-center justify-center flex-shrink-0`}>
                {card.icon}
              </div>

              {/* 질문 */}
              <p className="font-heading text-dark font-bold text-base md:text-lg leading-snug">
                "{card.question}"
              </p>

              {/* 공감 한줄 */}
              <p className="text-subtext text-sm leading-relaxed -mt-2 italic">
                {card.empathy}
              </p>

              {/* 구분선 */}
              <div className={`border-t ${card.divider}`} />

              {/* 안심 메시지 */}
              <p className="text-dark text-sm md:text-base leading-relaxed">
                {card.answer}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
