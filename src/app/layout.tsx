import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Kiran Subedi | Computer Engineering Student & Cybersecurity Enthusiast",
  description:
    "Portfolio of Kiran Subedi — Computer Engineering student from Pokhara, Nepal, focused on cybersecurity, Linux systems, and modern web technologies.",
  keywords: [
    "Kiran Subedi",
    "Computer Engineering",
    "Cybersecurity",
    "Linux",
    "Next.js",
    "Nepal",
    "Portfolio",
    "Firebase",
  ],
  authors: [{ name: "Kiran Subedi", url: "mailto:subedikiran105@gmail.com" }],
  openGraph: {
    title: "Kiran Subedi | CE Student & Cybersecurity Enthusiast",
    description:
      "Passionate Computer Engineering student focused on cybersecurity, Linux systems, and modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
