/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "www.joinhgs.com",
        },
        ],
  },
};

export default nextConfig;
