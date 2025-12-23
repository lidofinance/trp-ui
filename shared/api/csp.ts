import { withSecureHeaders } from 'next-secure-headers';
import getConfig from 'next/config';
import { AppProps } from 'next/app';

const { serverRuntimeConfig } = getConfig();
const { cspTrustedHosts, cspReportOnly, cspReportUri } = serverRuntimeConfig;

const trustedHosts = cspTrustedHosts ? cspTrustedHosts.split(',') : [];

const reportOnly = cspReportOnly === 'true';

export const contentSecurityPolicy = {
  directives: {
    styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
    fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com', ...trustedHosts],
    imgSrc: [
      "'self'",
      'data:',
      'https://*.walletconnect.org',
      'https://*.walletconnect.com',
      ...trustedHosts,
    ],
    scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", ...trustedHosts],
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
      ...trustedHosts,
    ],
    formAction: ["'self'", ...trustedHosts],
    frameAncestors: ['*'],
    manifestSrc: ["'self'", ...trustedHosts],
    mediaSrc: ["'self'", ...trustedHosts],
    childSrc: [
      "'self'",
      'https://*.walletconnect.org',
      'https://*.walletconnect.com',
      ...trustedHosts,
    ],
    objectSrc: ["'self'", ...trustedHosts],
    defaultSrc: ["'self'", ...trustedHosts],
    baseUri: ["'none'"],
    reportURI: cspReportUri,
  },
  reportOnly,
};

export const withCsp = (app: (appProps: AppProps) => JSX.Element) =>
  withSecureHeaders({
    contentSecurityPolicy,
    frameGuard: false,
    referrerPolicy: 'same-origin',
  })(app);
