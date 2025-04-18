/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint errors from blocking your build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors from blocking your build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Serve all images unoptimized (no external loader)
  images: {
    unoptimized: true,
  },

  // Enable Next.js’s built‑in static export
  output: 'export',
};

export default nextConfig;
