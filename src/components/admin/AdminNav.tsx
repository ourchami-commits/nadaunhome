"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "대시보드" },
  { href: "/admin/inquiries", label: "문의 수신함" },
  { href: "/admin/classes", label: "클래스 링크" },
  { href: "/admin/banner", label: "공지 배너" },
  { href: "/admin/testimonials", label: "후기 관리" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-56 bg-white border-r border-border flex flex-col py-8 px-4 shrink-0">
      <div className="mb-8">
        <p className="font-heading font-bold text-dark text-base leading-tight">나다운</p>
        <p className="text-subtext text-xs">관리자</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-primary text-white"
                : "text-subtext hover:text-dark hover:bg-bg"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="text-sm text-subtext hover:text-dark transition-colors text-left px-3 py-2"
      >
        로그아웃
      </button>
    </aside>
  );
}
