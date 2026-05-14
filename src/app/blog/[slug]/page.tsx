"use client";
import { useParams } from "next/navigation";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Link from "next/link";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const { blogPosts, loading } = usePortfolioData();
  const post = blogPosts.find((p) => p.slug === slug);

  if (loading) return <div style={{ padding: 100, textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>;
  if (!post) return <div style={{ padding: 100, textAlign: "center" }}>Post not found</div>;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)", paddingTop: 120, paddingBottom: 100 }}>
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <Link 
          href="/blog" 
          style={{ 
            display: "inline-flex", alignItems: "center", gap: 8, 
            color: "var(--text-muted)", textDecoration: "none", 
            fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginBottom: 40 
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to logs
        </Link>

        <header style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent-blue)", marginBottom: 12 }}>
            LOG_ID: {post.id?.slice(0, 8).toUpperCase()} // {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
            {post.title}
          </h1>
          <div style={{ height: 4, width: 60, background: "var(--accent-cyan)", borderRadius: 2 }} />
        </header>

        <div 
          className="blog-content"
          style={{ 
            color: "var(--text-secondary)", 
            lineHeight: 1.8, 
            fontSize: "1.05rem",
            whiteSpace: "pre-wrap" 
          }}
        >
          {post.content}
        </div>

        <footer style={{ marginTop: 60, paddingTop: 40, borderTop: "1px solid var(--border)" }}>
           <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
             // End of log. Verified by kiran@dev-machine
           </p>
        </footer>
      </article>
      <style>{`
        .blog-content h2 { color: var(--text-primary); margin: 40px 0 20px; font-size: 1.5rem; }
        .blog-content p { margin-bottom: 24px; }
      `}</style>
    </main>
  );
}
