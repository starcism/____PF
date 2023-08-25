/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/auth/callback/:slug',
  //       destination: '/hideUrl',
  //     },
  //   ]
  // },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
