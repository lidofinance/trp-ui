import { CHAINS } from 'config/chains';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { infuraApiKey, alchemyApiKey } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  const BASE_URL = typeof window === 'undefined' ? '' : window.location.origin;
  return `${BASE_URL}/api/rpc?chainId=${chainId}`;
};

export const backendRPC = {
  [CHAINS.Mainnet]: getBackendRPCPath(CHAINS.Mainnet),
  [CHAINS.Goerli]: getBackendRPCPath(CHAINS.Goerli),
};

export const externalRPC: Record<number, [string, ...string[]]> = {
  [CHAINS.Mainnet]: [
    `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
    `https://mainnet.infura.io/v3/${infuraApiKey}`,
  ],
  [CHAINS.Goerli]: [
    `https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`,
    `https://goerli.infura.io/v3/${infuraApiKey}`,
  ],
};
