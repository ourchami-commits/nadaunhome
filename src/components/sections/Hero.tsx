"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-bg flex items-center pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-cream rounded-full opacity-60 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-10 left-0 w-48 h-48 bg-secondary/10 rounded-full -translate-x-1/4" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm md:text-base mb-4 tracking-wide"
          >
            나다운 AI활용 창작 워크룸
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-dark text-3xl md:text-5xl font-bold leading-tight md:leading-snug mb-6"
          >
            누구나 자신의 이야기를 꺼내어<br />
            <span className="text-primary">나다운 작품</span>으로<br />
            완성할 수 있도록
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-subtext text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            AI를 몰라도 괜찮아요.<br />
            내 이야기로 그림책을 만들고, 영상을 완성하는<br />
            창작형 AI 교육 브랜드입니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#classes"
              className="bg-primary hover:bg-primary-hover text-white font-semibold text-base px-8 py-4 rounded-full text-center transition-colors min-h-[52px] flex items-center justify-center"
            >
              클래스 살펴보기
            </a>
            <a
              href="#contact"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-base px-8 py-4 rounded-full text-center transition-colors min-h-[52px] flex items-center justify-center"
            >
              기관 특강 문의
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-subtext text-sm"
          >
            부담 없이 먼저 살펴보세요 ✦
          </motion.p>
        </div>
      </div>
    </section>
  );
}
