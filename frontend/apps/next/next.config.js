const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-native-web", "@packages/app"],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web"
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ...config.resolve.extensions,
    ];
    return config;
  },
};

module.exports = nextConfig;
