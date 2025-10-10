// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // required for export
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
