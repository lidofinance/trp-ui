import { rpcFactory } from '@lidofinance/next-pages';
import { wrapRequest } from '@lidofinance/next-api-wrapper';
import { dynamics, externalRPC } from 'config';
import { serverLogger } from 'features/loggers';
import {
  metrics,
  METRICS_PREFIX,
  responseTimeMetricWrapper,
} from 'features/metrics';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper, fetchRPC } from 'shared/api';

const rpc = rpcFactory({
  fetchRPC,
  serverLogger,
  metrics: {
    prefix: METRICS_PREFIX,
    registry: metrics.registry,
  },
  allowedRPCMethods: [
    /*
     * Different methods are used by different wallets, even the 'test' one.
     * Do not remove any if you haven't tested all possible wallets.
     */
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
