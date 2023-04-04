import { rpcFactory } from '@lidofinance/next-pages';
import { wrapRequest } from '@lidofinance/next-api-wrapper';
import { dynamics, externalRPC } from 'config';
import { fetchRPC, serverLogger } from 'utilsApi';
import {
  metrics,
  METRICS_PREFIX,
  responseTimeMetricWrapper,
} from 'features/metrics';
import { rateLimitWrapper } from 'features/rate-limit';
import { defaultErrorWrapper } from 'utilsApi/default-error-handler';

const rpc = rpcFactory({
  fetchRPC,
  serverLogger,
  metrics: {
    prefix: METRICS_PREFIX,
    registry: metrics.registry,
  },
  allowedRPCMethods: [
    'test',
    'eth_call',
    'eth_gasPrice',
    'eth_estimateGas',
    'eth_getBlockByNumber',
    'eth_getBalance',
    'eth_blockNumber',
    'eth_getTransactionByHash',
    'eth_getTransactionReceipt',
    'eth_getTransactionCount',
    'eth_sendRawTransaction',
    'eth_getLogs',
    'eth_chainId',
    'net_version',
  ],
  defaultChain: `${dynamics.defaultChain}`,
  providers: externalRPC,
});

export default wrapRequest([
  rateLimitWrapper,
  responseTimeMetricWrapper(metrics.request.apiTimings, '/api/rpc'),
  defaultErrorWrapper,
])(rpc);
