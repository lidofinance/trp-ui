import buildDynamics from './scripts/build-dynamics.mjs';

buildDynamics();

const infuraApiKey = process.env.INFURA_API_KEY;
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const apiProviderUrls = {
  [1]: process.env[`API_PROVIDER_URL_1`],
  [5]: process.env[`API_PROVIDER_URL_5`],
};

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;
const cspReportUri = process.env.CSP_REPORT_URI;

const rateLimit = process.env.RATE_LIMIT || 100;
const rateLimitTimeFrame = process.env.RATE_LIMIT_TIME_FRAME || 60; // 1 minute;

export const BASE_CACHE_CONTROL =
  'public, s-max-age=30, stale-if-error=1200, stale-while-revalidate=30';

export default {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Fixes a build error with importing Pure ESM modules, e.g. reef-knot
    // Some docs are here:
    // <https://github.com/vercel/next.js/pull/27069>
    // You can see how it is actually used in v12.3.4 here:
    // <https://github.com/vercel/next.js/blob/v12.3.4/packages/next/build/webpack-config.ts#L417>
    // Presumably, it is true by default in next v13 and won't be needed
    esmExternals: true,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  headers() {
    return [
      {
        // required for gnosis save apps
        source: '/manifest.json',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'x-cache-control', value: BASE_CACHE_CONTROL },
        ],
      },
      {
        source: '/favicon:size*',
        headers: [
          { key: 'x-cache-control', value: BASE_CACHE_CONTROL },
        ]
      },
      {
        source: '/(|aragon|snapshot|admin|error)',
        headers: [
          { key: 'x-cache-control', value: BASE_CACHE_CONTROL },
        ]
      }
    ];
  }, 
  serverRuntimeConfig: {
    infuraApiKey,
    alchemyApiKey,
    apiProviderUrls,
    cspTrustedHosts,
    cspReportOnly,
    cspReportUri,
    rateLimit,
    rateLimitTimeFrame,
  },
};
