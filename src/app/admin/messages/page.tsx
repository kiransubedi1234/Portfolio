"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import type { ContactMessage } from "@/types";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  async function fetchMessages() {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage)));
    } catch { /* not configured */ }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchMessages(); }, []);

  async function markRead(id: string) {
    await updateDoc(doc(db, "messages", id), { read: true });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;
    await deleteDoc(doc(db, "messages", id!));
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-cyan)" }}>// inbox</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Messages{" "}
          {messages.filter((m) => !m.read).length > 0 && (
            <span style={{ fontSize: "0.8rem", padding: "3px 10px", borderRadius: 99, background: "#f59e0b18", color: "#f59e0b", border: "1px solid #f59e0b40", fontFamily: "var(--font-mono)" }}>
              {messages.filter((m) => !m.read).length} unread
            </span>
          )}
        </h1>
      </div>

      {loading ? (
        <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", padding: 24 }}>
          No messages yet. Your contact form is ready.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 16 }} className="msg-grid">
          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={async () => {
                  setSelected(msg);
                  if (!msg.read && msg.id) await markRead(msg.id);
                }}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${selected?.id === msg.id ? "var(--accent-blue)" : "var(--border)"}`,
                  borderRadius: 10,
                  padding: "14px 18px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {!msg.read && (
                  <div style={{ position: "absolute", top: 16, right: 16, width: 8, height: 8, borderRadius: "50%", background: "var(--accent-blue)" }} />
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{msg.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {msg.createdAt 
                      ? (msg.createdAt as any).toDate 
                        ? (msg.createdAt as any).toDate().toLocaleDateString() 
                        : new Date(msg.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", marginBottom: 4, fontFamily: "var(--font-mono)" }}>{msg.subject}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>{selected.subject}</h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                    from: <span style={{ color: "var(--accent-cyan)" }}>{selected.email}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-primary"
                    style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id!)}
                    style={{ background: "#ef444418", border: "1px solid #ef444440", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "#ef4444", fontSize: "0.75rem" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontSize: "0.9rem",
                  whiteSpace: "pre-wrap",
                  padding: "16px",
                  background: "var(--bg-primary)",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                }}
              >
                {selected.message}
              </div>
            </div>
          )}
        </div>
      )}
      <style>{`@media(max-width:768px){.msg-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}
