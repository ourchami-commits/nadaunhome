"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      });
  }, []);

  const toggleRead = async (id: string, read: boolean) => {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !read }),
    });
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: !read } : i))
    );
  };

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("ko-KR", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) return <p className="text-subtext">불러오는 중...</p>;

  return (
    <div>
      <h1 className="font-heading text-dark text-2xl font-bold mb-8">
        문의 수신함
        {inquiries.filter((i) => !i.read).length > 0 && (
          <span className="ml-3 text-base bg-secondary text-white px-2.5 py-0.5 rounded-full">
            {inquiries.filter((i) => !i.read).length}
          </span>
        )}
      </h1>

      {inquiries.length === 0 ? (
        <p className="text-subtext">문의가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden ${!inq.read ? "border-l-4 border-secondary" : ""}`}
            >
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-bg transition-colors"
                onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-dark text-sm">{inq.name}</span>
                    <span className="text-xs bg-bg text-subtext px-2 py-0.5 rounded-full">{inq.type}</span>
                    {!inq.read && (
                      <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">NEW</span>
                    )}
                  </div>
                  <p className="text-subtext text-xs truncate">{inq.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-subtext">{formatDate(inq.createdAt)}</p>
                </div>
              </div>

              {expanded === inq.id && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 mt-4 mb-4 text-sm">
                    <div>
                      <span className="text-subtext">이메일</span>
                      <p className="text-dark font-medium">{inq.email}</p>
                    </div>
                    <div>
                      <span className="text-subtext">연락처</span>
                      <p className="text-dark font-medium">{inq.phone}</p>
                    </div>
                  </div>
                  <div className="bg-bg rounded-xl p-4 text-sm text-dark leading-relaxed whitespace-pre-wrap mb-4">
                    {inq.message}
                  </div>
                  <button
                    onClick={() => toggleRead(inq.id, inq.read)}
                    className="text-sm text-primary underline"
                  >
                    {inq.read ? "미확인으로 표시" : "확인 완료로 표시"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
