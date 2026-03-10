"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  phone: z.string().min(10, "연락처를 입력해주세요."),
  type: z.enum(["교육문의", "협업제안", "강의문의", "기타"] as const, {
    error: "문의 유형을 선택해주세요.",
  }),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

const inquiryTypes = ["교육문의", "협업제안", "강의문의", "기타"] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-cream py-20 md:py-28" id="contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-secondary font-semibold text-sm mb-3 tracking-wide">
            문의하기
          </p>
          <h2 className="font-heading text-dark text-2xl md:text-4xl font-bold mb-3">
            어떤 문의든 편하게 남겨주세요
          </h2>
          <p className="text-subtext text-base">
            1~2일 내로 답변 드리겠습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-10"
        >
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-heading font-bold text-dark text-xl mb-2">
                문의가 접수되었습니다!
              </h3>
              <p className="text-subtext text-base">1~2일 내 답변드리겠습니다.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-primary underline text-sm"
              >
                새 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  이름 <span className="text-secondary">*</span>
                </label>
                <input
                  {...register("name")}
                  placeholder="홍길동"
                  className="w-full border border-border rounded-xl px-4 py-3 text-dark text-base focus:outline-none focus:border-primary transition-colors bg-bg"
                />
                {errors.name && (
                  <p className="text-secondary text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  이메일 <span className="text-secondary">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border border-border rounded-xl px-4 py-3 text-dark text-base focus:outline-none focus:border-primary transition-colors bg-bg"
                />
                {errors.email && (
                  <p className="text-secondary text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  연락처 <span className="text-secondary">*</span>
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="010-0000-0000"
                  className="w-full border border-border rounded-xl px-4 py-3 text-dark text-base focus:outline-none focus:border-primary transition-colors bg-bg"
                />
                {errors.phone && (
                  <p className="text-secondary text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Inquiry type */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  문의 유형 <span className="text-secondary">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((type) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        {...register("type")}
                        type="radio"
                        value={type}
                        className="sr-only"
                      />
                      <span className="block px-4 py-2 rounded-full border border-border text-sm font-medium text-subtext hover:border-primary hover:text-primary transition-colors has-[:checked]:bg-primary has-[:checked]:text-white has-[:checked]:border-primary">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.type && (
                  <p className="text-secondary text-xs mt-1">{errors.type.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  문의 내용 <span className="text-secondary">*</span>
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="궁금한 점이나 요청 사항을 자유롭게 적어주세요."
                  className="w-full border border-border rounded-xl px-4 py-3 text-dark text-base focus:outline-none focus:border-primary transition-colors bg-bg resize-none"
                />
                {errors.message && (
                  <p className="text-secondary text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {status === "error" && (
                <p className="text-secondary text-sm text-center">
                  전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-4 rounded-full text-base transition-colors"
              >
                {status === "loading" ? "전송 중..." : "문의 보내기"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
