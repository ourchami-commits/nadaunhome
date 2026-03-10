"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-bg py-20 md:py-28" id="faq">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">FAQ</p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold">
            자주 묻는 질문
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-dark text-base pr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-primary text-xl font-light flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-subtext text-sm md:text-base leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-subtext text-sm mb-3">더 궁금한 점이 있으신가요?</p>
          <a
            href="#contact"
            className="inline-block text-primary font-semibold underline text-sm"
          >
            직접 문의하기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
