import { collectDefaultMetrics, Registry } from 'prom-client';
import { dynamics } from 'config';
import buildInfoJson from 'build-info.json';
import { collectStartupMetrics } from '@lidofinance/api-metrics';
import { METRICS_PREFIX } from './config';
import { RequestMetrics } from './request-metrics';

export const metrics = new (class Metrics {
  registry = new Registry();

  request = new RequestMetrics(this.registry);

  constructor() {
    collectStartupMetrics({
      prefix: METRICS_PREFIX,
      registry: this.registry,
      defaultChain: `${dynamics.defaultChain}`,
      supportedChains: dynamics.supportedChains.map((chain) => `${chain}`),
      version: buildInfoJson.version,
      commit: buildInfoJson.commit,
      branch: buildInfoJson.branch,
    });
    collectDefaultMetrics({ prefix: METRICS_PREFIX, register: this.registry });
  }
})();
