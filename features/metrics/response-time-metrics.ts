import { getStatusLabel } from '@lidofinance/api-metrics';
import { RequestWrapper } from '@lidofinance/next-api-wrapper';
import { Histogram } from 'prom-client';

export const responseTimeMetricWrapper =
  (metrics: Histogram<string>, route: string): RequestWrapper =>
  async (req, res, next) => {
    const endMetric = metrics.startTimer({ route });

    try {
      await next?.(req, res, next);
    } finally {
      endMetric({ status: getStatusLabel(res.statusCode) });
    }
  };
