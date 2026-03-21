"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  keyword: string;
  text: string;
  className: string;
  visible: boolean;
  sortOrder: number;
}

/* 4-pointed sparkle SVG */
function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data: Testimonial[]) =>
        setTestimonials(data.filter((t) => t.visible !== false))
      )
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#FAF6EF" }} id="testimonials">

      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Sparkle className="absolute top-12 left-16 w-5 h-5" style={{ color: "#F6E59A" }} />
        <Sparkle className="absolute top-20 right-32 w-3 h-3" style={{ color: "#C9E3B2" }} />
        <Sparkle className="absolute top-1/3 left-8 w-4 h-4" style={{ color: "#F4B59F", opacity: 0.6 }} />
        <Sparkle className="absolute bottom-24 left-24 w-3 h-3" style={{ color: "#B9DAF2" }} />
        <Sparkle className="absolute bottom-16 right-16 w-6 h-6" style={{ color: "#F6E59A", opacity: 0.7 }} />
        <Sparkle className="absolute top-1/2 right-10 w-3 h-3" style={{ color: "#C9E3B2", opacity: 0.8 }} />
        <div className="absolute top-16 right-1/4 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F4B59F", opacity: 0.5 }} />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full" style={{ backgroundColor: "#C9E3B2", opacity: 0.6 }} />
      </div>

      <div className="section-inner relative">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header-lg"
        >
          <span className="label-tag" style={{ color: "#5E7A52" }}>
            수강생 후기
          </span>
          <h2 className="section-title">함께한 분들이 결과로 이야기해요</h2>
          <p className="text-subtext text-base md:text-lg">AI를 활용한 창작 과정, 이렇게 경험했어요</p>
        </motion.div>

        {/* 카드 그리드 */}
        {testimonials.length === 0 ? (
          <p className="text-center text-subtext py-12">등록된 후기가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-card relative overflow-hidden"
              >
                {/* 별점 */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill="#E8B8A2">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* 인용부호 */}
                <div className="font-heading font-black text-5xl leading-none -mb-2 select-none" style={{ color: "#E8B8A2" }}>
                  "
                </div>

                {/* 후기 텍스트 */}
                <div className="flex-1">
                  <p className="font-heading font-bold text-dark text-sm md:text-base leading-snug mb-2">
                    {t.keyword}
                  </p>
                  <p className="text-subtext text-sm leading-relaxed">
                    {t.text}
                  </p>
                </div>

                {/* 컨텍스트 라벨 */}
                <p className="text-xs pt-1 border-t" style={{ color: "#A8A09A", borderColor: "#F0EBE4" }}>
                  {t.className}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* 더 보기 */}
        {testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-end mt-5"
          >
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-subtext hover:text-dark transition-colors px-4 py-2.5 min-h-[44px] rounded-full border border-border bg-white hover:border-dark"
            >
              + 모두보기
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
