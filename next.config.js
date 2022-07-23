/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/window",
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/users',
        destination: `https://api.notion.com/v1/users`
      }
    ]
  }
}

module.exports = nextConfig
