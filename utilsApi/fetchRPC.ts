import { trackedFetchRpcFactory } from '@lidofinance/api-rpc';
import { metrics, METRICS_PREFIX } from 'features/metrics';

export const fetchRPC = trackedFetchRpcFactory({
  registry: metrics.registry,
  prefix: METRICS_PREFIX,
});
