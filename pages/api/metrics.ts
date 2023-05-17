import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';
import { metrics, responseTimeMetricWrapper } from 'features/metrics';
import { metricsFactory } from '@lidofinance/next-pages/api';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';

const metricsPage = metricsFactory({
  registry: metrics.registry,
});

export default wrapNextRequest([
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/metrics'),
  defaultErrorWrapper,
])(metricsPage);
