import type { NextApiRequest, NextApiResponse } from 'next';
import {
  wrapRequest as wrapNextRequest,
  cacheControl,
} from '@lidofinance/next-api-wrapper';
import { metrics, responseTimeMetricWrapper } from 'features/metrics';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';
import { httpMethodGuard } from 'shared/api/http-method-guard';
import { HttpMethod } from 'shared/api/cors';
import { loadValidationFile } from 'shared/api/load-validation-file';

const CACHE_VALIDATION_FILE_HEADERS =
  'public, max-age=30, stale-if-error=1200, stale-while-revalidate=30';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validationFile = await loadValidationFile();
  res.status(200).json(validationFile);
};

export default wrapNextRequest([
  httpMethodGuard([HttpMethod.GET]),
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/validation-file'),
  cacheControl({ headers: CACHE_VALIDATION_FILE_HEADERS }),
  defaultErrorWrapper,
])(handler);
