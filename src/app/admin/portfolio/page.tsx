"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CATEGORIES = ["그림책", "카드뉴스", "영상", "ebook"] as const;
type Category = typeof CATEGORIES[number];

interface PortfolioItem {
  id: string;
  category: Category;
  title: string;
  desc: string;
  imageUrl: string;
  purchaseUrl: string;
  visible: boolean;
  sortOrder: number;
}

const empty = { category: "그림책" as Category, title: "", desc: "", imageUrl: "", purchaseUrl: "", sortOrder: 0 };

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setForm((p) => ({ ...p, imageUrl: data.url }));
    } else {
      alert("이미지 업로드에 실패했습니다.");
      setPreview("");
    }
  };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editId) {
      await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
      setEditId(null);
    } else {
      await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(empty);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
    load();
  };

  const toggleVisible = async (item: PortfolioItem) => {
    await fetch("/api/admin/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, visible: !item.visible }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("삭제하시겠어요?")) return;
    await fetch("/api/admin/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const startEdit = (item: PortfolioItem) => {
    setEditId(item.id);
    setPreview(item.imageUrl || "");
    setForm({
      category: item.category,
      title: item.title,
      desc: item.desc,
      imageUrl: item.imageUrl || "",
      purchaseUrl: item.purchaseUrl || "",
      sortOrder: item.sortOrder ?? 0,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(empty);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-bold text-dark mb-6">포트폴리오 관리</h1>

      {/* 입력 폼 */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-dark">{editId ? "카드 수정" : "새 카드 추가"}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-subtext mb-1">카테고리</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="form-input"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-subtext mb-1">순서 (숫자 작을수록 앞)</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">제목 *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="예) 나만의 그림책 만들기"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">설명</label>
          <input
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="예) 맞춤 그림과 이야기로 나만의 그림책 1권"
            className="form-input"
          />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <label className="block text-xs text-subtext mb-1">이미지 (선택)</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full text-sm text-subtext file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"
          />
          {uploading && <p className="text-xs text-subtext mt-1">업로드 중...</p>}
          {preview && !uploading && (
            <div className="mt-2 relative w-32 h-24 rounded-lg overflow-hidden border border-border">
              <Image src={preview} alt="미리보기" fill className="object-cover" unoptimized />
            </div>
          )}
        </div>

        {/* 구매 링크 */}
        <div>
          <label className="block text-xs text-subtext mb-1">구매 링크 (선택 — 이미지 클릭 시 이동)</label>
          <input
            value={form.purchaseUrl}
            onChange={(e) => setForm({ ...form, purchaseUrl: e.target.value })}
            placeholder="https://..."
            className="form-input"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={save}
            disabled={saving || uploading}
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
        {items.length === 0 && <p className="text-subtext text-sm">등록된 포트폴리오가 없습니다.</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-card p-4 flex items-start gap-4">
            {/* 썸네일 */}
            {item.imageUrl && (
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-border">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F3F8FC", color: "#5E7A52" }}>
                  {item.category}
                </span>
                <span className="text-xs text-subtext">순서 {item.sortOrder}</span>
              </div>
              <p className="font-semibold text-dark text-sm">{item.title}</p>
              {item.desc && <p className="text-xs text-subtext mt-0.5">{item.desc}</p>}
              {item.purchaseUrl && (
                <p className="text-xs text-subtext mt-0.5 truncate">🔗 {item.purchaseUrl}</p>
              )}
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
        ))}
      </div>
    </div>
  );
}
