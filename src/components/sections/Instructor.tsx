"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const badges = [
  "그림책 출판 경험",
  "수강생 출간 코칭",
  "1:1 창작 코칭",
  "AI 창작 교육 기획",
  "초보자 실전형 클래스",
];

export default function Instructor() {
  return (
    <section className="bg-bg py-20 md:py-28" id="instructor">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            강사 소개
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold">
            차미쌤을 소개합니다
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/images/instructor-profile.png"
                alt="차미쌤 프로필 사진"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-heading font-bold text-dark text-xl mb-1">차미쌤</p>
            <p className="text-primary text-sm font-medium mb-5">
              나다운 AI활용 창작 워크룸 운영자
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-cream border border-border text-dark text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Bio text */}
            <div className="text-subtext text-sm md:text-base leading-relaxed space-y-3 mb-6">
              <p>
                저는 직접 그림책을 만들고, 글을 쓰고, 창작을 다시 시작하는 과정을 지나오며 한 가지를 확실히 느꼈습니다.
              </p>
              <p>
                창작은 타고난 재능보다, 자신의 이야기를 꺼내는 용기에서 시작된다는 점입니다.
              </p>
              <p>
                AI는 그 용기를 결과물로 이어지게 돕는 좋은 도구가 될 수 있습니다. 그래서 제 수업은 단순히 기능을 배우는 데 그치지 않고, 각자의 감정과 경험을 나다운 콘텐츠와 작품으로 완성하도록 돕는 데 집중합니다.
              </p>
            </div>

            {/* Representative message */}
            <blockquote className="border-l-4 border-primary pl-5 text-dark font-heading font-semibold text-base md:text-lg leading-relaxed">
              "누구나 자신의 이야기를 꺼내어 나다운 작품으로 완성할 수 있도록 돕는 것, 그것이 제가 추구하는 AI 창작 교육입니다."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
