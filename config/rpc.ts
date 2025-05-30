import { CHAINS } from '@lido-sdk/constants';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { rpcUrls } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  return `${BASE_URL}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: getBackendRPCPath(CHAINS.Mainnet),
  [CHAINS.Goerli]: getBackendRPCPath(CHAINS.Goerli),
  [CHAINS.Holesky]: getBackendRPCPath(CHAINS.Holesky),
  [CHAINS.Hoodi]: getBackendRPCPath(CHAINS.Hoodi),
};

export const externalRPC: Record<number, [string, ...string[]]> = {
  [CHAINS.Mainnet]: rpcUrls,
  [CHAINS.Goerli]: rpcUrls,
  [CHAINS.Holesky]: rpcUrls,
  [CHAINS.Hoodi]: rpcUrls,
};
