"use client";
import { useState, useEffect, FormEvent } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Profile } from "@/types";
import { profile as defaultProfile } from "@/data/portfolio";

export default function AdminProfilePage() {
  const [form, setForm] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "settings", "profile"));
        if (snap.exists()) setForm(snap.data() as Profile);
      } catch { /* not configured */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      let avatarUrl = form.avatarUrl || "";
      let resumeUrl = form.resumeUrl || "";

      if (avatarFile) {
        const r = sRef(storage, `profile/avatar_${Date.now()}`);
        await uploadBytes(r, avatarFile);
        avatarUrl = await getDownloadURL(r);
      }
      if (resumeFile) {
        const r = sRef(storage, `profile/resume_${Date.now()}.pdf`);
        await uploadBytes(r, resumeFile);
        resumeUrl = await getDownloadURL(r);
      }

      await setDoc(doc(db, "settings", "profile"), { ...form, avatarUrl, resumeUrl });
      setForm((prev) => ({ ...prev, avatarUrl, resumeUrl }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-primary)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.88rem",
    outline: "none",
  };

  if (loading) return <div style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Loading profile...</div>;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--accent-cyan)" }}>// manage</p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Edit Profile</h1>
      </div>

      <form
        onSubmit={handleSave}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 680,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Full Name", key: "name" },
            { label: "Title / Tagline", key: "title" },
            { label: "Location", key: "location" },
            { label: "Email", key: "email", type: "email" },
            { label: "GitHub URL", key: "github" },
            { label: "LinkedIn URL", key: "linkedin" },
          ].map((f) => (
            <div key={f.key}>
              <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 5, fontFamily: "var(--font-mono)" }}>{f.label}</label>
              <input
                type={f.type || "text"}
                value={(form as unknown as Record<string, string>)[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 5, fontFamily: "var(--font-mono)" }}>Bio</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 5, fontFamily: "var(--font-mono)" }}>Profile Photo (upload)</label>
            <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} style={{ ...inputStyle, padding: "6px 10px" }} />
            {form.avatarUrl && <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4, fontFamily: "var(--font-mono)" }}>Current: {form.avatarUrl.substring(0, 40)}...</p>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 5, fontFamily: "var(--font-mono)" }}>Resume PDF (upload)</label>
            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} style={{ ...inputStyle, padding: "6px 10px" }} />
            {form.resumeUrl && <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4, fontFamily: "var(--font-mono)" }}>Current: {form.resumeUrl}</p>}
          </div>
        </div>

        {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>⚠ {error}</p>}
        {saved && <p style={{ color: "#22c55e", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>✓ Profile saved successfully!</p>}

        <button type="submit" className="btn-primary" disabled={saving} style={{ alignSelf: "flex-start" }}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
