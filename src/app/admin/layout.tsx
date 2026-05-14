"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/projects", label: "Projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { href: "/admin/profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { href: "/admin/messages", label: "Messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { href: "/admin/blog", label: "Blog Posts", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
];

function MessageBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const q = query(collection(db, "messages"), where("read", "==", false));
    return onSnapshot(q, (snap) => setCount(snap.size));
  }, []);

  if (count === 0) return null;
  return (
    <span style={{ 
      marginLeft: "auto", 
      background: "var(--accent-blue)", 
      color: "white", 
      fontSize: "0.65rem", 
      padding: "2px 6px", 
      borderRadius: 10,
      minWidth: 18,
      textAlign: "center"
    }}>
      {count}
    </span>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/admin") router.push("/admin");
      if (user && !isAdmin) {
        logout();
        router.push("/admin");
      }
    }
  }, [user, loading, isAdmin, pathname, router, logout]);

  // Show login page without sidebar
  if (pathname === "/admin") return <>{children}</>;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <div style={{ width: 36, height: 36, border: "2px solid var(--border)", borderTopColor: "var(--accent-blue)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem" }}>
            <span style={{ color: "var(--accent-cyan)" }}>{">"}</span>{" "}
            <span className="gradient-text">admin</span>
            <span style={{ color: "var(--accent-blue)" }}>_panel</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 4 }}>
            {user.email}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  marginBottom: 4,
                  textDecoration: "none",
                  background: active ? "var(--accent-blue-glow)" : "transparent",
                  color: active ? "var(--accent-blue)" : "var(--text-secondary)",
                  borderLeft: active ? "2px solid var(--accent-blue)" : "2px solid transparent",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.82rem",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.label}
                {item.label === "Messages" && <MessageBadge />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 8,
              textDecoration: "none",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              marginBottom: 8,
              transition: "color 0.2s",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View Site
          </Link>
          <button
            onClick={() => { logout(); router.push("/admin"); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 8,
              background: "none",
              border: "none",
              color: "#ef4444",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              cursor: "pointer",
              width: "100%",
              transition: "background 0.2s",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}
