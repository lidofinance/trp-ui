import { createSecureHeaders } from 'next-secure-headers'
import buildDynamics from './scripts/build-dynamics.mjs'

buildDynamics();

const infuraApiKey = process.env.INFURA_API_KEY;
const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const rpcUrls_1 =
  (process.env.EL_RPC_URLS_1 && process.env.EL_RPC_URLS_1.split(',')) ||
  [
    alchemyApiKey && `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
    infuraApiKey && `https://mainnet.infura.io/v3/${infuraApiKey}`,
  ].filter(Boolean);

const rpcUrls_5 =
  (process.env.EL_RPC_URLS_5 && process.env.EL_RPC_URLS_5.split(',')) ||
  [
    alchemyApiKey && `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
    infuraApiKey && `https://goerli.infura.io/v3/${infuraApiKey}`,
  ].filter(Boolean);

const rpcUrls_17000 =
  (process.env.EL_RPC_URLS_17000 && process.env.EL_RPC_URLS_17000.split(','))

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS?.split(',') ?? [
  'https://*.lido.fi',
];
const cspReportOnly = process.env.CSP_REPORT_ONLY;
const cspReportUri = process.env.CSP_REPORT_URI;

const rateLimit = process.env.RATE_LIMIT || 100;
const rateLimitTimeFrame = process.env.RATE_LIMIT_TIME_FRAME || 60; // 1 minute;

// we will swap `CACHE_CONTROL_HEADER` with `cache-control` inside custom server (server.mjs)
export const CACHE_CONTROL_HEADER = 'x-cache-control';
export const CACHE_CONTROL_VALUE = `public, s-maxage=60, stale-if-error=${
  7 * 24 * 60 * 60
}, stale-while-revalidate=${2 * 24 * 60 * 60}`;

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
        source: '/:path*',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              styleSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                "'unsafe-inline'",
              ],
              fontSrc: [
                "'self'",
                'data:',
                'https://fonts.gstatic.com',
                ...cspTrustedHosts,
              ],
              imgSrc: [
                "'self'",
                'data:',
                'https://*.walletconnect.org',
                'https://*.walletconnect.com',
                ...cspTrustedHosts,
              ],
              scriptSrc: [
                "'self'",
                "'unsafe-eval'",
                "'unsafe-inline'",
                ...cspTrustedHosts,
              ],
              connectSrc: [
                "'self'",
                'wss://*.walletconnect.org',
                'https://*.walletconnect.org',
                'wss://*.walletconnect.com',
                'https://*.walletconnect.com',
                'https://*.coinbase.com',
                'wss://*.walletlink.org',
                'https://api.1inch.exchange',
                'https://api.1inch.io',
                'https://rpc.ankr.com',
                'https://cdn.live.ledger.com',
                'https://apiv5.paraswap.io',
                'https://api.cow.fi',
                'https://cloudflare-eth.com',
                'https://api.coingecko.com',
                ...cspTrustedHosts,
              ],
              formAction: ["'self'", ...cspTrustedHosts],
              frameAncestors: ['*'],
              manifestSrc: ["'self'", ...cspTrustedHosts],
              mediaSrc: ["'self'", ...cspTrustedHosts],
              childSrc: [
                "'self'",
                'https://*.walletconnect.org',
                'https://*.walletconnect.com',
                ...cspTrustedHosts,
              ],
              objectSrc: ["'self'", ...cspTrustedHosts],
              defaultSrc: ["'self'", ...cspTrustedHosts],
              baseUri: ["'none'"],
              reportURI: cspReportUri,
            },
            reportOnly: cspReportOnly,
          },
          frameGuard: false,
        })
      },
      {
        // required for gnosis safe apps
        source: '/manifest.json',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: CACHE_CONTROL_HEADER, value: CACHE_CONTROL_VALUE },
        ],
      },
      {
        source: '/favicon:size*',
        headers: [{ key: CACHE_CONTROL_HEADER, value: CACHE_CONTROL_VALUE }],
      },
      {
        source: '/(|aragon|snapshot|admin)',
        headers: [{ key: CACHE_CONTROL_HEADER, value: CACHE_CONTROL_VALUE }],
      },
    ];
  },
  serverRuntimeConfig: {
    infuraApiKey,
    alchemyApiKey,
    rpcUrls_1,
    rpcUrls_5,
    rpcUrls_17000,
    rateLimit,
    rateLimitTimeFrame,
  },
};
