"use client";

import { useEffect, useState } from "react";

const SITE_FIELDS = [
  { key: "site_kakao_url", label: "카카오채널 URL", placeholder: "https://pf.kakao.com/..." },
  { key: "site_instagram_url", label: "인스타그램 URL", placeholder: "https://instagram.com/..." },
  { key: "site_youtube_url", label: "유튜브 URL", placeholder: "https://youtube.com/..." },
  { key: "site_hero_title", label: "히어로 메인 문구", placeholder: "누구나 자신의 이야기를..." },
  { key: "site_hero_subtitle", label: "히어로 부제목", placeholder: "AI를 몰라도 괜찮아요..." },
  { key: "site_instructor_name", label: "강사 이름", placeholder: "차미쌤" },
  { key: "site_instructor_title", label: "강사 직함", placeholder: "나다운 AI활용 창작 워크룸 운영자" },
  { key: "site_contact_email", label: "문의 수신 이메일", placeholder: "jpodo1@naver.com" },
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
    if (newPw !== confirmPw) {
      setPwMsg("새 비밀번호가 일치하지 않습니다.");
      return;
    }
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
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } else {
      setPwMsg(data.error || "오류가 발생했습니다.");
    }
    setPwLoading(false);
  };

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
          <div className="space-y-4">
            {SITE_FIELDS.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-dark mb-1.5">{label}</label>
                <input
                  type="text"
                  value={fields[key] || ""}
                  onChange={(e) => setFields((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-dark text-sm focus:outline-none focus:border-primary bg-bg"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-subtext mt-4">
            * 링크/텍스트 변경 후 저장하면 즉시 반영됩니다.
          </p>
        </div>
      )}

      {tab === "password" && (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-md">
          <h2 className="font-semibold text-dark mb-6">비밀번호 변경</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">현재 비밀번호</label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">새 비밀번호</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark mb-1.5">새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary bg-bg"
              />
            </div>
            {pwMsg && (
              <p className={`text-sm ${pwMsg.includes("변경되었습니다") ? "text-primary" : "text-secondary"}`}>
                {pwMsg}
              </p>
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
