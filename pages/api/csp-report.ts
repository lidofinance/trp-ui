import { NextApiRequest, NextApiResponse } from 'next';
import { wrapRequest as wrapNextRequest } from '@lidofinance/next-api-wrapper';
import { rateLimitWrapper } from 'features/rateLimit';
import { defaultErrorWrapper } from 'shared/api';
import { HttpMethod } from 'shared/api/cors';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10kb',
    },
  },
};

const cspReport = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== HttpMethod.POST) {
    res.setHeader('Allow', HttpMethod.POST);
    res.status(405).send({ status: 'method not allowed' });
    return;
  }

  let report: unknown = req.body;
  if (typeof req.body === 'string') {
    try {
      report = JSON.parse(req.body);
    } catch {
      res.status(400).send({ status: 'invalid json' });
      return;
    }
  }

  console.warn({ message: 'CSP Violation', report });

  res.status(200).send({ status: 'ok' });
};

export default wrapNextRequest([rateLimitWrapper, defaultErrorWrapper])(
  cspReport,
);
