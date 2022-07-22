/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
