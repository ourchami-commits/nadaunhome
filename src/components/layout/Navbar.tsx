"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "클래스 소개", href: "#classes" },
  { label: "기관 특강", href: "#contact" },
  { label: "수강 후기", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`transition-all duration-300 ${
        scrolled ? "bg-[#FFFEFB]/95 backdrop-blur-sm shadow-card" : "bg-transparent"
      }`}
    >
      <div className="section-inner">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="나다운 AI활용 창작 워크룸"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-subtext hover:text-dark text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#classes" className="btn-sm" style={{ backgroundColor: "#3D6B35", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2E5229")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3D6B35")}
            >신청하기</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-dark"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FFFEFB] border-t border-border py-4 px-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-2 text-dark font-medium text-base border-b border-border last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#classes"
              onClick={() => setMenuOpen(false)}
              className="mt-4 btn w-full"
              style={{ backgroundColor: "#3D6B35", color: "#fff" }}
            >
              신청하기
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
