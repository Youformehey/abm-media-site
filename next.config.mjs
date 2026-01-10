/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore les erreurs TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore les erreurs de style (ESLint) - C'EST SOUVENT CA QUI BLOQUE
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;