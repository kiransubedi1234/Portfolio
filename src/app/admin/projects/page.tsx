"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import type { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  async function fetchProjects() {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
    setLoading(false);
  }

  useEffect(() => { fetchProjects(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;

    const data = {
      ...editing,
      updatedAt: new Date().toISOString(),
      createdAt: editing.createdAt || new Date().toISOString(),
    };

    if (editing.id) {
      await updateDoc(doc(db, "projects", editing.id), data);
    } else {
      await addDoc(collection(db, "projects"), data);
    }
    setEditing(null);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-cyan)" }}>// portfolio_management</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Projects</h1>
        </div>
        <button onClick={() => setEditing({ title: "", description: "", techStack: [], category: "web", featured: false, visible: true })} className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
          + Add Project
        </button>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card" style={{ padding: 24, maxWidth: 800 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <input 
              placeholder="Project Title" 
              value={editing.title} 
              onChange={e => setEditing({...editing, title: e.target.value})}
              className="admin-input" required 
            />
            <textarea 
              placeholder="Short Description" 
              value={editing.description} 
              onChange={e => setEditing({...editing, description: e.target.value})}
              className="admin-input" style={{ height: 60 }} required 
            />
            <textarea 
              placeholder="Long Description (optional)" 
              value={editing.longDescription} 
              onChange={e => setEditing({...editing, longDescription: e.target.value})}
              className="admin-input" style={{ height: 120 }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
               <select 
                value={editing.category} 
                onChange={e => setEditing({...editing, category: e.target.value as any})}
                className="admin-input"
              >
                <option value="cybersecurity">Cybersecurity</option>
                <option value="linux">Linux</option>
                <option value="web">Web</option>
                <option value="network">Network</option>
                <option value="iot">IoT</option>
                <option value="other">Other</option>
              </select>
              <input 
                placeholder="Tech Stack (comma separated)" 
                value={editing.techStack?.join(", ")} 
                onChange={e => setEditing({...editing, techStack: e.target.value.split(",").map(t => t.trim())})}
                className="admin-input" 
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
               <input 
                placeholder="GitHub URL" 
                value={editing.githubUrl} 
                onChange={e => setEditing({...editing, githubUrl: e.target.value})}
                className="admin-input" 
              />
              <input 
                placeholder="Live URL" 
                value={editing.liveUrl} 
                onChange={e => setEditing({...editing, liveUrl: e.target.value})}
                className="admin-input" 
              />
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                <input type="checkbox" checked={editing.featured} onChange={e => setEditing({...editing, featured: e.target.checked})} />
                Featured Project
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.85rem" }}>
                <input type="checkbox" checked={editing.visible} onChange={e => setEditing({...editing, visible: e.target.checked})} />
                Visible on Site
              </label>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button type="submit" className="btn-primary">Save Project</button>
              <button type="button" onClick={() => setEditing(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {projects.map(proj => (
            <div key={proj.id} className="card" style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{proj.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {proj.category} • {proj.featured ? "Featured" : "Regular"}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setEditing(proj)} className="btn-outline" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>Edit</button>
                <button onClick={() => handleDelete(proj.id)} style={{ background: "#ef444418", color: "#ef4444", border: "1px solid #ef444440", borderRadius: 6, padding: "4px 10px", fontSize: "0.75rem", cursor: "pointer" }}>Delete</button>
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
