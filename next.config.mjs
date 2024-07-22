/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "in.technocorp.uz",
      },
    ],
  },
};

export default nextConfig;
