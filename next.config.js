/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'AIS AI Training - SWE Excellence'
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true
    };

    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    });

    return config;
  },
  ...(process.env.ELECTRON_BUILD && {
    output: 'export'
  })
};

module.exports = nextConfig; 