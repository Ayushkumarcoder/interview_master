import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // This will disable ESLint during production builds
    ignoreDuringBuilds: true,
  },

  typescript: {
    // This will disable TypeScript during production builds
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
