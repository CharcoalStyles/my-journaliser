/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  // basePath:'/journal',
  assetPrefix: '/journal',
}
