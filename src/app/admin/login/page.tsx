"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm p-10 w-full max-w-sm">
        <h1 className="font-heading text-dark text-2xl font-bold mb-2 text-center">관리자</h1>
        <p className="text-subtext text-sm text-center mb-8">나다운 AI창작 워크룸</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full border border-border rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary transition-colors bg-bg"
              autoFocus
            />
          </div>

          {error && <p className="text-secondary text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-colors"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
