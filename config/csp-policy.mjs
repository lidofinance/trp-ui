// Lives in a .mjs module so server.mjs can import it: the CSP header is set
// there for every response (per-render hooks never fire for static pages).
// The getter is lazy — the server calls it after Next has loaded .env files.
export const getContentSecurityPolicy = () => {
  const trustedHosts = process.env.CSP_TRUSTED_HOSTS
    ? process.env.CSP_TRUSTED_HOSTS.split(',')
    : [];
  const matomoHost = process.env.MATOMO_HOST;

  return {
    directives: {
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: [
        "'self'",
        'data:',
        'https://fonts.gstatic.com',
        ...trustedHosts,
      ],
      imgSrc: [
        "'self'",
        'data:',
        'https://*.walletconnect.org',
        'https://*.walletconnect.com',
        ...trustedHosts,
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-eval'",
        "'unsafe-inline'",
        matomoHost,
        ...trustedHosts,
      ].filter(Boolean),
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
        matomoHost,
        ...trustedHosts,
      ].filter(Boolean),
      formAction: ["'self'", ...trustedHosts],
      // intentionally open: the app is embedded as a Safe App
      frameAncestors: ['*'],
      manifestSrc: ["'self'", ...trustedHosts],
      mediaSrc: ["'none'"],
      childSrc: [
        "'self'",
        'https://*.walletconnect.org',
        'https://*.walletconnect.com',
        ...trustedHosts,
      ],
      scriptSrcAttr: ["'none'"],
      workerSrc: ["'none'"],
      objectSrc: ["'none'"],
      defaultSrc: ["'self'", ...trustedHosts],
      baseUri: ["'none'"],
      reportURI: process.env.CSP_REPORT_URI,
    },
    reportOnly: process.env.CSP_REPORT_ONLY === 'true',
  };
};
