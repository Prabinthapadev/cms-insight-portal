
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['wbxszvtofrjivcservqo.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/auth',
        permanent: false,
        has: [
          {
            type: 'query',
            key: 'unauthorized',
            value: 'true',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
