import { getStatusLabel } from '@lidofinance/api-metrics';
import { RequestWrapper } from '@lidofinance/next-api-wrapper';
import { Histogram } from 'prom-client';

export const responseTimeMetricWrapper =
  (metrics: Histogram<string>, route: string): RequestWrapper =>
  async (req, res, next) => {
    let status = '2xx';
    const endMetric = metrics.startTimer({ route });

    try {
      await next?.(req, res, next);
      status = getStatusLabel(res.statusCode);
    } catch (error) {
      status = getStatusLabel(res.statusCode);
      // throw error up the stack
      throw error;
    } finally {
      endMetric({ status });
    }
  };
