import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';
import { metrics, responseTimeMetricWrapper } from 'features/metrics';
import { metricsFactory } from '@lidofinance/next-pages';
import { rateLimitWrapper } from 'features/rate-limit';
import { defaultErrorWrapper } from 'utilsApi/default-error-handler';

const metricsPage = metricsFactory({
  registry: metrics.registry,
});

export default wrapNextRequest([
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/metrics'),
  defaultErrorWrapper,
])(metricsPage);
