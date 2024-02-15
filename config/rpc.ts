import { CHAINS } from 'config/chains';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { rpcUrls_1, rpcUrls_5 } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  return `${BASE_URL}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: getBackendRPCPath(CHAINS.Mainnet),
  [CHAINS.Goerli]: getBackendRPCPath(CHAINS.Goerli),
};

export const externalRPC: Record<number, [string, ...string[]]> = {
  [CHAINS.Mainnet]: rpcUrls_1,
  [CHAINS.Goerli]: rpcUrls_5,
};
