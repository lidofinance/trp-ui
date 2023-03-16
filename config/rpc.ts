import { CHAINS } from 'config/chains';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { basePath, infuraApiKey, alchemyApiKey } = serverRuntimeConfig;

export const getBackendRPCPath = (chainId: CHAINS): string => {
  return `${basePath ?? ''}/api/rpc?chainId=${chainId}`;
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
