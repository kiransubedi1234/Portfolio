"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categoryMeta: Record<string, { label: string; color: string; icon: string; description: string }> = {
  network: { 
    label: "Network Engineering", 
    color: "#3b82f6", 
    icon: "🌐",
    description: "Architecting secure and high-performance communication systems, packet analysis, and distributed infrastructure."
  },
  cybersecurity: { 
    label: "Cybersecurity", 
    color: "#ef4444", 
    icon: "🛡️",
    description: "Proactive threat detection, vulnerability assessment, and implementing robust security frameworks."
  },
  linux: { 
    label: "Linux Systems", 
    color: "#f59e0b", 
    icon: "🐧",
    description: "System administration, kernel-level development, and high-efficiency automation scripting."
  },
  web: { 
    label: "Web Engineering", 
    color: "#10b981", 
    icon: "💻",
    description: "Building scalable, performant, and user-centric web applications with modern tech stacks."
  },
  iot: { 
    label: "Internet of Things", 
    color: "#06b6d4", 
    icon: "📡",
    description: "Bridging physical and digital worlds through embedded systems, real-time telemetry, and smart automation."
  },
  other: { 
    label: "Other Projects", 
    color: "#8b5cf6", 
    icon: "📁",
    description: "Miscellaneous technical experiments and collaborative research projects."
  },
};

// --- Creative Visual Components ---

function LinuxVisual() {
  return (
    <div className="card" style={{ padding: 20, background: "var(--terminal-bg)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", border: "1px solid var(--terminal-green)30" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
      </div>
      <div style={{ color: "var(--terminal-green)" }}>
        <p>$ uname -a</p>
        <p style={{ color: "var(--text-secondary)" }}>Linux kiran-dev 6.8.0-51-generic #51-Ubuntu SMP PREEMPT_DYNAMIC</p>
        <p style={{ marginTop: 8 }}>$ uptime</p>
        <p style={{ color: "var(--text-secondary)" }}>21:44:58 up 14 days, 3:24, 2 users, load average: 0.12, 0.08, 0.05</p>
        <p style={{ marginTop: 8 }}>$ <span className="cursor-blink">█</span></p>
      </div>
    </div>
  );
}

function IoTVisual() {
  return (
    <div className="card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
      <div className="scanline" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ 
            height: 40, 
            background: "var(--bg-surface)", 
            border: "1px solid var(--border)", 
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}>
            <div style={{ 
              width: 6, 
              height: 6, 
              borderRadius: "50%", 
              background: i === 3 ? "var(--accent-cyan)" : "var(--terminal-green)",
              position: "absolute",
              top: 6,
              right: 6,
              boxShadow: i === 3 ? "0 0 8px var(--accent-cyan)" : "none",
              animation: i === 3 ? "pulse 2s infinite" : "none"
            }} />
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>NODE_{i}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: 80, gap: 10 }}>
        {[98, 100, 95, 99].map((score, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ 
              width: "100%", 
              height: `${score}%`, 
              background: "linear-gradient(to top, var(--accent-blue), var(--accent-cyan))",
              borderRadius: "4px 4px 0 0",
              opacity: 0.8
            }} />
            <span style={{ fontSize: "0.6rem", marginTop: 4, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{score}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8 }}>
        <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>PERF</span>
        <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>ACC</span>
        <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>SEO</span>
        <span style={{ fontSize: "0.5rem", color: "var(--text-muted)" }}>PWA</span>
      </div>
    </div>
  );
}

function CyberVisual() {
  return (
    <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: "25%", height: "100%", background: "var(--accent-cyan)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>THREAT_LEVEL: LOW</span>
        <span style={{ fontSize: "0.7rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>SECURE</span>
      </div>
      <div style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.4 }}>
        SCANNING PORT 443...<br/>
        NO ANOMALIES DETECTED IN SESSION_349
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;
  const meta = categoryMeta[category] || categoryMeta.other;
  
  const filteredProjects = projects.filter(p => p.category === category);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          
          {/* Breadcrumb */}
          <div style={{ marginBottom: 32 }}>
            <Link href="/#projects" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>

          {/* Hero Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "center", marginBottom: 64 }}>
            <div className="fade-in-up">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: "2rem" }}>{meta.icon}</span>
                <span className="section-label" style={{ margin: 0 }}>Project Category</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: 20 }}>
                {meta.label.split(' ')[0]} <span className="gradient-text">{meta.label.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {meta.description}
              </p>
            </div>

            <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
              {category === "linux" && <LinuxVisual />}
              {category === "iot" && <IoTVisual />}
              {category === "web" && <WebVisual />}
              {category === "cybersecurity" && <CyberVisual />}
              {!["linux", "iot", "web", "cybersecurity"].includes(category) && (
                <div className="card" style={{ padding: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                   <span style={{ fontSize: "3rem", opacity: 0.2 }}>{meta.icon}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project List */}
          <div className="fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
              Active <span className="gradient-text">Repositories</span>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}>({filteredProjects.length})</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {filteredProjects.map((project) => (
                <div key={project.id} className="card" style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32 }}>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: 12 }}>{project.title}</h3>
                    <p style={{ color: "var(--text-secondary)", marginBottom: 20, fontSize: "0.95rem" }}>
                      {project.longDescription || project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {project.techStack.map(tech => (
                        <span key={tech} className="badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.8rem", width: "100%", justifyContent: "center" }}>
                        Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.8rem", width: "100%", justifyContent: "center" }}>
                        View Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)" }}>No projects found in this category yet. Stay tuned!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
