"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classes } from "@/data/classes";

interface CustomClass {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  applyUrl: string;
  visible: boolean;
}

export default function ClassSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTrack, setActiveTrack] = useState<"regular" | "challenge">("regular");
  const [customClasses, setCustomClasses] = useState<CustomClass[]>([]);

  useEffect(() => {
    fetch("/api/admin/classes")
      .then((r) => r.json())
      .then((data) => setCustomClasses(data.filter((c: CustomClass) => c.visible)))
      .catch(() => {});
  }, []);

  const totalTabs = classes.length + customClasses.length;
  const isCustomTab = activeTab >= classes.length;
  const currentClass = !isCustomTab ? classes[activeTab] : null;
  const currentCustom = isCustomTab ? customClasses[activeTab - classes.length] : null;
  const currentTrack = currentClass
    ? (currentClass.tracks[activeTrack] ?? currentClass.tracks.regular)
    : null;
  const hasChallenge = currentClass?.tracks.challenge !== null;

  return (
    <section className="bg-cream py-20 md:py-28" id="classes">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            나다운 AI창작 워크룸 클래스
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold">
            어떤 클래스가 나에게 맞을까요?
          </h2>
        </motion.div>

        {/* Class tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {classes.map((cls, i) => (
            <button
              key={cls.id}
              onClick={() => { setActiveTab(i); setActiveTrack("regular"); }}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeTab === i
                  ? "bg-primary text-white"
                  : "bg-white text-subtext hover:text-dark border border-border"
              }`}
            >
              {cls.tabLabel}
            </button>
          ))}
          {customClasses.map((cls, i) => (
            <button
              key={cls.id}
              onClick={() => setActiveTab(classes.length + i)}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeTab === classes.length + i
                  ? "bg-primary text-white"
                  : "bg-white text-subtext hover:text-dark border border-border"
              }`}
            >
              {cls.tabLabel}
            </button>
          ))}
        </div>

        {/* Content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-sm overflow-hidden"
          >
            <div className="p-8 md:p-10">

              {/* 기존 클래스 */}
              {currentClass && currentTrack && (
                <>
                  <div className="mb-6">
                    <h3 className="font-heading text-dark text-xl md:text-2xl font-bold mb-2">
                      {currentClass.title}
                    </h3>
                    <p className="text-subtext text-base">{currentClass.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-dark mb-2">이런 분께 추천해요</p>
                    <ul className="flex flex-wrap gap-2">
                      {currentClass.target.map((t, i) => (
                        <li key={i} className="bg-cream text-dark text-sm px-3 py-1.5 rounded-full border border-border">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hasChallenge && (
                    <div className="flex gap-2 mb-8 p-1 bg-cream rounded-full w-fit">
                      <button
                        onClick={() => setActiveTrack("regular")}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                          activeTrack === "regular" ? "bg-primary text-white shadow-sm" : "text-subtext hover:text-dark"
                        }`}
                      >
                        6주 정규 과정
                      </button>
                      <button
                        onClick={() => setActiveTrack("challenge")}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                          activeTrack === "challenge" ? "bg-secondary text-white shadow-sm" : "text-subtext hover:text-dark"
                        }`}
                      >
                        2주 챌린지
                      </button>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTrack + activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-cream rounded-2xl p-5 mb-6">
                        <p className="text-sm font-semibold text-primary mb-1">완성 결과물</p>
                        <p className="text-dark font-semibold text-base">{currentTrack.outcome}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark mb-3">커리큘럼</p>
                        <ul className="space-y-2">
                          {currentTrack.curriculum.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <span className="text-primary font-semibold min-w-[56px] pt-0.5">{item.week}</span>
                              <span className="text-dark">{item.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 pt-6 border-t border-border">
                    {currentClass.tracks.regular.applyUrl ? (
                      <a
                        href={currentClass.tracks.regular.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
                      >
                        신청하기 →
                      </a>
                    ) : currentClass.id === "institution" ? (
                      <a href="#contact" className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-full transition-colors text-base">
                        기관 문의하기 →
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="bg-border text-subtext font-semibold px-8 py-4 rounded-full text-base cursor-not-allowed">
                          신청하기 (준비 중)
                        </span>
                        <a href="#contact" className="text-sm text-primary underline">문의하기</a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 신규 클래스 (간단 표시) */}
              {currentCustom && (
                <>
                  <div className="mb-6">
                    <h3 className="font-heading text-dark text-xl md:text-2xl font-bold mb-2">
                      {currentCustom.title}
                    </h3>
                    {currentCustom.subtitle && (
                      <p className="text-subtext text-base">{currentCustom.subtitle}</p>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    {currentCustom.applyUrl ? (
                      <a
                        href={currentCustom.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
                      >
                        신청하기 →
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="bg-border text-subtext font-semibold px-8 py-4 rounded-full text-base cursor-not-allowed">
                          신청하기 (준비 중)
                        </span>
                        <a href="#contact" className="text-sm text-primary underline">문의하기</a>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
