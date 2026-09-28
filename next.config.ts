import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
