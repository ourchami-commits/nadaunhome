"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const inquiryTypes = ["수강 문의", "기관·단체 문의"] as const;

const schema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  phone: z.string().min(9, "연락처를 입력해주세요."),
  type: z.enum(inquiryTypes, { error: "문의 유형을 선택해주세요." }),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요."),
  privacy: z.literal(true, { error: "개인정보 수집·이용에 동의해주세요." }),
});

type FormData = z.infer<typeof schema>;

/* Sparkle */
function Dot({ className, color }: { className: string; color: string }) {
  return <div className={`rounded-full absolute ${className}`} style={{ backgroundColor: color }} />;
}
function Spark({ className, color }: { className: string; color: string }) {
  return (
    <svg className={`absolute ${className}`} style={{ color }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}

export default function ContactForm({ heading, subtitle }: { heading?: string; subtitle?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedType, setSelectedType] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("success"); reset(); setSelectedType(""); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#FAF6EF" }}
      id="contact"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Spark className="top-14 left-20 w-5 h-5" color="#F6E59A" />
        <Spark className="top-1/3 right-16 w-4 h-4" color="#C9E3B2" />
        <Spark className="bottom-20 left-1/4 w-3 h-3" color="#B9DAF2" />
        <Spark className="bottom-32 right-24 w-5 h-5" color="#F4B59F" />
        <Spark className="top-1/2 left-10 w-3 h-3" color="#F6E59A" />
        <Dot className="top-20 right-1/3 w-3 h-3" color="#F4B59F66" />
        <Dot className="bottom-40 left-16 w-2 h-2" color="#C9E3B288" />
        <Dot className="top-1/3 left-1/2 w-2.5 h-2.5" color="#B9DAF266" />
      </div>

      <div className="section-inner relative">

        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold text-dark text-3xl md:text-4xl mb-4">
            {heading || "편하게 문의해보세요"}
          </h2>
          <p className="text-subtext text-base md:text-lg leading-relaxed">
            {subtitle || <>궁금한 내용이 있거나 단체 교육 관련 상담을 원하시면<br className="hidden sm:block" />언제든지 문의 남겨주세요&nbsp;:)</>}
          </p>
          <p className="mt-3 text-sm font-medium" style={{ color: "#C8856A" }}>
            친절하게 답변드리겠습니다&nbsp;:)
          </p>
        </motion.div>

        {/* 폼 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lifted p-5 sm:p-8"
        >
          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#C9E3B2" }}>
                <svg className="w-7 h-7" style={{ color: "#3D6B35" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-dark text-xl mb-2">문의가 접수되었습니다!</h3>
              <p className="text-subtext text-base mb-6">1~2일 내 친절하게 답변드릴게요 :)</p>
              <button onClick={() => setStatus("idle")} className="text-sm font-medium underline text-subtext hover:text-dark">
                새 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* 카드 내부 소제목 */}
              <p className="font-heading font-bold text-dark text-lg">편하게 문의 남겨주세요.</p>

              {/* 문의 유형 — 라디오 버튼 */}
              <div>
                <div className="flex gap-4">
                  {inquiryTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        {...register("type")}
                        type="radio"
                        value={type}
                        className="sr-only"
                        onChange={(e) => {
                          register("type").onChange(e);
                          setSelectedType(type);
                        }}
                      />
                      {/* 커스텀 라디오 원 */}
                      <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          borderColor: selectedType === type ? "#3D6B35" : "#D6E4EE",
                          backgroundColor: selectedType === type ? "#3D6B35" : "transparent",
                        }}>
                        {selectedType === type && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-sm font-medium transition-colors"
                        style={{ color: selectedType === type ? "#3D6B35" : "#7A8899" }}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.type && <p className="text-xs mt-1.5" style={{ color: "#E8B8A2" }}>{errors.type.message}</p>}
              </div>

              {/* 이름 + 이메일 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("name")}
                    placeholder="이름"
                    className="form-input"
                    style={{ backgroundColor: "#FFFEFB" }}
                  />
                  {errors.name && <p className="text-xs mt-1" style={{ color: "#E8B8A2" }}>{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="이메일"
                    className="form-input"
                    style={{ backgroundColor: "#FFFEFB" }}
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#E8B8A2" }}>{errors.email.message}</p>}
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="연락처 (하이폰(-) 없이 숫자만)"
                  className="form-input"
                  style={{ backgroundColor: "#FFFEFB" }}
                />
                {errors.phone && <p className="text-xs mt-1" style={{ color: "#E8B8A2" }}>{errors.phone.message}</p>}
              </div>

              {/* 문의 내용 */}
              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="문의 내용"
                  className="form-input resize-none"
                  style={{ backgroundColor: "#FFFEFB" }}
                />
                {errors.message && <p className="text-xs mt-1" style={{ color: "#E8B8A2" }}>{errors.message.message}</p>}
              </div>

              {status === "error" && (
                <p className="text-sm text-center" style={{ color: "#E8B8A2" }}>
                  전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>
              )}

              {/* 하단: 개인정보 동의 + 제출 버튼 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    {...register("privacy")}
                    type="checkbox"
                    className="w-4 h-4 rounded cursor-pointer accent-[#3D6B35]"
                  />
                  <span className="text-xs text-subtext">개인정보 수집 및 이용에 동의합니다.</span>
                </label>
                {errors.privacy && (
                  <p className="text-xs" style={{ color: "#E8B8A2" }}>{errors.privacy.message}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-base transition-colors disabled:opacity-60 w-full sm:w-auto flex-shrink-0"
                  style={{ backgroundColor: "#3D6B35" }}
                  onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#2E5229"; }}
                  onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#3D6B35"; }}
                >
                  {status === "loading" ? "전송 중..." : "문의 보내기"}
                  {status !== "loading" && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  )}
                </button>
              </div>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
