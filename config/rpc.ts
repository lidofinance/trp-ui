import { CHAINS } from '@lido-sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { rpcUrls_1, rpcUrls_5, rpcUrls_17000 } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  return `${BASE_URL}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: getBackendRPCPath(CHAINS.Mainnet),
  [CHAINS.Goerli]: getBackendRPCPath(CHAINS.Goerli),
  [CHAINS.Holesky]: getBackendRPCPath(CHAINS.Holesky),
};

export const externalRPC: Record<number, [string, ...string[]]> = {
  [CHAINS.Mainnet]: rpcUrls_1,
  [CHAINS.Goerli]: rpcUrls_5,
  [CHAINS.Holesky]: rpcUrls_17000,
};
