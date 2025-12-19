import type { NextApiRequest } from 'next';
import { API } from '@lidofinance/next-api-wrapper';
import { Cache } from 'memory-cache';

type ProxyOptions = {
  proxyUrl: string | ((req: NextApiRequest) => string);
  cacheTTL: number;
  timeout?: number;
  ignoreParams?: boolean;
};

class FetcherError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error instanceof Object && 'message' in error)
    return error['message'] as string;
  return 'Something went wrong';
};

const extractError = async (response: Response) => {
  try {
    const error = await response.json();
    return extractErrorMessage(error);
  } catch (error) {
    return 'An error occurred while fetching the data';
  }
};

export const createCachedProxy = ({
  cacheTTL,
  proxyUrl,
  ignoreParams,
  timeout = 5000,
}: ProxyOptions): API => {
  const cache = new Cache<string, unknown>();
  return async (req, res) => {
    const params =
      ignoreParams || Object.keys(req.query).length === 0
        ? null
        : new URLSearchParams(
            Object.entries(req.query).reduce((obj, [k, v]) => {
              if (typeof v === 'string') obj[k] = v;
              return obj;
            }, {} as Record<string, string>),
          );
    // Generate the actual proxy URL, passing req if the function accepts it
    const proxyUrlString =
      typeof proxyUrl === 'function' ? proxyUrl(req) : proxyUrl;

    const cacheKey = `${proxyUrlString}-${params?.toString() ?? ''}`;

    const cachedValue = cache.get(cacheKey);
    if (cachedValue) {
      res.json(cachedValue);
      return;
    }
    const url = proxyUrlString + (params ? `?${params.toString()}` : '');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(timeout),
        ...params,
      });

      if (!response.ok) {
        throw new FetcherError(await extractError(response), response.status);
      }

      const data = await response.json();

      cache.put(cacheKey, data, cacheTTL);
      res.json(data);
    } catch (e) {
      if (e instanceof FetcherError && e.status >= 400 && e.status < 500) {
        console.warn(`[CachedProxy]Forwarding ${e.status} error from ${url}`);
        res.status(e.status);
        res.json({ error: e.message });
        return;
      }
      console.warn(`[CachedProxy] Failed to proxy from ${url}`, e);
      res.status(500).end();
      throw e;
    }
  };
};
