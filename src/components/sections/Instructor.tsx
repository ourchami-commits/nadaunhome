"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const DEFAULT_STRENGTHS = [
  "10년 창작 교육 경험",
  "수강생 그림책 출판 코칭",
  "AI 창작 커리큘럼 개발",
  "초보자 맞춤 실전형 수업",
  "200만+ 조회 콘텐츠 제작",
];

const DEFAULT_BIO = `창작은 특별한 재능보다 자신의 이야기를 꺼내는 용기에서 시작된다고 믿습니다.

AI는 그 이야기를 더 쉽게 꺼내고, 그림책·영상·전자책 같은 실제 결과물로 완성하도록 돕는 도구입니다.

저는 누구나 어렵지 않게 시작해 자기만의 결과물을 끝까지 완성할 수 있도록 돕는 수업을 만들고 있습니다.`;

const DEFAULT_QUOTE = `"누구나 자신의 이야기를 나다운 작품으로 완성할 수 있도록, 쉽고 따뜻한 AI 창작 수업을 만듭니다."`;

interface Props {
  name?: string;
  titlePrefix?: string;
  bio?: string;
  quote?: string;
  strengths?: string; // 쉼표 구분 문자열
}

export default function Instructor({ name, titlePrefix, bio, quote, strengths }: Props) {
  const strengthList = strengths
    ? strengths.split(",").map((s) => s.trim()).filter(Boolean)
    : DEFAULT_STRENGTHS;

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#EDE7DC" }}
      id="instructor"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg className="absolute top-14 right-24 w-5 h-5" style={{ color: "#C9E3B2", opacity: 0.75 }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
        </svg>
        <svg className="absolute bottom-20 left-20 w-3.5 h-3.5" style={{ color: "#C9E3B2", opacity: 0.6 }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
        </svg>
        <div className="absolute top-20 left-16 w-3 h-3 rounded-full" style={{ backgroundColor: "#F4B59F", opacity: 0.4 }} />
        <div className="absolute bottom-24 right-1/4 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F4B59F", opacity: 0.45 }} />
        <div className="absolute top-1/2 right-14 w-2 h-2 rounded-full" style={{ backgroundColor: "#C9E3B2", opacity: 0.5 }} />
      </div>

      <div className="section-inner relative">

        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="label-tag" style={{ color: "#5E7A52" }}>강사 소개</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3" style={{ color: "#2F2A26" }}>
            누구나 창작의 즐거움을<br className="sm:hidden" /> 경험하길 바라며
          </h2>
          <p className="text-subtext text-base">나다운 AI활용 창작 워크룸을 이끄는 {name || "차미쌤"}을 소개합니다</p>
        </motion.div>

        {/* 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-lifted"
        >
          <div className="flex flex-col md:flex-row">

            {/* 프로필 사진 */}
            <div className="relative w-full md:w-[340px] shrink-0 aspect-[4/5] md:aspect-auto md:min-h-[480px]">
              <Image
                src="/images/instructor-final.png"
                alt={`${name || "차미쌤"} 프로필 사진`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 280px"
              />
            </div>

            {/* 정보 영역 */}
            <div className="flex-1 px-8 py-9 md:px-10 md:py-10 flex flex-col gap-6">

              {/* 이름 & 직책 */}
              <div>
                <p className="text-sm font-semibold mb-1.5 tracking-wide" style={{ color: "#7A8B6A" }}>
                  {titlePrefix || "나다운 AI활용 창작 워크룸 대표"}
                </p>
                <h3 className="font-heading font-bold text-2xl md:text-3xl" style={{ color: "#2F2A26" }}>
                  {name || "차미쌤"}
                </h3>
              </div>

              {/* 구분선 */}
              <div className="border-t" style={{ borderColor: "#EDE7DC" }} />

              {/* 소개 */}
              <div className="text-sm md:text-base leading-loose" style={{ color: "#5A5450" }}>
                {(bio || DEFAULT_BIO).split("\n").filter(Boolean).map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : ""}>{line}</p>
                ))}
              </div>

              {/* 철학 인용 */}
              <blockquote
                className="pl-4 py-0.5 text-sm md:text-base font-heading font-semibold leading-relaxed"
                style={{ borderLeft: "3px solid #A8B99A", color: "#2F2A26" }}
              >
                {quote || DEFAULT_QUOTE}
              </blockquote>

              {/* 핵심 강점 배지 */}
              <div className="flex flex-wrap gap-2">
                {strengthList.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: "#FAF6EF", color: "#5E6B52", border: "1px solid #C5D9B9" }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div>
                <a
                  href="#classes"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition-colors"
                  style={{ backgroundColor: "#3D6B35" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2E5229")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3D6B35")}
                >
                  강의 보러가기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
