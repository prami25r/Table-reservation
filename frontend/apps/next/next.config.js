const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-native-web", "@packages/app"],
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
      "@react-navigation/native": path.resolve(
        __dirname,
        "../../mocks/navigation.web.js"
      ),
      "react-native-safe-area-context": path.resolve(
        __dirname,
        "../../mocks/safeareaadvanced.js"
      ),
      "lucide-react-native$": "lucide-react",
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