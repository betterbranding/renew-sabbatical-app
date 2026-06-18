/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO: Fix all type errors and re-enable
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

module.exports = nextConfig;
