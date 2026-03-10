"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-white text-2xl md:text-4xl font-bold mb-5 leading-tight">
            당신의 이야기, 이제 세상에 꺼내도 됩니다
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-10 max-w-xl mx-auto">
            AI를 몰라도 괜찮아요. 만드는 경험이 먼저입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#classes"
              className="bg-white hover:bg-cream text-primary font-semibold text-base px-10 py-4 rounded-full transition-colors min-h-[52px] flex items-center justify-center"
            >
              클래스 신청하기
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-base px-10 py-4 rounded-full transition-colors min-h-[52px] flex items-center justify-center"
            >
              문의하기
            </a>
          </div>

          <p className="mt-8 text-white/60 text-sm">부담 없이 먼저 살펴보세요</p>
        </motion.div>
      </div>
    </section>
  );
}
