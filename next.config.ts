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
    ],
  },
};

export default nextConfig;
