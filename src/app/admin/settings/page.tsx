"use client";

import { useEffect, useState } from "react";

interface Field {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  hint?: string;
}

const SITE_FIELDS: Field[] = [
  // 링크 / 연락처
  { key: "site_contact_email",    label: "문의 수신 이메일",    placeholder: "jpodo1@naver.com" },
  { key: "site_kakao_url",        label: "카카오채널 URL",       placeholder: "https://pf.kakao.com/..." },
  { key: "site_instagram_url",    label: "인스타그램 URL",       placeholder: "https://instagram.com/..." },
  { key: "site_youtube_url",      label: "유튜브 URL",           placeholder: "https://youtube.com/..." },
  { key: "site_portfolio_more_url", label: "포트폴리오 '더 보기' 링크", placeholder: "https://blog.naver.com/chami_on" },

  // 히어로 섹션
  { key: "site_hero_title",       label: "히어로 메인 문구",     placeholder: "누구나 자신의 이야기를..." },
  { key: "site_hero_subtitle",    label: "히어로 부제목",        placeholder: "AI를 몰라도 괜찮아요. 그림책·영상을 직접 완성하는 창작형 AI 교육입니다." },

  // 문의 섹션
  { key: "site_contact_heading",  label: "문의 섹션 제목",       placeholder: "편하게 문의해보세요" },
  { key: "site_contact_subtitle", label: "문의 섹션 설명",       placeholder: "궁금한 내용이 있거나 단체 교육 관련 상담을 원하시면 언제든지 문의 남겨주세요 :)" },

  // 마지막 CTA
  { key: "site_cta_heading",      label: "마지막 CTA 제목",      placeholder: "쉽고 즐겁게 창작을 시작해보세요" },
  { key: "site_cta_subtitle",     label: "마지막 CTA 설명",      placeholder: "누구나 쉽게 창작의 기쁨을 누릴 수 있도록 도와드릴게요 :)" },

  // 강사 소개
  { key: "site_instructor_name",           label: "강사 이름",        placeholder: "차미쌤" },
  { key: "site_instructor_title_prefix",   label: "강사 직책",        placeholder: "나다운 AI활용 창작 워크룸 대표" },
  { key: "site_instructor_title",          label: "강사 직함 (부가)", placeholder: "나다운 AI활용 창작 워크룸 운영자" },
  {
    key: "site_instructor_bio",
    label: "강사 소개 텍스트",
    placeholder: "창작은 특별한 재능보다 자신의 이야기를 꺼내는 용기에서 시작된다고 믿습니다...",
    multiline: true,
    hint: "줄바꿈(Enter)이 화면에 그대로 반영됩니다.",
  },
  {
    key: "site_instructor_quote",
    label: "강사 철학 인용 문구",
    placeholder: '"누구나 자신의 이야기를 나다운 작품으로 완성할 수 있도록, 쉽고 따뜻한 AI 창작 수업을 만듭니다."',
    multiline: true,
  },
  {
    key: "site_instructor_strengths",
    label: "핵심 강점 배지",
    placeholder: "10년 창작 교육 경험, 수강생 그림책 출판 코칭, AI 창작 커리큘럼 개발",
    hint: "쉼표(,)로 구분하면 각각 배지로 표시됩니다.",
  },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<"site" | "password">("site");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const vals: Record<string, string> = {};
        SITE_FIELDS.forEach(({ key }) => {
          vals[key] = data[key] || "";
        });
        setFields(vals);
      });
  }, []);

  const saveSite = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePassword = async () => {
    if (newPw !== confirmPw) { setPwMsg("새 비밀번호가 일치하지 않습니다."); return; }
    setPwLoading(true);
    setPwMsg("");
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    });
    const data = await res.json();
    if (res.ok) {
      setPwMsg("비밀번호가 변경되었습니다!");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      setPwMsg(data.error || "오류가 발생했습니다.");
    }
    setPwLoading(false);
  };

  const inputClass = "w-full border border-border rounded-xl px-4 py-2.5 text-dark text-sm focus:outline-none focus:border-primary bg-bg";

  return (
    <div>
      <h1 className="font-heading text-dark text-2xl font-bold mb-6">설정</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("site")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "site" ? "bg-primary text-white" : "bg-white text-subtext"}`}
        >
          사이트 설정
        </button>
        <button
          onClick={() => setTab("password")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "password" ? "bg-primary text-white" : "bg-white text-subtext"}`}
        >
          비밀번호 변경
        </button>
      </div>

      {tab === "site" && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-dark">링크 및 텍스트 설정</h2>
            <button
              onClick={saveSite}
              disabled={saving}
              className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
            </button>
          </div>
          <div className="space-y-5">
            {SITE_FIELDS.map(({ key, label, placeholder, multiline, hint }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-dark mb-1.5">{label}</label>
                {multiline ? (
                  <textarea
                    value={fields[key] || ""}
                    onChange={(e) => setFields((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    rows={3}
                    className={`${inputClass} resize-y`}
                  />
                ) : (
                  <input
                    type="text"
                    value={fields[key] || ""}
                    onChange={(e) => setFields((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className={inputClass}
                  />
                )}
                {hint && <p className="text-xs text-subtext mt-1">{hint}</p>}
              </div>
            ))}
          </div>
          <p className="text-xs text-subtext mt-6">
            * 변경 후 저장하면 즉시 반영됩니다.
          </p>
        </div>
      )}

      {tab === "password" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-md">
          <h2 className="font-semibold text-dark mb-6">비밀번호 변경</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">현재 비밀번호</label>
              <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">새 비밀번호</label>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">새 비밀번호 확인</label>
              <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg" />
            </div>
            {pwMsg && (
              <p className={`text-sm ${pwMsg.includes("변경되었습니다") ? "text-primary" : "text-secondary"}`}>{pwMsg}</p>
            )}
            <button
              onClick={changePassword}
              disabled={pwLoading || !currentPw || !newPw || !confirmPw}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
            >
              {pwLoading ? "변경 중..." : "비밀번호 변경"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
