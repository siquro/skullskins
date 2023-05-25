/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['avatars.akamai.steamstatic.com', 'community.akamai.steamstatic.com', 'avatars.steamstatic.com'],
  },
}

module.exports = nextConfig
