import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    domains: [
      // 'exftxjchbbtiozuejdks.supabase.co',
      'xklaxpzwmgbffwufaxgo.supabase.co',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
