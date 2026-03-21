"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { classes as FALLBACK } from "@/data/classes";

interface ClassData {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  target: string[];
  durationLabel: string;
  outcome: string;
  applyUrl: string;
  imageUrl?: string;
  visible: boolean;
  sortOrder: number;
}

function getFallbackClasses(): ClassData[] {
  return FALLBACK.map((c, i) => ({
    id: c.id,
    tabLabel: c.tabLabel,
    title: c.title,
    subtitle: c.subtitle,
    target: c.target,
    durationLabel: c.id === "institution" ? "운영 방식 · 기간 협의" : "6주 정규 과정",
    outcome: c.tracks.regular.outcome,
    applyUrl: c.tracks.regular.applyUrl,
    imageUrl: "",
    visible: true,
    sortOrder: i + 1,
  }));
}

export default function ClassSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/classes")
      .then((r) => r.json())
      .then((data: ClassData[]) => {
        const visible = data
          .filter((c) => c.visible !== false)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        setClasses(visible.length > 0 ? visible : getFallbackClasses());
        setLoaded(true);
      })
      .catch(() => {
        setClasses(getFallbackClasses());
        setLoaded(true);
      });
  }, []);

  const current = classes[activeTab] ?? null;

  if (!loaded) return (
    <section className="bg-cream py-20 md:py-28" id="classes">
      <div className="section-inner" />
    </section>
  );

  const applyUrl = current?.applyUrl ?? "";
  const isHashLink = applyUrl.startsWith("#");

  return (
    <section className="bg-cream py-20 md:py-28" id="classes">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="label-tag label-tag-secondary">나다운 AI창작 워크룸 클래스</span>
          <h2 className="section-title">어떤 클래스가 나에게 맞을까요?</h2>
        </motion.div>

        {/* 클래스 탭 */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {classes.map((cls, i) => (
            <button
              key={cls.id}
              onClick={() => setActiveTab(i)}
              className={activeTab === i ? "tab-active" : "tab-inactive"}
            >
              {cls.tabLabel}
            </button>
          ))}
        </div>

        {/* 클래스 상세 카드 */}
        {current && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-card overflow-hidden"
            >
              <div className="p-5 sm:p-7 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">

                  {/* 왼쪽: 클래스 정보 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="font-heading text-dark text-xl md:text-2xl font-bold mb-1.5">
                        {current.title}
                      </h3>
                      {current.subtitle && (
                        <p className="text-subtext text-base">{current.subtitle}</p>
                      )}
                    </div>

                    {current.target && current.target.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-subtext tracking-widest uppercase mb-3">
                          이런 분께 추천해요
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {current.target.map((t, i) => (
                            <span key={i} className="badge">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {current.durationLabel && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="text-sm text-dark font-medium">{current.durationLabel}</span>
                      </div>
                    )}

                    {current.outcome && (
                      <div className="bg-cream rounded-2xl p-5">
                        <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-2">
                          완성 결과물
                        </p>
                        <p className="font-heading text-dark font-bold text-lg leading-snug">
                          {current.outcome}
                        </p>
                      </div>
                    )}

                    <div className="mt-auto">
                      {applyUrl ? (
                        <a
                          href={applyUrl}
                          {...(!isHashLink && { target: "_blank", rel: "noopener noreferrer" })}
                          className="btn btn-primary w-full sm:w-auto"
                        >
                          {isHashLink ? "기관 문의하기 →" : "신청하기 →"}
                        </a>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <span className="btn btn-soft cursor-not-allowed opacity-60">
                            신청하기 (준비 중)
                          </span>
                          <a href="#contact" className="btn btn-soft">
                            지금 문의하기
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 오른쪽: 클래스 이미지 */}
                  <div className="hidden lg:block">
                    {current.imageUrl ? (
                      <div className="h-full min-h-[360px] rounded-2xl overflow-hidden relative">
                        <Image
                          src={current.imageUrl}
                          alt={current.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-full min-h-[360px] rounded-2xl overflow-hidden relative bg-gradient-to-br from-point-green/30 via-cream to-soft-blue/20 flex flex-col items-center justify-center gap-4">
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-point-green/20 translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-soft-blue/20 -translate-x-1/3 translate-y-1/3" />
                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-card">
                          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                        <p className="relative z-10 text-xs font-medium text-subtext">클래스 이미지</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
