"use client";

import { useEffect, useState } from "react";

const CLASS_KEYS = [
  { id: "basic", label: "AI 기초" },
  { id: "poem-picturebook", label: "시 그림책" },
  { id: "picturebook", label: "그림책 출판" },
  { id: "video", label: "AI 영상제작" },
];

const TRACK_KEYS = [
  { key: "regular", label: "6주 정규" },
  { key: "challenge", label: "2주 챌린지" },
];

export default function ClassesPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const classUrls: Record<string, string> = {};
        CLASS_KEYS.forEach(({ id }) => {
          TRACK_KEYS.forEach(({ key }) => {
            const k = `class_${id}_${key}`;
            classUrls[k] = data[k] || "";
          });
        });
        setUrls(classUrls);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(urls),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-dark text-2xl font-bold">클래스 링크 관리</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
        </button>
      </div>

      <div className="space-y-6">
        {CLASS_KEYS.map(({ id, label }) => (
          <div key={id} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-dark mb-4">{label}</h2>
            <div className="space-y-3">
              {TRACK_KEYS.map(({ key, label: trackLabel }) => (
                <div key={key}>
                  <label className="block text-xs text-subtext mb-1">{trackLabel} 신청 URL</label>
                  <input
                    type="url"
                    value={urls[`class_${id}_${key}`] || ""}
                    onChange={(e) =>
                      setUrls((prev) => ({ ...prev, [`class_${id}_${key}`]: e.target.value }))
                    }
                    placeholder="https://..."
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-bg"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
