/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "in.technocorp.uz",
      },
      {
        protocol: "https",
        hostname: "in.technocorp.uz",
      },
      {
        protocol: "http",
        hostname: "192.168.1.97",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
