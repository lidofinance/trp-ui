import { RequestWrapper } from '@lidofinance/next-api-wrapper';

import { HttpMethod } from './cors';

export const httpMethodGuard =
  (methodAllowList: HttpMethod[]): RequestWrapper =>
  async (req, res, next) => {
    const isAllowed = methodAllowList.some((method) => method === req.method);

    if (!isAllowed) {
      res.setHeader('Allow', methodAllowList.join(', '));

      if (req.method === HttpMethod.OPTIONS) {
        res.status(204).end();
        return;
      }

      res.status(405);
      throw new Error(`You can use only: ${methodAllowList.join(', ')}`);
    }

    await next?.(req, res, next);
  };
