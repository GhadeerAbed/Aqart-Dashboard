/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["aqrrat-2.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aqrrat-2.onrender.com",
        port: "", // Optional
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
