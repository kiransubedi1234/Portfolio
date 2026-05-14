"use client";
import { useRef, useEffect, useState, FormEvent } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { profile } from "@/data/portfolio";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

export default function ContactSection() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    if (!executeRecaptcha) {
      setError("ReCaptcha not yet available");
      setStatus("error");
      return;
    }

    try {
      const captchaToken = await executeRecaptcha("contact_form");
      
      // 1. Save to Firestore (for Admin Dashboard)
      await addDoc(collection(db, "messages"), {
        ...form,
        read: false,
        createdAt: serverTimestamp(),
      });

      // 2. Send to Formspree (for Gmail Notifications)
      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
      if (formspreeUrl) {
        try {
          const response = await fetch(formspreeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ ...form, "g-recaptcha-response": captchaToken }),
          });
          
          if (!response.ok) {
            const data = await response.json();
            console.error("Formspree Error:", data);
            // We don't block the UI here because it's already saved to Firestore
          }
        } catch (err) {
          console.error("Formspree Fetch Error:", err);
        }
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Failed to send message. Please try again or email directly.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "12px 16px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section id="contact" className="section" style={{ background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div ref={ref} style={{ marginBottom: 60 }}>
          <p className="section-label">05 // Contact</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", whiteSpace: "nowrap" }}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 12, fontSize: "0.9rem" }}>
            Available for internships, collaborations, and interesting projects.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
          className="contact-grid"
        >
          {/* Left - info */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--accent-cyan)",
                marginBottom: 24,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>$ </span>
              ping kiran@pokhara-dev-machine
            </div>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.92rem" }}>
              I&apos;m a Computer Engineering student always looking to connect with fellow developers,
              security researchers, and open-source enthusiasts. Whether you have a project idea,
              an internship opportunity, or just want to chat about Linux — my inbox is open.
            </p>

            {[
              {
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                label: "Email",
                value: profile.email,
                href: `mailto:${profile.email}`,
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Location",
                value: profile.location,
                href: null,
              },
              {
                icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                label: "GitHub",
                value: "github.com/kiransubedi",
                href: profile.github,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "var(--accent-blue-glow)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" fill={item.label === "GitHub" ? "var(--accent-blue)" : "none"} stroke={item.label !== "GitHub" ? "var(--accent-blue)" : "none"} strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 2 }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--accent-cyan)", textDecoration: "none", fontSize: "0.9rem" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Availability indicator */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
                padding: "8px 16px",
                borderRadius: 99,
                border: "1px solid #22c55e40",
                background: "#22c55e10",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulseRing 1.5s ease-out infinite",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#22c55e" }}>
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Right - form */}
          <div>
            {status === "sent" ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  padding: "40px",
                  background: "var(--bg-card)",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "3rem" }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>Message Sent!</h3>
                <p style={{ color: "var(--text-secondary)", textAlign: "center", fontSize: "0.9rem" }}>
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline"
                  style={{ marginTop: 8 }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  // send_message.sh
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                      name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent-blue)";
                        e.target.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                      email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent-blue)";
                        e.target.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                    subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent-blue)";
                      e.target.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                    message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--accent-blue)";
                      e.target.style.boxShadow = "0 0 0 3px var(--accent-blue-glow)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {error && (
                  <p style={{ color: "#ef4444", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>
                    ⚠ {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                  style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? (
                    <>
                      <div
                        style={{
                          width: 14, height: 14,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
