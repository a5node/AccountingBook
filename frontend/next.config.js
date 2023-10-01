// require('dotenv').config();
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: process.env.NODE_ENV === 'production' ? '../apps' : undefined,

  images: {
    domains: [],
  },
  experimental: {
    typedRoutes: true,

    // https://nextjs.org/docs/app/api-reference/functions/server-actions
    // serverActions: true,
    // serverActionsBodySizeLimit: '2mb',

    // appDir: true,
    // serverComponentsExternalPackages: ['@prisma/client'],
  },

  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  webpack: (config, { isServer, plugins }) => {
    // config.plugins = [...config.plugins];
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
        path: false,
        stream: false,
        event: false,
        dgram: false,
      };
      config.target.push('electron-renderer');
    }

    return config;
  },
};

module.exports = nextConfig;
