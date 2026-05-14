"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "about", href: "/#about" },
  { label: "skills", href: "/#skills" },
  { label: "projects", href: "/#projects" },
  { label: "certs", href: "/#certifications" },
  { label: "contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // active section detection
      const sections = navItems.map((n) => n.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(8, 12, 16, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "var(--accent-cyan)" }}>{">"}</span>
          <span>kiran</span>
          <span style={{ color: "var(--accent-blue)" }}>_</span>
          <span style={{
            width: 8, height: 16,
            background: "var(--accent-blue)",
            display: "inline-block",
            animation: "blink 1.2s step-end infinite",
          }} />
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="hidden-mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{
                color: active === item.href.replace("#", "")
                  ? "var(--accent-cyan)"
                  : "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--accent-blue)", marginRight: 2 }}>./</span>
              {item.label}
            </a>
          ))}
          <Link
            href="/admin"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--accent-blue)";
              (e.target as HTMLElement).style.color = "var(--accent-blue)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
              (e.target as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            [admin]
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: menuOpen && i === 1
                  ? "transparent"
                  : "var(--text-secondary)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform:
                  menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                  : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(8,12,16,0.97)",
            borderTop: "1px solid var(--border)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "1rem" }}
            >
              <span style={{ color: "var(--accent-blue)", marginRight: 6 }}>./</span>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}
