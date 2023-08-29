/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.stripe.com"],
  },

  experimental: {
    newNextLinkBehavior: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
