"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    keyword: "기억에 쏙쏙 남고",
    text: "말만 듣던 ChatGPT를, 처음으로 직접 써봤어요. 배운 걸 일주일 동안 써보니 기억에 쏙쏙 남고, 내가 만든 이미지로 수익화도 생각해볼 수 있게 됐어요.",
    class: "AI 기초 클래스",
  },
  {
    keyword: "분별력이 생긴 느낌",
    text: "AI는 다 비슷하겠거니 했는데, 아니더라고요. ChatGPT, 코파일럿, 아이디오그램 각각의 특징을 알고 나니 '여기선 이걸, 저기선 저걸' 스스로 고를 수 있게 됐어요. AI 입문자인데 분별력이 생긴 느낌이었어요.",
    class: "AI 기초 클래스",
  },
  {
    keyword: "나도 할 수 있겠다는 자신감",
    text: "저는 음악에 자신이 없었어요. 그런데 AI로 음악을 만들고, 가사를 수정하고, 유튜브 채널까지 만들 수 있다는 걸 알게 되면서 '나도 할 수 있겠다'는 자신감이 한층 높아졌습니다.",
    class: "AI 영상제작 클래스",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="bg-cream py-20 md:py-28" id="testimonials">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            수강생 후기
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold">
            실제로 들어본 분들의 이야기
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm"
            >
              {/* Stars */}
              <div className="text-secondary text-xl mb-5">★★★★★</div>

              {/* Keyword highlight */}
              <p className="text-primary font-heading font-bold text-lg md:text-xl mb-4">
                &ldquo;{testimonials[current].keyword}&rdquo;
              </p>

              {/* Full text */}
              <p className="text-dark text-base md:text-lg leading-relaxed mb-6">
                {testimonials[current].text}
              </p>

              {/* Source */}
              <p className="text-subtext text-sm font-medium">
                — 수강생 ({testimonials[current].class})
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-border"
                }`}
                aria-label={`후기 ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow nav */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-subtext hover:text-dark hover:border-dark transition-colors"
              aria-label="이전"
            >
              ←
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-subtext hover:text-dark hover:border-dark transition-colors"
              aria-label="다음"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
