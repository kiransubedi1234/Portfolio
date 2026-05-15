import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress harmless build warnings from Firebase's internal use of
  // Node.js built-ins that aren't available in edge / browser environments.
  serverExternalPackages: ["firebase-admin"],

  // Prevent Next.js from crashing the build when a prerendered page
  // (e.g. /_not-found) fails due to missing env context.
  // Individual pages that need Firebase should export `dynamic = 'force-dynamic'`
  // or use client-only rendering.
  experimental: {},
};

export default nextConfig;
