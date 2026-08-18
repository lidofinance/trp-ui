import { RequestWrapper } from '@lidofinance/next-api-wrapper';

import { HttpMethod } from './cors';

export const httpMethodGuard =
  (methodAllowList: HttpMethod[]): RequestWrapper =>
  async (req, res, next) => {
    if (
      !req ||
      !req.method ||
      !methodAllowList.includes(req.method as HttpMethod)
    ) {
      // allow OPTIONS to pass through but still add the Allow header
      res.setHeader('Allow', methodAllowList.join(', '));

      if (req.method !== HttpMethod.OPTIONS) {
        res.status(405);
        throw new Error(`You can use only: ${methodAllowList.toString()}`);
      }
    }

    await next?.(req, res, next);
  };
