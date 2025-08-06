import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for development
  images: {
    domains: ["placeholder.com"], // Add any external image domains you're using
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    // Add any environment variables you want to expose to the browser
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || "http://localhost:3000",
  },
  // Enable SWC minification for improved performance
  swcMinify: true,

  // Configure caching headers to prevent 304 issues
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  // Configure redirects if needed
  async redirects() {
    return [
      // Example redirect
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Customize Webpack configuration if needed
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false; // Disable Webpack caching on the client-side to prevent stale responses
    }
    return config;
  },
};

export default nextConfig;
