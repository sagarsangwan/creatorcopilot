// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // 🚨 IMPORTANT: The protocol MUST match your console output (http or https)
        // Your log showed 'http://', so we use 'http'
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/profile/picture/**", // Use a glob to allow different path structures
      },
    ],
  },
};

module.exports = nextConfig;
