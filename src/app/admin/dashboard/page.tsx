"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

interface Stats {
  projects: number;
  messages: number;
  unread: number;
  posts: number;
}

import { projects as staticProjects, blogPosts as staticPosts } from "@/data/portfolio";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, messages: 0, unread: 0, posts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projSnap, msgSnap, blogSnap] = await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "messages")),
          getDocs(collection(db, "posts")),
        ]);

        // If Firestore projects/posts are empty, use static data counts as baseline
        const projectsCount = projSnap.size > 0 ? projSnap.size : staticProjects.length;
        const postsCount = blogSnap.size > 0 ? blogSnap.size : staticPosts.length;
        
        // Robust unread count: count any message that doesn't explicitly have read: true
        const unreadCount = msgSnap.docs.filter(d => d.data().read !== true).length;

        setStats({
          projects: projectsCount,
          messages: msgSnap.size,
          unread: unreadCount,
          posts: postsCount,
        });
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
        // Fallback to static data on error
        setStats({
          projects: staticProjects.length,
          messages: 0,
          unread: 0,
          posts: staticPosts.length,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Projects", value: stats.projects, href: "/admin/projects", color: "var(--accent-blue)", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
    { label: "New Messages", value: stats.unread, href: "/admin/messages", color: "#f59e0b", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { label: "Total Messages", value: stats.messages, href: "/admin/messages", color: "var(--accent-cyan)", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Blog Posts", value: stats.posts, href: "/admin/blog", color: "#a78bfa", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  ];

  const quickLinks = [
    { label: "Add New Project", href: "/admin/projects?new=1", color: "var(--accent-blue)" },
    { label: "View Messages", href: "/admin/messages", color: "var(--accent-cyan)" },
    { label: "Edit Profile", href: "/admin/profile", color: "#a78bfa" },
    { label: "New Blog Post", href: "/admin/blog?new=1", color: "#10b981" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-cyan)", marginBottom: 6 }}>
          // admin dashboard
        </p>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>
          Welcome back <span className="gradient-text">Kiran</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
          Here&apos;s an overview of your portfolio content.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }} className="stats-grid">
        {statCards.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              display: "block",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "20px",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = s.color;
              el.style.boxShadow = `0 0 20px ${s.color}30`;
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "none";
              el.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" fill="none" stroke={s.color} strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {loading ? "—" : s.value}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
          // quick_actions
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                border: `1px solid ${link.color}40`,
                borderRadius: 8,
                background: `${link.color}10`,
                color: link.color,
                textDecoration: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = `${link.color}20`;
                el.style.borderColor = link.color;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = `${link.color}10`;
                el.style.borderColor = `${link.color}40`;
              }}
            >
              + {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "20px 24px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: "var(--accent-cyan)", marginBottom: 8 }}>$ system info</div>
        <div><span style={{ color: "var(--text-muted)" }}>framework</span>    → Next.js 16 App Router</div>
        <div><span style={{ color: "var(--text-muted)" }}>database </span>    → Firebase Firestore</div>
        <div><span style={{ color: "var(--text-muted)" }}>storage  </span>    → Firebase Storage</div>
        <div><span style={{ color: "var(--text-muted)" }}>auth     </span>    → Firebase Authentication</div>
        <div><span style={{ color: "var(--text-muted)" }}>status   </span>    → <span style={{ color: "#22c55e" }}>operational ✓</span></div>
      </div>

      <style>{`@media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
    </div>
  );
}
