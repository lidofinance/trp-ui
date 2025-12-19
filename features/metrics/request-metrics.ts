import { Histogram, Registry, Counter } from 'prom-client';
import { METRICS_PREFIX } from './config';

export class RequestMetrics {
  apiTimings: Histogram<'hostname' | 'route' | 'entity' | 'status'>;
  validationFileLoadError: Counter<'error'>;

  constructor(public registry: Registry) {
    this.apiTimings = new Histogram({
      name: METRICS_PREFIX + 'api_response_internal',
      help: 'API response time',
      labelNames: ['hostname', 'route', 'status'],
      buckets: [0.1, 0.2, 0.3, 0.6, 1, 1.5, 2, 5],
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
