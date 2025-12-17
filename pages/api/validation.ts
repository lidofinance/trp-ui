import type { NextApiRequest, NextApiResponse } from 'next';
import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';
import { metrics, responseTimeMetricWrapper } from 'features/metrics';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';
import { isAddress } from 'ethers/lib/utils';
import { serverRuntimeConfig } from 'config';

// Validate address to prevent SSRF attacks
const validateEthereumAddress = (address: unknown): string | null => {
  if (typeof address !== 'string' || !address) return null;
  if (!isAddress(address)) return null;

  return address.toLowerCase();
};

let handler;
if (!serverRuntimeConfig.validationAPI) {
  console.info(
    '[api/validation] Skipped setup: secretConfig.validationAPI is null',
  );
  handler = (_: NextApiRequest, res: NextApiResponse) => {
    res.status(404).end();
  };
} else {
  handler = (req: NextApiRequest, res: NextApiResponse) => {
    const validatedAddress = validateEthereumAddress(req.query.address);

    if (!validatedAddress) {
      res.status(400).json({
        error: 'Invalid Ethereum address',
        message: 'Address must be a valid Ethereum address format',
      });
      return;
    }

    return serverRuntimeConfig.validationAPI + '/v1/check/' + validatedAddress;
  };
}

export default wrapNextRequest([
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/validation'),
  defaultErrorWrapper,
])(handler);
