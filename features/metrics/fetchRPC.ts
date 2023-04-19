import { trackedFetchRpcFactory } from '@lidofinance/api-rpc';
import { metrics } from './metrics';
import { METRICS_PREFIX } from './config';

export const fetchRPC = trackedFetchRpcFactory({
  registry: metrics.registry,
  prefix: METRICS_PREFIX,
});
