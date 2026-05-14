"use client";
import { useState, useEffect } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const TYPING_PHRASES = [
  "Computer Engineering Student",
  "Cybersecurity Enthusiast",
  "Linux Power User",
  "Open Source Contributor",
  "Python Developer",
];

function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < phrase.length) {
      timeout = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span>
      <span style={{ color: "var(--accent-cyan)" }}>{displayed}</span>
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "1em",
          background: "var(--accent-blue)",
          marginLeft: 2,
          verticalAlign: "middle",
        }}
        className="cursor-blink"
      />
    </span>
  );
}

function CircuitBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Grid */}
      <div
        className="circuit-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.6 }}
      />

      {/* Corner accent — top-right */}
      <svg
        style={{ position: "absolute", top: 0, right: 0, opacity: 0.15 }}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path d="M400 0 L400 200 L300 200 L300 100 L200 100 L200 0 Z" stroke="#1a6aff" strokeWidth="1" fill="none" />
        <path d="M400 0 L400 300 L250 300 L250 150 L150 150 L150 0 Z" stroke="#06d6c7" strokeWidth="0.5" fill="none" />
        <circle cx="300" cy="100" r="4" fill="#1a6aff" opacity="0.8" />
        <circle cx="200" cy="100" r="4" fill="#06d6c7" opacity="0.8" />
        <circle cx="300" cy="200" r="3" fill="#1a6aff" opacity="0.5" />
        <line x1="300" y1="100" x2="300" y2="200" stroke="#1a6aff" strokeWidth="1" />
        <line x1="300" y1="100" x2="200" y2="100" stroke="#1a6aff" strokeWidth="1" />
      </svg>

      {/* Corner accent — bottom-left */}
      <svg
        style={{ position: "absolute", bottom: 0, left: 0, opacity: 0.12 }}
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path d="M0 300 L0 100 L100 100 L100 200 L200 200 L200 300 Z" stroke="#06d6c7" strokeWidth="1" fill="none" />
        <circle cx="100" cy="200" r="4" fill="#06d6c7" opacity="0.8" />
        <circle cx="100" cy="100" r="3" fill="#1a6aff" opacity="0.6" />
      </svg>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "var(--accent-blue)" : "var(--accent-cyan)",
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 11) % 90}%`,
            opacity: 0.3 + (i % 3) * 0.1,
            animation: `float${i % 3} ${3 + (i % 4)}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes float0 { from { transform: translateY(0); } to { transform: translateY(-12px); } }
        @keyframes float1 { from { transform: translateY(0); } to { transform: translateY(-8px) translateX(6px); } }
        @keyframes float2 { from { transform: translateY(0); } to { transform: translateY(-15px) translateX(-4px); } }
      `}</style>
    </div>
  );
}

export default function HeroSection() {
  const { profile, projects, blogPosts } = usePortfolioData();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <CircuitBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "120px 24px 80px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 60,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent-blue)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "var(--accent-cyan)" }}>~/</span> Hello World
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            {profile.name.split(" ").map((word, i) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="gradient-text">{word} </span>
                ) : (
                  <span>{word}</span>
                )}
              </span>
            ))}
          </h1>

          <div
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
              marginBottom: 24,
              minHeight: "1.6em",
            }}
          >
            <TypingText />
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 520,
              fontSize: "0.95rem",
              lineHeight: 1.8,
              marginBottom: 36,
            }}
          >
            {profile.bio}
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#projects" className="btn-primary">
              View Projects
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Resume
            </a>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {[
              { label: "GitHub", href: profile.github || "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
              { label: "LinkedIn", href: profile.linkedin || "#", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
              { label: "Email", href: `mailto:${profile.email}`, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--accent-cyan)";
                  el.style.color = "var(--accent-cyan)";
                  el.style.boxShadow = "0 0 12px var(--accent-cyan-glow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-secondary)";
                  el.style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Right — terminal widget */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.9s ease 0.2s",
          }}
          className="hero-terminal"
        >
          <TerminalWidget />
          
          {/* Live Status Indicator */}
          <div style={{ 
            marginTop: 16, 
            padding: "8px 16px", 
            background: "rgba(6,214,199,0.05)", 
            border: "1px solid rgba(6,214,199,0.2)", 
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent-cyan)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: 0.8
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-cyan)", animation: "pulse 2s infinite" }} />
            <span>SYS_STATUS: <span style={{ color: "var(--text-primary)" }}>OPERATIONAL</span></span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span>UPLINK: <span style={{ color: "var(--text-primary)" }}>ENCRYPTED</span></span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span>LAST_MOD: <span style={{ color: "var(--text-primary)" }}>
              {(() => {
                const dates = [
                  ...projects.map(p => new Date(p.updatedAt)),
                  ...blogPosts.map(p => new Date(p.updatedAt))
                ].filter(d => !isNaN(d.getTime()));
                if (dates.length === 0) return "2025-05-13";
                const latest = new Date(Math.max(...dates.map(d => d.getTime())));
                return latest.toLocaleDateString();
              })()}
            </span></span>
            <style>{`@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }`}</style>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.5,
          animation: "float0 2s ease-in-out infinite alternate",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--text-muted)" }}>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="5" y="1" width="6" height="14" rx="3" stroke="var(--text-muted)" strokeWidth="1.5" />
          <circle cx="8" cy="5" r="1.5" fill="var(--accent-blue)" style={{ animation: "scrollDot 2s ease infinite" }} />
        </svg>
        <style>{`@keyframes scrollDot { 0%,100% { transform: translateY(0); opacity: 1; } 80% { transform: translateY(8px); opacity: 0; } }`}</style>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-terminal { display: none; }
        }
      `}</style>
    </section>
  );
}

function TerminalWidget() {
  const [lines, setLines] = useState<Array<{ text: string; type: string }>>([]);
  const terminalData = [
    { delay: 0, text: "$ whoami", type: "command" },
    { delay: 400, text: "kiran-subedi", type: "output" },
    { delay: 900, text: "$ cat skills.txt", type: "command" },
    { delay: 1300, text: "C++  Python  Linux  Next.js  Firebase", type: "output" },
    { delay: 1800, text: "$ pwd", type: "command" },
    { delay: 2100, text: "/home/kiran/projects", type: "output" },
    { delay: 2600, text: "$ ls -la", type: "command" },
    { delay: 3000, text: "drwxr-xr-x  netsentinel", type: "output" },
    { delay: 3200, text: "drwxr-xr-x  cyberops-dashboard", type: "output" },
    { delay: 3400, text: "drwxr-xr-x  linux-toolkit", type: "output" },
    { delay: 3800, text: "$ echo $STATUS", type: "command" },
    { delay: 4200, text: "open_to_opportunities=true", type: "output" },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    terminalData.forEach((item) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, { text: item.text, type: item.type }]);
      }, item.delay + 600);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: 340,
        background: "var(--terminal-bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(26,106,255,0.1), 0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginLeft: 8 }}>
          kiran@dev ~ bash
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "16px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          lineHeight: 1.8,
          minHeight: 260,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="scanline" />
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.type === "command" ? "var(--accent-cyan)" : "var(--text-secondary)" }}>
            {line.text}
          </div>
        ))}
        {lines.length < terminalData.length + 1 && (
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 14,
              background: "var(--accent-blue)",
            }}
            className="cursor-blink"
          />
        )}
      </div>
    </div>
  );
}
