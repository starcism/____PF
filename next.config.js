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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.ap-northeast-2.amazonaws.com'
      }
    ],
  },

}

module.exports = nextConfig
