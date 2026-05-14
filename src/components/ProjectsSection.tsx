"use client";
import { useRef, useEffect, useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import type { Project } from "@/types";

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

const categoryMeta: Record<string, { label: string; color: string }> = {
  network:      { label: "Network",      color: "#3b82f6" },
  cybersecurity:{ label: "Cyber",        color: "#ef4444" },
  linux:        { label: "Linux",        color: "#f59e0b" },
  web:          { label: "Web",          color: "#10b981" },
  iot:          { label: "IoT",          color: "#06b6d4" },
  other:        { label: "Other",        color: "#8b5cf6" },
};

function ProjectCard({ project, delay, inView }: { project: Project; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cat = categoryMeta[project.category];

  return (
    <div
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            padding: "3px 8px",
            borderRadius: 4,
            background: "var(--accent-blue-glow)",
            border: "1px solid var(--accent-blue)",
            color: "var(--accent-blue)",
            letterSpacing: "0.1em",
          }}
        >
          FEATURED
        </div>
      )}

      {/* Top line accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: hovered
            ? `linear-gradient(90deg, ${cat.color}, var(--accent-cyan))`
            : "transparent",
          transition: "background 0.3s ease",
        }}
      />

      {/* Category + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            padding: "2px 8px",
            borderRadius: 4,
            border: `1px solid ${cat.color}50`,
            color: cat.color,
            background: `${cat.color}12`,
          }}
        >
          {cat.label}
        </span>
      </div>

      <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 10, paddingRight: project.featured ? 80 : 0 }}>
        {project.title}
      </h3>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
        {expanded ? project.longDescription || project.description : project.description}
      </p>

      {project.longDescription && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "var(--accent-blue)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            cursor: "pointer",
            padding: 0,
            marginBottom: 16,
            textAlign: "left",
          }}
        >
          {expanded ? "[ collapse ]" : "[ read more ]"}
        </button>
      )}

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.techStack.map((tech) => (
          <span key={tech} className="badge">{tech}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid var(--border)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--accent-cyan)";
              el.style.color = "var(--accent-cyan)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text-secondary)";
            }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: "0.75rem", padding: "6px 14px" }}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref, inView } = useInView();
  const { projects } = usePortfolioData();
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section" style={{ background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ marginBottom: 48 }}>
          <p className="section-label">03 // Projects</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", whiteSpace: "nowrap" }}>
              Featured <span className="gradient-text">Work</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: "0.9rem" }}>
            A selection of projects spanning cybersecurity, systems programming, and web engineering.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 32,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {categories.map((cat) => {
            const isActive = filter === cat;
            const meta = categoryMeta[cat];
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${isActive ? (meta?.color || "var(--accent-blue)") : "var(--border)"}`,
                  background: isActive ? `${(meta?.color || "var(--accent-blue)")}18` : "transparent",
                  color: isActive ? (meta?.color || "var(--accent-blue)") : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
              >
                {cat}
              </button>
            );
          })}
          
          {filter !== "all" && (
            <a 
              href={`/projects/${filter}`}
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: categoryMeta[filter]?.color || "var(--accent-blue)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                border: "1px dashed currentColor",
                borderRadius: 6,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${categoryMeta[filter]?.color}12`;
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              Explore {filter.toUpperCase()} Domain
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
