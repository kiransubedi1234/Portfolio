"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  async function fetchPosts() {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    const data = {
      ...editing,
      updatedAt: new Date().toISOString(),
      createdAt: editing.createdAt || new Date().toISOString(),
    };

    if (editing.id) {
      await updateDoc(doc(db, "posts", editing.id), data);
    } else {
      await addDoc(collection(db, "posts"), { ...data, createdAt: serverTimestamp() });
    }
    setEditing(null);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-cyan)" }}>// content_management</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Blog Posts</h1>
        </div>
        <button onClick={() => setEditing({ title: "", content: "", excerpt: "", slug: "", tags: [], published: false })} className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
          + New Post
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card" style={{ padding: 24, maxWidth: 800 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <input 
              placeholder="Post Title" 
              value={editing.title} 
              onChange={e => setEditing({...editing, title: e.target.value})}
              className="admin-input" required 
            />
            <input 
              placeholder="Slug (e.g. my-first-post)" 
              value={editing.slug} 
              onChange={e => setEditing({...editing, slug: e.target.value})}
              className="admin-input" required 
            />
            <textarea 
              placeholder="Excerpt (short summary)" 
              value={editing.excerpt} 
              onChange={e => setEditing({...editing, excerpt: e.target.value})}
              className="admin-input" style={{ height: 80 }} required 
            />
            <textarea 
              placeholder="Content (Markdown supported)" 
              value={editing.content} 
              onChange={e => setEditing({...editing, content: e.target.value})}
              className="admin-input" style={{ height: 300, fontFamily: "var(--font-mono)" }} required 
            />
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                <input type="checkbox" checked={editing.published} onChange={e => setEditing({...editing, published: e.target.checked})} />
                Published
              </label>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button type="submit" className="btn-primary">Save Post</button>
              <button type="button" onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {posts.map(post => (
            <div key={post.id} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{post.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {post.slug} • {post.published ? "Published" : "Draft"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(post)} className="btn-outline" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>Edit</button>
                <button onClick={() => handleDelete(post.id)} style={{ background: "#ef444418", color: "#ef4444", border: "1px solid #ef444440", borderRadius: 6, padding: "4px 10px", fontSize: "0.75rem", cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-input {
          width: 100%;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus { border-color: var(--accent-blue); }
      `}</style>
    </div>
  );
}
