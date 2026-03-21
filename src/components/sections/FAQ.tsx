"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs as fallbackFaqs } from "@/data/faq";

interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  visible?: boolean;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((r) => r.json())
      .then((data: FaqItem[]) => {
        const visible = data.filter((f) => f.visible !== false);
        setFaqs(visible.length > 0 ? visible : fallbackFaqs);
      })
      .catch(() => setFaqs(fallbackFaqs));
  }, []);

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#EDE7DC" }}
      id="faq"
    >
      {/* 아주 작은 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg className="absolute top-12 right-20 w-5 h-5" style={{ color: "#C9E3B2", opacity: 0.8 }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
        </svg>
        <div className="absolute top-20 right-1/3 w-3 h-3 rounded-full" style={{ backgroundColor: "#F4B59F", opacity: 0.5 }} />
        <div className="absolute bottom-20 left-1/4 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#C9E3B2", opacity: 0.6 }} />
      </div>

      <div className="section-inner relative">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3" style={{ color: "#2F2A26" }}>
            자주 묻는 질문
          </h2>
          <p className="text-subtext text-base">
            궁금한 점이 있거나 고민이 된다면 여기에서 확인해보세요
          </p>
        </motion.div>

        {/* 아코디언 카드 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-card"
        >
          {faqs.map((faq, i) => (
            <div key={faq.id ?? i} className={i !== 0 ? "border-t" : ""} style={{ borderColor: "#EDE7DC" }}>

              {/* 질문 버튼 */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 transition-colors"
                style={{
                  backgroundColor: openIndex === i ? "#FAFAF8" : "transparent",
                }}
              >
                <span
                  className="font-semibold text-base leading-snug"
                  style={{ color: "#2F2A26" }}
                >
                  {faq.question}
                </span>

                {/* 아이콘 원형 */}
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: openIndex === i ? "#5E7A52" : "#A8B99A",
                  }}
                >
                  <svg
                    className="w-4 h-4 text-white transition-transform duration-300"
                    style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>

              {/* 답변 */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-6 text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                      style={{ color: "#7A8899", borderTop: "1px solid #EDE7DC", paddingTop: "1rem" }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </motion.div>

        {/* 하단 문의 유도 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-subtext text-sm mb-2">더 궁금한 점이 있으신가요?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
            style={{ color: "#5E7A52" }}
          >
            직접 문의하기
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
