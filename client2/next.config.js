/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['avatars.akamai.steamstatic.com', 'community.akamai.steamstatic.com', 'avatars.steamstatic.com'],
  },
}

module.exports = nextConfig
