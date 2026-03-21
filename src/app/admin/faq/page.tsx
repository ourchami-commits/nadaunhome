"use client";

import { useEffect, useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
  sortOrder: number;
}

const empty = { question: "", answer: "", sortOrder: 0 };

export default function FaqAdminPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const load = () =>
    fetch("/api/admin/faq")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) return;
    setSaving(true);
    if (editId) {
      await fetch("/api/admin/faq", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
      setEditId(null);
    } else {
      await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(empty);
    setSaving(false);
    load();
  };

  const toggleVisible = async (item: FaqItem) => {
    await fetch("/api/admin/faq", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, visible: !item.visible }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("삭제하시겠어요?")) return;
    await fetch("/api/admin/faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const startEdit = (item: FaqItem) => {
    setEditId(item.id);
    setForm({ question: item.question, answer: item.answer, sortOrder: item.sortOrder ?? 0 });
  };

  const cancelEdit = () => { setEditId(null); setForm(empty); };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-bold text-dark mb-2">FAQ 관리</h1>
      <p className="text-sm text-subtext mb-6">Firestore에 FAQ가 없으면 코드 내 기본 FAQ가 표시됩니다.</p>

      {/* 입력 폼 */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-dark">{editId ? "FAQ 수정" : "새 FAQ 추가"}</h2>

        <div>
          <label className="block text-xs text-subtext mb-1">순서 (숫자 작을수록 앞)</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            className="form-input w-32"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">질문 *</label>
          <input
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            placeholder="예) AI를 전혀 몰라도 괜찮나요?"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">답변 *</label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            rows={4}
            placeholder="답변 내용을 입력해주세요."
            className="form-input resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60"
            style={{ backgroundColor: "#3D6B35" }}
          >
            {saving ? "저장 중..." : editId ? "수정 저장" : "추가"}
          </button>
          {editId && (
            <button onClick={cancelEdit} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-border">
              취소
            </button>
          )}
        </div>
      </div>

      {/* 목록 */}
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-subtext text-sm">등록된 FAQ가 없습니다. 추가하면 코드 기본값을 대체합니다.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-subtext">순서 {item.sortOrder}</span>
                </div>
                <p className="font-semibold text-dark text-sm mb-1">Q. {item.question}</p>
                <p className="text-xs text-subtext leading-relaxed whitespace-pre-wrap">{item.answer}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleVisible(item)}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
                  style={{
                    borderColor: item.visible ? "#C9E3B2" : "#D6E4EE",
                    backgroundColor: item.visible ? "#F0F9E8" : "#F8FAFC",
                    color: item.visible ? "#3D6B35" : "#7A8899",
                  }}
                >
                  {item.visible ? "노출 중" : "숨김"}
                </button>
                <button onClick={() => startEdit(item)} className="text-xs px-3 py-1.5 rounded-lg border border-border text-subtext hover:text-dark">
                  수정
                </button>
                <button onClick={() => remove(item.id)} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:text-red-600">
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
