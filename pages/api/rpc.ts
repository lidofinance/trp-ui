import getConfig from 'next/config';
import { externalRPC } from 'shared/api/rpc';
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRpc, FetchRpcInitBody, iterateUrls } from '@lidofinance/rpc';
import { serverLogger } from 'shared/api/serverLogger';

// This code is copy of https://github.com/lidofinance/warehouse/tree/main/packages/next/pages
// but metrics were removed.

const { publicRuntimeConfig } = getConfig();
const { defaultChain } = publicRuntimeConfig;

export const DEFAULT_API_ERROR_MESSAGE =
  'Something went wrong. Sorry, try again later :(';

export const HEALTHY_RPC_SERVICES_ARE_OVER = 'Healthy RPC services are over!';

export class UnsupportedChainIdError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported chainId');
  }
}

export class UnsupportedHTTPMethodError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported HTTP method');
  }
}

const allowedRPCMethods: string[] = [
  'eth_getBalance',
  'eth_getLogs',
  'eth_call',
];

const rpc = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // Accept only POST requests
    if (req.method !== 'POST') {
      // We don't care about tracking blocked requests here
      throw new UnsupportedHTTPMethodError();
    }

    const chainId = Number(req.query.chainId || defaultChain);

    // Allow only chainId of specified chains
    if (externalRPC[chainId] == null) {
      // We don't care about tracking blocked requests here
      throw new UnsupportedChainIdError();
    }

    // Check if provided methods are allowed
    for (const { method } of Array.isArray(req.body) ? req.body : [req.body]) {
      if (typeof method !== 'string') {
        throw new Error(`RPC method isn't string`);
      }
      if (!allowedRPCMethods.includes(method)) {
        throw new Error(`RPC method ${method} isn't allowed`);
      }
    }

    const requested = await iterateUrls(
      externalRPC[chainId],
      (url) => fetchRpc(url, { body: req.body as FetchRpcInitBody }),
      serverLogger.error,
    );

    res.setHeader(
      'Content-Type',
      requested.headers.get('Content-Type') ?? 'application/json',
    );
    res.status(requested.status).send(requested.body);
  } catch (error) {
    if (error instanceof Error) {
      // TODO: check if there are errors duplication with iterateUrls
      serverLogger.error(error.message ?? DEFAULT_API_ERROR_MESSAGE);
      res.status(500).json(error.message ?? DEFAULT_API_ERROR_MESSAGE);
    } else {
      res.status(500).json(HEALTHY_RPC_SERVICES_ARE_OVER);
    }
  }
};
export default rpc;
