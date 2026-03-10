"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  keyword: string;
  text: string;
  className: string;
  visible: boolean;
}

const emptyForm = { keyword: "", text: "", className: "" };

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!form.keyword || !form.text || !form.className) return;
    setSaving(true);
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    setSaving(false);
    load();
  };

  const toggleVisible = async (id: string, visible: boolean) => {
    await fetch("/api/admin/testimonials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible: !visible }),
    });
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, visible: !visible } : t)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1 className="font-heading text-dark text-2xl font-bold mb-8">후기 관리</h1>

      {/* Add form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-dark mb-4">새 후기 추가</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-subtext mb-1">키워드 (예: 자신감 상승!)</label>
            <input
              value={form.keyword}
              onChange={(e) => setForm((p) => ({ ...p, keyword: e.target.value }))}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
              placeholder="자신감 상승!"
            />
          </div>
          <div>
            <label className="block text-xs text-subtext mb-1">클래스명</label>
            <input
              value={form.className}
              onChange={(e) => setForm((p) => ({ ...p, className: e.target.value }))}
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg"
              placeholder="AI 기초 클래스"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-xs text-subtext mb-1">후기 내용</label>
          <textarea
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            rows={3}
            className="w-full border border-border rounded-xl px-3 py-2.5 text-sm text-dark focus:outline-none focus:border-primary bg-bg resize-none"
            placeholder="후기 내용을 입력하세요..."
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={saving}
          className="bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
        >
          {saving ? "추가 중..." : "추가"}
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-subtext">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="text-subtext">후기가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-sm p-5 flex gap-4 items-start ${!item.visible ? "opacity-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-dark text-sm">{item.keyword}</span>
                  <span className="text-xs bg-bg text-subtext px-2 py-0.5 rounded-full">{item.className}</span>
                </div>
                <p className="text-subtext text-sm">{item.text}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleVisible(item.id, item.visible)}
                  className="text-xs text-primary underline"
                >
                  {item.visible ? "숨기기" : "표시"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-secondary underline"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
