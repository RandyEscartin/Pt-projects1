/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental features that might cause issues
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:5000/api/:path*',
  //     },
  //   ]
  // },
}

module.exports = nextConfig
