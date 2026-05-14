"use client";
import Link from "next/link";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Footer() {
  const { profile } = usePortfolioData();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        padding: "48px 24px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circuit background */}
      <div
        className="circuit-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 32,
            alignItems: "center",
            marginBottom: 32,
          }}
          className="footer-grid"
        >
          {/* Logo + tagline */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <span style={{ color: "var(--accent-cyan)" }}>{">"}</span>
              <span className="gradient-text">kiran</span>
              <span style={{ color: "var(--accent-blue)" }}>subedi</span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>
              // Computer Engineering Student · Cybersecurity Enthusiast
            </p>
          </div>

          {/* Quick links */}
          <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["/#about", "/#skills", "/#projects", "/#certifications", "/#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="nav-link"
                style={{ fontSize: "0.78rem" }}
              >
                {href.split("#")[1]}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--border), transparent)", marginBottom: 24 }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
            © {year} {profile.name} · Built with Next.js & Firebase
          </span>

          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "GitHub", href: profile.github || "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
              { label: "Email", href: `mailto:${profile.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--accent-cyan)";
                  el.style.color = "var(--accent-cyan)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-muted)";
                }}
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.footer-grid{grid-template-columns:1fr !important;}}`}</style>
    </footer>
  );
}
