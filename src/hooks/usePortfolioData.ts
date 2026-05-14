"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, query, orderBy, where } from "firebase/firestore";
import type { Project, Skill, Certification, Profile, BlogPost } from "@/types";
import * as staticData from "@/data/portfolio";

export function usePortfolioData() {
  const [profile, setProfile] = useState<Profile>(staticData.profile);
  const [skills, setSkills] = useState<Skill[]>(staticData.skills);
  const [projects, setProjects] = useState<Project[]>(staticData.projects);
  const [certifications, setCertifications] = useState<Certification[]>(staticData.certifications);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(staticData.blogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Profile
    const unsubProfile = onSnapshot(doc(db, "settings", "profile"), (snap) => {
      if (snap.exists()) setProfile(snap.data() as Profile);
    });

    // 2. Skills
    const unsubSkills = onSnapshot(collection(db, "skills"), (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map(d => d.data() as Skill);
        setSkills(data);
      }
    });

    // 3. Projects (Public only sees visible)
    const unsubProjects = onSnapshot(
      query(
        collection(db, "projects"), 
        where("visible", "==", true),
        orderBy("createdAt", "desc")
      ),
      (snap) => {
        if (!snap.empty) {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
          setProjects(data);
        }
      }
    );

    // 4. Certifications
    const unsubCerts = onSnapshot(collection(db, "certifications"), (snap) => {
      if (!snap.empty) {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Certification));
        setCertifications(data);
      }
    });

    // 5. Blog Posts (Public only sees published)
    const unsubBlog = onSnapshot(
      query(
        collection(db, "posts"), 
        where("published", "==", true),
        orderBy("createdAt", "desc")
      ),
      (snap) => {
        if (!snap.empty) {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost));
          setBlogPosts(data);
        }
      }
    );

    setLoading(false);

    return () => {
      unsubProfile();
      unsubSkills();
      unsubProjects();
      unsubCerts();
      unsubBlog();
    };
  }, []);

  return { profile, skills, projects, certifications, blogPosts, loading };
}
