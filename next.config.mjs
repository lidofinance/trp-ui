import buildDynamics from './scripts/build-dynamics.mjs';

buildDynamics();

const basePath = process.env.BASE_PATH || '';
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

export default {
  basePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  async headers() {
    return [
      {
        // required for gnosis save apps
        source: '/manifest.json',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  serverRuntimeConfig: {
    basePath,
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
