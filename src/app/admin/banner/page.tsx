"use client";

import { useEffect, useState } from "react";

export default function BannerPage() {
  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setEnabled(data.banner_enabled === "true");
        setText(data.banner_text || "");
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        banner_enabled: String(enabled),
        banner_text: text,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-dark text-2xl font-bold">공지 배너 관리</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-dark">배너 표시</p>
            <p className="text-subtext text-sm mt-0.5">홈페이지 상단에 공지 배너를 표시합니다.</p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-border"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-dark mb-1.5">배너 텍스트</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 🌿 4월 신규 클래스 모집 중! 지금 바로 신청하세요 →"
            className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary transition-colors bg-bg"
          />
        </div>

        {enabled && text && (
          <div>
            <p className="text-sm text-subtext mb-2">미리보기</p>
            <div className="bg-primary text-white text-center text-sm py-2.5 px-4 rounded-xl">
              {text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
