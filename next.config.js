/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  swcMinify: true,
  experimental: {
    swcTraceProfiling: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    legacyBrowsers: false,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    });

    return config;
  },
});

module.exports = nextConfig;
