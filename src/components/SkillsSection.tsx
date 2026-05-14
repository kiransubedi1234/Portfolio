"use client";
import { useRef, useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import type { Skill } from "@/types";

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

const categoryColor: Record<string, string> = {
  language: "var(--accent-blue)",
  os: "var(--accent-cyan)",
  framework: "#a78bfa",
  tool: "#f59e0b",
  database: "#10b981",
};

const categoryLabel: Record<string, string> = {
  language: "Language",
  os: "OS / Platform",
  framework: "Framework",
  tool: "Tool",
  database: "Database",
};

function SkillCard({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColor[skill.category] || "var(--accent-blue)";

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
        borderColor: hovered ? color : "var(--border)",
        boxShadow: hovered ? `0 0 20px ${color}30` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{skill.name}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: color,
            fontWeight: 600,
          }}
        >
          {skill.level}%
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: inView ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color === "var(--accent-blue)" ? "var(--accent-cyan)" : color})`,
          }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            padding: "2px 8px",
            borderRadius: 4,
            border: `1px solid ${color}40`,
            color: color,
            background: `${color}10`,
          }}
        >
          {categoryLabel[skill.category]}
        </span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView();
  const { skills } = usePortfolioData();

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="section" style={{ background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Heading */}
        <div ref={ref} style={{ marginBottom: 60 }}>
          <p className="section-label">02 // Skills</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", whiteSpace: "nowrap" }}>
              Tech <span className="gradient-text">Stack</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: "0.9rem" }}>
            Tools and technologies I work with, from systems programming to web deployment.
          </p>
        </div>

        {/* Terminal-style header */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--accent-cyan)",
            marginBottom: 28,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          cat skills.json
          <span style={{ color: "var(--text-muted)" }}> | python3 -m json.tool</span>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} inView={inView} delay={i * 60} />
          ))}
        </div>

        {/* Category legend */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            marginTop: 40,
            padding: "20px",
            background: "var(--bg-card)",
            borderRadius: 12,
            border: "1px solid var(--border)",
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", alignSelf: "center" }}>LEGEND:</span>
          {Object.entries(categoryLabel).map(([key, label]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: categoryColor[key] }} />
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
