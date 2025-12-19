import type { NextApiRequest, NextApiResponse } from 'next';
import {
  wrapRequest as wrapNextRequest,
  cacheControl,
} from '@lidofinance/next-api-wrapper';
import { metrics, responseTimeMetricWrapper } from 'features/metrics';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';
import { isAddress } from 'ethers/lib/utils';
import { serverRuntimeConfig } from 'config';
import { createCachedProxy } from 'shared/api/cached-proxy';
import { cors, HttpMethod } from 'shared/api/cors';

const CACHE_VALIDATION_HEADERS =
  'public, max-age=30, stale-if-error=1200, stale-while-revalidate=30';

// Validate address to prevent SSRF attacks
const validateEthereumAddress = (address: unknown): string | null => {
  if (typeof address !== 'string' || !address) return null;
  if (!isAddress(address)) return null;

  return address.toLowerCase();
};

// Create proxy once at module level to preserve cache
const validationProxy = createCachedProxy({
  proxyUrl: (req) => {
    const validatedAddress = validateEthereumAddress(req.query.address);
    if (!validatedAddress) {
      throw new Error('Invalid address'); // This will be caught by the handler
    }
    return serverRuntimeConfig.validationAPI + '/v1/check/' + validatedAddress;
  },
  cacheTTL: 1000,
  ignoreParams: true, // Address is in path, not query
  timeout: 10_000,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!serverRuntimeConfig.validationAPI) {
    console.info(
      '[api/validation] Skipped setup: serverRuntimeConfig.validationAPI is null',
    );
    res.status(404).end();
  } else {
    const validatedAddress = validateEthereumAddress(req.query.address);

    if (!validatedAddress) {
      res.status(400).json({
        error: 'Invalid Ethereum address',
        message: 'Address must be a valid Ethereum address format',
      });
      return;
    }

    return validationProxy(req, res);
  }
};

export default wrapNextRequest([
  cors({ origin: ['*'], methods: [HttpMethod.GET] }),
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/validation'),
  cacheControl({ headers: CACHE_VALIDATION_HEADERS }),
  defaultErrorWrapper,
])(handler);
