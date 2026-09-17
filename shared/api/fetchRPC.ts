import {
  trackedFetchRpcFactory,
  type TrackedFetchRPC,
} from '@lidofinance/api-rpc';
import { metrics, METRICS_PREFIX } from 'features/metrics';
import { USER_AGENT } from './fetch-external';

const trackedFetchRPC = trackedFetchRpcFactory({
  registry: metrics.registry,
  prefix: METRICS_PREFIX,
});

export const fetchRPC: TrackedFetchRPC = (url, init, context) => {
  const headers = new Headers(init.headers);
  headers.set('User-Agent', USER_AGENT);

  return trackedFetchRPC(
    url,
    { ...init, headers: Object.fromEntries(headers.entries()) },
    context,
  );
};
