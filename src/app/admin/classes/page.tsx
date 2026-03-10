"use client";

import { useEffect, useState } from "react";

// 기존 클래스 URL 관리
const EXISTING_KEYS = [
  { id: "basic", label: "AI 기초" },
  { id: "poem-picturebook", label: "시 그림책" },
  { id: "picturebook", label: "그림책 출판" },
  { id: "video", label: "AI 영상제작" },
];
const TRACK_KEYS = [
  { key: "regular", label: "6주 정규" },
  { key: "challenge", label: "2주 챌린지" },
];

interface CustomClass {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  applyUrl: string;
  visible: boolean;
}

const emptyForm = { tabLabel: "", title: "", subtitle: "", applyUrl: "" };

export default function ClassesPage() {
  const [tab, setTab] = useState<"existing" | "custom">("existing");

  // 기존 클래스 URL
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [urlSaving, setUrlSaving] = useState(false);
  const [urlSaved, setUrlSaved] = useState(false);

  // 신규 클래스
  const [classes, setClasses] = useState<CustomClass[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        const classUrls: Record<string, string> = {};
        EXISTING_KEYS.forEach(({ id }) => {
          TRACK_KEYS.forEach(({ key }) => {
            const k = `class_${id}_${key}`;
            classUrls[k] = data[k] || "";
          });
        });
        setUrls(classUrls);
      });

    fetch("/api/admin/classes")
      .then((r) => r.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      });
  }, []);

  const saveUrls = async () => {
    setUrlSaving(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(urls),
    });
    setUrlSaving(false);
    setUrlSaved(true);
    setTimeout(() => setUrlSaved(false), 2000);
  };

  const addClass = async () => {
    if (!form.tabLabel || !form.title) return;
    setAdding(true);
    const res = await fetch("/api/admin/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const { id } = await res.json();
    setClasses((prev) => [...prev, { id, ...form, visible: true }]);
    setForm(emptyForm);
    setAdding(false);
  };

  const toggleVisible = async (id: string, visible: boolean) => {
    await fetch("/api/admin/classes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !visible }),
    });
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, visible: !visible } : c)));
  };

  const deleteClass = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateClassUrl = async (id: string, applyUrl: string) => {
    await fetch("/api/admin/classes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, applyUrl }),
    });
  };

  return (
    <div>
      <h1 className="font-heading text-dark text-2xl font-bold mb-6">클래스 관리</h1>

      {/* Tab */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("existing")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "existing" ? "bg-primary text-white" : "bg-white text-subtext"}`}
        >
          기존 클래스 URL
        </button>
        <button
          onClick={() => setTab("custom")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "custom" ? "bg-primary text-white" : "bg-white text-subtext"}`}
        >
          신규 클래스 추가
        </button>
      </div>

      {tab === "existing" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={saveUrls}
              disabled={urlSaving}
              className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors"
            >
              {urlSaving ? "저장 중..." : urlSaved ? "저장됨 ✓" : "저장"}
            </button>
          </div>
          <div className="space-y-4">
            {EXISTING_KEYS.map(({ id, label }) => (
              <div key={id} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-semibold text-dark mb-3">{label}</h2>
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
                        className="w-full border border-border rounded-xl px-4 py-2.5 text-dark text-sm focus:outline-none focus:border-primary bg-bg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "custom" && (
        <div>
          {/* Add form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="font-semibold text-dark mb-4">새 클래스 추가</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-subtext mb-1">탭 이름 (짧게) *</label>
                <input
                  value={form.tabLabel}
                  onChange={(e) => setForm((p) => ({ ...p, tabLabel: e.target.value }))}
                  placeholder="예: AI 글쓰기"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
                />
              </div>
              <div>
                <label className="block text-xs text-subtext mb-1">클래스 제목 *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="예: AI활용 글쓰기 클래스"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs text-subtext mb-1">부제목</label>
              <input
                value={form.subtitle}
                onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="예: AI로 나만의 글 완성하기"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs text-subtext mb-1">신청 URL</label>
              <input
                type="url"
                value={form.applyUrl}
                onChange={(e) => setForm((p) => ({ ...p, applyUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
              />
            </div>
            <button
              onClick={addClass}
              disabled={adding || !form.tabLabel || !form.title}
              className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              {adding ? "추가 중..." : "클래스 추가"}
            </button>
          </div>

          {/* List */}
          {loading ? (
            <p className="text-subtext">불러오는 중...</p>
          ) : classes.length === 0 ? (
            <p className="text-subtext text-sm">추가된 클래스가 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className={`bg-white rounded-2xl shadow-sm p-5 ${!cls.visible ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-dark">{cls.title}</span>
                        <span className="text-xs bg-bg text-subtext px-2 py-0.5 rounded-full">{cls.tabLabel}</span>
                      </div>
                      {cls.subtitle && <p className="text-subtext text-sm">{cls.subtitle}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => toggleVisible(cls.id, cls.visible)} className="text-xs text-primary underline">
                        {cls.visible ? "숨기기" : "표시"}
                      </button>
                      <button onClick={() => deleteClass(cls.id)} className="text-xs text-secondary underline">
                        삭제
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-subtext mb-1">신청 URL</label>
                    <input
                      type="url"
                      defaultValue={cls.applyUrl}
                      onBlur={(e) => updateClassUrl(cls.id, e.target.value)}
                      placeholder="https://..."
                      className="w-full border border-border rounded-xl px-3 py-2 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
