export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  visible: boolean;
  category: "cybersecurity" | "linux" | "web" | "network" | "iot" | "other";
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "language" | "os" | "framework" | "tool" | "database";
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  avatarUrl?: string;
  resumeUrl?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}
