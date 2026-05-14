"use client";
import { useRef, useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function useInView(threshold = 0.15) {
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

function ContribGrid() {
  // Generate a simple 52-week x 7-day contribution grid
  const weeks = 26;
  const days = 7;
  const colors = ["#1a1f2e", "#0d3a5c", "#0a5096", "#1a6aff", "#06d6c7"];

  return (
    <div>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {Array.from({ length: days }, (_, d) => {
              const seed = (w * 7 + d) * 13 + 7;
              const val = seed % 5 === 0 ? 4 : seed % 4 === 0 ? 3 : seed % 3 === 0 ? 2 : seed % 2 === 0 ? 1 : 0;
              return (
                <div
                  key={d}
                  className="contrib-cell"
                  title={`${val * 3} contributions`}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 3,
                    background: colors[val],
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Less</span>
        {colors.map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 3, background: c }} />
        ))}
        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>More</span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView();
  const { profile, projects, certifications, skills } = usePortfolioData();

  const statCards = [
    { label: "Projects", value: `${projects.length}+`, icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
    { label: "Certifications", value: `${certifications.length}`, icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { label: "Tech Skills", value: `${skills.length}+`, icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { label: "Commits", value: "300+", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  ];

  return (
    <section id="about" className="section" style={{ background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div ref={ref} style={{ marginBottom: 60 }}>
          <p className="section-label">01 // About</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", whiteSpace: "nowrap" }}>
              About <span className="gradient-text">Me</span>
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
          className="about-grid"
        >
          {/* Left col */}
          <div>
            {/* Avatar placeholder */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                fontSize: "2.5rem",
                border: "3px solid var(--border)",
                boxShadow: "0 0 30px var(--accent-blue-glow)",
                position: "relative",
              }}
            >
              <span>👨‍💻</span>
              {/* pulse ring */}
              <div style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: "2px solid var(--accent-blue)",
                opacity: 0.4,
                animation: "pulseRing 2s ease-out infinite",
              }} />
              <style>{`@keyframes pulseRing { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.3); opacity: 0; } }`}</style>
            </div>

            <h3 style={{ fontSize: "1.3rem", marginBottom: 4 }}>{profile.name}</h3>
            <p style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginBottom: 16 }}>
              {profile.title}
            </p>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24, fontSize: "0.92rem" }}>
              {profile.bio}
            </p>

            {/* Meta info */}
            {[
              { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: profile.location },
              { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: profile.email },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <svg width="16" height="16" fill="none" stroke="var(--accent-blue)" strokeWidth="2" viewBox="0 0 24 24">
                  <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", fontFamily: "var(--font-mono)" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* System stats cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {statCards.map((s) => (
                <div
                  key={s.label}
                  className="card"
                  style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "var(--accent-blue-glow)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <svg width="18" height="18" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{s.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-cyan)", marginBottom: 12 }}>
                // github activity — last 6 months
              </div>
              <ContribGrid />
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
