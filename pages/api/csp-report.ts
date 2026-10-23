import {
  API,
  wrapRequest as wrapNextRequest,
} from '@lidofinance/next-api-wrapper';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';
import { HttpMethod } from 'shared/api/cors';
import { httpMethodGuard } from 'shared/api/http-method-guard';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10kb',
    },
  },
};

// only these fields are logged: the report body is attacker-controlled, and browsers
// send it as application/csp-report, so it never goes through the JSON body parser
const CSP_REPORT_FIELDS = [
  'document-uri',
  'referrer',
  'violated-directive',
  'effective-directive',
  'original-policy',
  'disposition',
  'blocked-uri',
  'source-file',
  'line-number',
  'column-number',
  'status-code',
  'script-sample',
] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const cspReport: API = (req, res) => {
  let payload: unknown = req.body;

  if (typeof req.body === 'string') {
    try {
      payload = JSON.parse(req.body);
    } catch {
      res.status(400).send({ status: 'invalid json' });
      return;
    }
  }

  const source = isRecord(payload) ? payload : {};
  const report = isRecord(source['csp-report']) ? source['csp-report'] : source;

  const violation: Record<string, unknown> = {};
  for (const field of CSP_REPORT_FIELDS) {
    if (report[field] !== undefined) {
      violation[field] = report[field];
    }
  }

  console.warn({ message: 'CSP Violation', ...violation });

  res.status(200).send({ status: 'ok' });
};

export default wrapNextRequest([
  httpMethodGuard([HttpMethod.POST]),
  rateLimitWrapper,
  defaultErrorWrapper,
])(cspReport);
