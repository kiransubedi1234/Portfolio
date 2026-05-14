"use client";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Link from "next/link";

export default function BlogListPage() {
  const { blogPosts, loading } = usePortfolioData();

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 60 }}>
          <p className="section-label">// logs</p>
          <div className="circuit-divider">
            <h2 style={{ fontSize: "2.5rem" }}>
              Security <span className="gradient-text">Logs</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 12 }}>
            Technical write-ups, research notes, and cybersecurity insights.
          </p>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Loading logs...</div>
        ) : blogPosts.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center", borderStyle: "dashed" }}>
             <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>No logs found. Check back later.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 24 }}>
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card"
                style={{
                  display: "block",
                  padding: 28,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>{post.title}</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 16 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-blue)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
                  <span>[ read_full_log ]</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
