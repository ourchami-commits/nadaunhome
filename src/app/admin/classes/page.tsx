"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ClassData {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  target: string[];
  durationLabel: string;
  outcome: string;
  applyUrl: string;
  imageUrl: string;
  visible: boolean;
  sortOrder: number;
}

const emptyForm = {
  tabLabel: "",
  title: "",
  subtitle: "",
  targetStr: "",
  durationLabel: "6주 정규 과정",
  outcome: "",
  applyUrl: "",
  imageUrl: "",
  sortOrder: 0,
};

export default function ClassAdminPage() {
  const [items, setItems] = useState<ClassData[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [seeding, setSeeding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetch("/api/admin/classes")
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});

  useEffect(() => { load(); }, []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("이미지 파일이 너무 큽니다. 4MB 이하의 파일을 사용해주세요.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = res.ok ? await res.json() : { error: `파일이 너무 크거나 서버 오류 (${res.status})` };
      if (data.url) {
        setForm((p) => ({ ...p, imageUrl: data.url }));
      } else {
        alert(`이미지 업로드 실패: ${data.error ?? "알 수 없는 오류"}`);
        setPreview("");
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch (err) {
      alert(`이미지 업로드 실패: ${err}`);
      setPreview("");
      if (fileRef.current) fileRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.tabLabel.trim()) return;
    setSaving(true);
    const { targetStr, ...rest } = form;
    const payload = {
      ...rest,
      target: targetStr.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (editId) {
      await fetch("/api/admin/classes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...payload }),
      });
      setEditId(null);
    } else {
      await fetch("/api/admin/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setForm(emptyForm);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
    setSaving(false);
    load();
  };

  const toggleVisible = async (item: ClassData) => {
    await fetch("/api/admin/classes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, visible: !item.visible }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("삭제하시겠어요?")) return;
    await fetch("/api/admin/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const startEdit = (item: ClassData) => {
    setEditId(item.id);
    setPreview(item.imageUrl || "");
    setForm({
      tabLabel: item.tabLabel,
      title: item.title,
      subtitle: item.subtitle || "",
      targetStr: (item.target || []).join(", "),
      durationLabel: item.durationLabel || "6주 정규 과정",
      outcome: item.outcome || "",
      applyUrl: item.applyUrl || "",
      imageUrl: item.imageUrl || "",
      sortOrder: item.sortOrder ?? 0,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const seed = async () => {
    setSeeding(true);
    await fetch("/api/admin/classes/seed", { method: "POST" });
    setSeeding(false);
    load();
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-dark">클래스 관리</h1>
        <button
          onClick={seed}
          disabled={seeding}
          className="text-xs px-4 py-2 rounded-lg border border-border text-subtext hover:text-dark disabled:opacity-60"
        >
          {seeding ? "불러오는 중..." : "기본 클래스 불러오기"}
        </button>
      </div>

      {/* 입력 폼 */}
      <div className="bg-white rounded-2xl shadow-card p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-dark">{editId ? "클래스 수정" : "새 클래스 추가"}</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-subtext mb-1">탭 이름 *</label>
            <input
              value={form.tabLabel}
              onChange={(e) => setForm({ ...form, tabLabel: e.target.value })}
              placeholder="예) 시 그림책"
              className="form-input"
            />
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
          <label className="block text-xs text-subtext mb-1">클래스 제목 *</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="예) AI활용 시 그림책 출판 클래스"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">부제목</label>
          <input
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="예) 내 시와 AI 그림으로 나만의 그림책 만들기"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">추천 대상 (쉼표로 구분)</label>
          <input
            value={form.targetStr}
            onChange={(e) => setForm({ ...form, targetStr: e.target.value })}
            placeholder="예) 글쓰기를 좋아하는 분, 시나 짧은 글을 그림책으로 만들고 싶은 분"
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-subtext mb-1">기간 표시</label>
            <input
              value={form.durationLabel}
              onChange={(e) => setForm({ ...form, durationLabel: e.target.value })}
              placeholder="예) 6주 정규 과정"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-xs text-subtext mb-1">완성 결과물</label>
            <input
              value={form.outcome}
              onChange={(e) => setForm({ ...form, outcome: e.target.value })}
              placeholder="예) 내 시로 완성한 그림책 1권"
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">
            신청 URL (없으면 &apos;준비 중&apos; 표시, #contact 입력 시 문의 링크)
          </label>
          <input
            value={form.applyUrl}
            onChange={(e) => setForm({ ...form, applyUrl: e.target.value })}
            placeholder="https://... 또는 #contact"
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-xs text-subtext mb-1">클래스 이미지 (선택)</label>
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
        {items.length === 0 && (
          <p className="text-subtext text-sm">
            등록된 클래스가 없습니다. &apos;기본 클래스 불러오기&apos;를 눌러 시작하세요.
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-card p-4 flex items-start gap-4">
            {item.imageUrl && (
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-border">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#F3F8FC", color: "#5E7A52" }}
                >
                  {item.tabLabel}
                </span>
                <span className="text-xs text-subtext">순서 {item.sortOrder}</span>
              </div>
              <p className="font-semibold text-dark text-sm">{item.title}</p>
              {item.subtitle && <p className="text-xs text-subtext mt-0.5">{item.subtitle}</p>}
              {item.outcome && <p className="text-xs text-subtext mt-0.5">결과물: {item.outcome}</p>}
              {item.applyUrl && (
                <p className="text-xs text-subtext mt-0.5 truncate">🔗 {item.applyUrl}</p>
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
              <button
                onClick={() => startEdit(item)}
                className="text-xs px-3 py-1.5 rounded-lg border border-border text-subtext hover:text-dark"
              >
                수정
              </button>
              <button
                onClick={() => remove(item.id)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:text-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
