import type { Project, Skill, Certification, Profile, BlogPost } from "@/types";

export const profile: Profile = {
  name: "Kiran Subedi",
  title: "Computer Engineering Student | Cybersecurity Enthusiast",
  bio: "Passionate Computer Engineering student focused on cybersecurity, Linux systems, and modern web technologies. Interested in building scalable applications, exploring system security, and continuously improving technical skills through hands-on projects and experimentation.",
  location: "Pokhara, Nepal",
  email: "subedikiran105@gmail.com",
  github: "https://github.com/kiransubedi",
  linkedin: "https://linkedin.com/in/kiransubedi",
  avatarUrl: "",
  resumeUrl: "/resume-placeholder.pdf",
};

export const skills: Skill[] = [
  { name: "C++", level: 72, category: "language" },
  { name: "Python", level: 78, category: "language" },
  { name: "TypeScript", level: 65, category: "language" },
  { name: "Bash / Shell", level: 75, category: "language" },
  { name: "Linux", level: 80, category: "os" },
  { name: "Next.js", level: 68, category: "framework" },
  { name: "React", level: 70, category: "framework" },
  { name: "Firebase", level: 72, category: "database" },
  { name: "Git / GitHub", level: 80, category: "tool" },
  { name: "Wireshark", level: 60, category: "tool" },
  { name: "Nmap", level: 65, category: "tool" },
  { name: "Docker", level: 55, category: "tool" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "NetSentinel",
    description:
      "Real-time network traffic analyzer and intrusion detection system with a web-based dashboard.",
    longDescription:
      "NetSentinel is a Python-based network monitoring tool that captures and analyzes live traffic using Scapy, detects anomalies, and presents alerts through a Next.js dashboard. Integrates with Firebase for alert persistence and historical data visualization.",
    techStack: ["Python", "Scapy", "Next.js", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/kiransubedi/netsentinel",
    featured: true,
    visible: true,
    category: "network",
    createdAt: "2024-11-01",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "CyberOps Dashboard",
    description:
      "Modular cybersecurity operations dashboard with threat intel feeds, CVE tracker, and system health monitoring.",
    longDescription:
      "A comprehensive security operations center (SOC) style dashboard built with Next.js and Firebase. Features real-time threat intelligence feeds, a CVE database browser, system health gauges, and a port scanner integration via a Python backend API.",
    techStack: ["Next.js", "TypeScript", "Firebase", "Python", "REST API"],
    githubUrl: "https://github.com/kiransubedi/cyberops-dashboard",
    liveUrl: "https://cyberops.vercel.app",
    featured: true,
    visible: true,
    category: "cybersecurity",
    createdAt: "2024-08-20",
    updatedAt: "2024-12-10",
  },
  {
    id: "3",
    title: "LinuxToolkit CLI",
    description:
      "A collection of productivity and security automation scripts for Linux power users, distributed as a CLI toolkit.",
    longDescription:
      "LinuxToolkit is a curated set of Bash and Python scripts targeting system administration, log analysis, automated backups, and basic enumeration tasks. Packaged with a custom installer and man-page documentation.",
    techStack: ["Bash", "Python", "Linux", "C++"],
    githubUrl: "https://github.com/kiransubedi/linux-toolkit",
    featured: true,
    visible: true,
    category: "linux",
    createdAt: "2024-05-10",
    updatedAt: "2024-11-20",
  },
  {
    id: "4",
    title: "PortfolioCMS",
    description:
      "A headless CMS built on Firebase for managing portfolio content — projects, blog posts, and media — with an admin UI.",
    longDescription:
      "PortfolioCMS provides a Firebase-backed content management layer with Firestore for structured data, Firebase Storage for media, and Firebase Auth for admin access control. The admin panel supports CRUD for projects, blog posts, and profile data.",
    techStack: ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/kiransubedi/portfolio-cms",
    liveUrl: "https://kiran.dev",
    featured: false,
    visible: true,
    category: "web",
    createdAt: "2025-01-05",
    updatedAt: "2025-03-18",
  },
  {
    id: "5",
    title: "SecureVault",
    description:
      "An encrypted local password manager written in C++ with AES-256 encryption and a terminal UI.",
    longDescription:
      "SecureVault stores credentials in a locally encrypted SQLite database using AES-256-CBC via OpenSSL. The terminal interface is built with ncurses, providing clipboard integration and password generation features without any cloud dependency.",
    techStack: ["C++", "OpenSSL", "SQLite", "ncurses", "Linux"],
    githubUrl: "https://github.com/kiransubedi/securevault",
    featured: false,
    visible: true,
    category: "cybersecurity",
    createdAt: "2024-03-15",
    updatedAt: "2024-07-30",
  },
  {
    id: "6",
    title: "SmartFarm IoT",
    description:
      "Automated irrigation and environmental monitoring system using ESP32 and MQTT.",
    longDescription:
      "SmartFarm uses ESP32 microcontrollers to monitor soil moisture, temperature, and humidity. Data is transmitted via MQTT to a central Raspberry Pi gateway, which controls water pumps and logs data to a local dashboard. Features solar power management and deep-sleep optimization.",
    techStack: ["C++", "Arduino", "ESP32", "MQTT", "Python"],
    githubUrl: "https://github.com/kiransubedi/smart-farm-iot",
    featured: true,
    visible: true,
    category: "iot",
    createdAt: "2024-09-12",
    updatedAt: "2025-02-05",
  },
  {
    id: "7",
    title: "KernelStats TUI",
    description:
      "A terminal-based system monitor for Linux that visualizes kernel parameters and process performance.",
    longDescription:
      "KernelStats is a Rust-based TUI tool that parses /proc and /sys filesystems to provide real-time insights into CPU scheduling, memory management, and disk I/O. Uses ratatui for the interface and provides low-overhead monitoring.",
    techStack: ["Rust", "Linux", "Ratatui", "Procfs"],
    githubUrl: "https://github.com/kiransubedi/kernel-stats",
    featured: false,
    visible: true,
    category: "linux",
    createdAt: "2024-12-01",
    updatedAt: "2025-03-10",
  },
  {
    id: "8",
    title: "EdgeGuardian LoRa",
    description:
      "Long-range secure communication bridge for remote IoT sensors using LoRaWAN.",
    longDescription:
      "EdgeGuardian implements a secure LoRa gateway using a Raspberry Pi and an RAK Wireless concentrator. It features end-to-end encryption for sensor data and integrates with The Things Network (TTN) for cloud connectivity, targeting remote agricultural deployments.",
    techStack: ["Python", "LoRaWAN", "Raspberry Pi", "Cryptography"],
    githubUrl: "https://github.com/kiransubedi/edge-guardian",
    featured: false,
    visible: true,
    category: "iot",
    createdAt: "2024-10-20",
    updatedAt: "2025-01-25",
  },
  {
    id: "9",
    title: "WebScout Pro",
    description:
      "Advanced web reconnaissance and vulnerability scanning tool with interactive reports.",
    longDescription:
      "WebScout Pro is a Next.js application that orchestrates various backend security tools (OWASP ZAP, Nmap, GoBuster) through a Go-based API. It provides visual representations of attack surfaces and generates PDF security audits.",
    techStack: ["Next.js", "Go", "Docker", "PostgreSQL", "React Query"],
    githubUrl: "https://github.com/kiransubedi/webscout-pro",
    featured: true,
    visible: true,
    category: "web",
    createdAt: "2025-02-15",
    updatedAt: "2025-04-01",
  },
];

export const certifications: Certification[] = [
  {
    id: "1",
    title: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    date: "2024-09",
    description:
      "Covers network security, Linux, SQL, Python for cybersecurity, and SIEM tools.",
    credentialUrl: "https://coursera.org/verify/",
  },
  {
    id: "2",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024-06",
    description:
      "Foundational course covering threat landscapes, network security principles, and ethical hacking basics.",
    credentialUrl: "https://skillsforall.com/",
  },
  {
    id: "3",
    title: "The Linux Command Line",
    issuer: "Linux Foundation (self-study)",
    date: "2024-03",
    description:
      "Comprehensive coverage of bash scripting, file systems, process management, and system administration.",
  },
  {
    id: "4",
    title: "Python for Everybody",
    issuer: "University of Michigan / Coursera",
    date: "2023-12",
    description:
      "Data structures, web scraping, databases, and data visualization using Python.",
    credentialUrl: "https://coursera.org/verify/",
  },
];

export const blogPosts: BlogPost[] = [];

export const terminalLines = [
  { delay: 0, text: "$ whoami", type: "command" },
  { delay: 400, text: "kiran-subedi", type: "output" },
  { delay: 800, text: "$ cat /etc/hostname", type: "command" },
  { delay: 1200, text: "pokhara-dev-machine", type: "output" },
  { delay: 1600, text: "$ ls ~/projects", type: "command" },
  {
    delay: 2000,
    text: "netsentinel  cyberops-dashboard  linux-toolkit  securevault",
    type: "output",
  },
  { delay: 2400, text: "$ uname -r", type: "command" },
  { delay: 2800, text: "6.8.0-51-generic", type: "output" },
  { delay: 3200, text: "$ echo $EDITOR", type: "command" },
  { delay: 3600, text: "nvim", type: "output" },
  { delay: 4000, text: "$ █", type: "cursor" },
];
