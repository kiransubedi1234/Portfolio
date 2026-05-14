"use client";
import { useRef, useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const issuerColors: Record<string, string> = {
  "Google / Coursera": "#4285f4",
  "Cisco Networking Academy": "#1ba0d7",
  "Linux Foundation (self-study)": "#f59e0b",
  "Pokhara University": "#003b73",
};

export default function CertificationsSection() {
  const { ref, inView } = useInView();
  const { certifications } = usePortfolioData();

  return (
    <section id="certifications" className="section" style={{ background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ marginBottom: 60 }}>
          <p className="section-label">04 // Certifications</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", whiteSpace: "nowrap" }}>
              Certifications & <span className="gradient-text">Learning</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: "0.9rem" }}>
            Formal certifications and self-directed learning achievements.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {certifications.map((cert, i) => {
            const color = issuerColors[cert.issuer] || "var(--accent-blue)";
            return (
              <div
                key={cert.id}
                className="card"
                style={{
                  padding: "24px",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease ${i * 100}ms`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Left color accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 3,
                    background: color,
                    borderRadius: "12px 0 0 12px",
                  }}
                />

                {/* Cert icon */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <svg width="22" height="22" fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>
                  {cert.title}
                </h3>

                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 12 }}>
                  {cert.issuer}
                </p>

                {cert.description && (
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 16 }}>
                    {cert.description}
                  </p>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      background: "var(--bg-surface)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {cert.date}
                  </span>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: color,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Verify
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
