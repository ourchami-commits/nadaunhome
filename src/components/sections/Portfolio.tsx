"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import type { CSSProperties } from "react";

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  imageUrl?: string;
  purchaseUrl?: string;
  visible: boolean;
  sortOrder: number;
}

const badgeStyle: CSSProperties = { backgroundColor: "#C9E3B2", color: "#2D3540" };

const placeholderBg: Record<string, string> = {
  그림책:  "linear-gradient(135deg, #e8f5d8 0%, #c9e3b2 100%)",
  카드뉴스: "linear-gradient(135deg, #fde8df 0%, #f4b59f 100%)",
  영상:   "linear-gradient(135deg, #daeef9 0%, #b9daf2 100%)",
  ebook:  "linear-gradient(135deg, #fdf6d8 0%, #f6e59a 100%)",
};

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then((data: PortfolioItem[]) =>
        setItems(data.filter((i) => i.visible !== false))
      )
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#EDE7DC" }} id="portfolio">
      <div className="section-inner">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header-lg"
        >
          <span className="label-tag" style={{ color: "#5E7A52" }}>
            실제로 이런 것들을 만들어요
          </span>
          <h2 className="section-title mb-3">우리 클래스에서는<br className="sm:hidden" /> 이런 결과물을 만들 수 있어요</h2>
          <p className="text-subtext text-base md:text-lg">AI로 만든 나다운 이야기책, 영상 등</p>
        </motion.div>

        {/* 카드 그리드 */}
        {items.length === 0 ? (
          <p className="text-center text-subtext py-12">포트폴리오를 준비 중입니다.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden shadow-card bg-white flex flex-col"
                >
                  {/* 썸네일 영역 — 구매링크 있으면 클릭 가능 */}
                  {item.purchaseUrl ? (
                    <a
                      href={item.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden group"
                      style={{ background: placeholderBg[item.category] }}
                    >
                      {item.imageUrl ? (
                        <>
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-dark text-xs font-semibold px-3 py-1.5 rounded-full">
                              자세히 보기 →
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 opacity-40">
                          <svg className="w-10 h-10 text-dark" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </a>
                  ) : (
                    <div
                      className="w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden"
                      style={{ background: placeholderBg[item.category] }}
                    >
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="flex flex-col items-center gap-2 opacity-40">
                          <svg className="w-10 h-10 text-dark" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 캡션 */}
                  <div className="p-4 flex flex-col gap-1.5 flex-1" style={{ backgroundColor: "#FAF6EF" }}>
                    <span
                      className="self-start text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={badgeStyle}
                    >
                      {item.category}
                    </span>
                    <h3 className="font-heading font-bold text-dark text-sm md:text-base leading-snug">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-subtext text-xs md:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* 더 보기 CTA 카드 */}
              <motion.div
                key="cta"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: items.length * 0.05 }}
                className="rounded-2xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center p-6 gap-3 min-h-[200px] cursor-pointer group transition-colors hover:bg-white/50"
                style={{ borderColor: "#B5C9A8" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "#C9E3B2" }}>
                  <svg className="w-5 h-5" style={{ color: "#2D3540" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <p className="font-heading font-bold text-dark text-sm md:text-base text-center leading-snug">
                  더 많은 결과물<br />보러가기
                </p>
                <p className="text-subtext text-xs text-center">다양한 분야에 활용할 수<br />있는 작품들을 리뷰하기</p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-subtext text-xs mt-8"
        >
          * 실제 수강생 결과물 이미지는 순차적으로 업데이트됩니다.
        </motion.p>

      </div>
    </section>
  );
}
