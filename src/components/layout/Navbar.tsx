"use client";

import { useState, useEffect } from "react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="text-dark font-heading font-semibold text-lg leading-tight"
          >
            나다운<br className="hidden sm:block" />
            <span className="text-primary text-sm font-body font-medium sm:hidden"> AI창작 워크룸</span>
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
            <a
              href="#classes"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              신청하기
            </a>
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
          <div className="md:hidden bg-white border-t border-border py-4 px-2">
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
              className="mt-4 block text-center bg-primary text-white font-semibold py-3 rounded-full"
            >
              신청하기
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
