/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // ⚠️ tells Next.js to emit /out instead of .next
  images: { unoptimized: true },        // required for export
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
