import { RequestWrapper } from '@lidofinance/next-api-wrapper';

export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
  PATCH = 'PATCH',
}

export type CorsWrapperType = {
  origin?: string[];
  methods?: HttpMethod[];
  allowedHeaders?: string[];
  credentials?: boolean;
};

export const cors =
  ({
    origin = ['*'],
    methods = [HttpMethod.GET],
    allowedHeaders = ['*'],
    credentials = false,
  }: CorsWrapperType): RequestWrapper =>
  async (req, res, next) => {
    if (!req || !req.method) {
      res.status(405);
      throw new Error('Not HTTP method provided');
    }

    res.setHeader('Access-Control-Allow-Credentials', String(credentials));
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));

    if (req.method === HttpMethod.OPTIONS) {
      // In preflight just need return a CORS headers
      res.status(200).end();
      return;
    }

    await next?.(req, res, next);
  };
