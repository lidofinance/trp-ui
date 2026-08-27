import { Histogram, Registry, Counter } from 'prom-client';
import { METRICS_PREFIX } from './config';

export class RequestMetrics {
  apiTimings: Histogram<'hostname' | 'route' | 'entity' | 'status'>;
  apiTimingsExternal: Histogram<'hostname' | 'status'>;
  externalRequestCounter: Counter<'hostname' | 'status'>;
  validationFileLoadError: Counter<'error'>;

  constructor(public registry: Registry) {
    this.apiTimings = new Histogram({
      name: METRICS_PREFIX + 'api_response_internal',
      help: 'API response time',
      labelNames: ['hostname', 'route', 'status'],
      buckets: [0.1, 0.2, 0.3, 0.6, 1, 1.5, 2, 5],
      registers: [registry],
    });
    this.apiTimingsExternal = new Histogram({
      name: METRICS_PREFIX + 'api_response_external',
      help: 'Duration of outgoing requests to external APIs',
      labelNames: ['hostname', 'status'],
      buckets: [0.1, 0.2, 0.3, 0.6, 1, 1.5, 2, 5],
      registers: [registry],
    });
    this.externalRequestCounter = new Counter({
      name: METRICS_PREFIX + 'external_requests_total',
      help: 'Total number of outgoing requests to external APIs',
      labelNames: ['hostname', 'status'],
      registers: [registry],
    });
    this.validationFileLoadError = this.validationFileLoadErrorInit();
  }

  validationFileLoadErrorInit() {
    return new Counter({
      name: METRICS_PREFIX + 'validation_file_load_error',
      help: 'Counts of validation file load errors',
      labelNames: ['error'],
      registers: [this.registry],
    });
  }
}
