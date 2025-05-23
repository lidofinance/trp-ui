import { FC, PropsWithChildren } from 'react';
import { CHAINS } from '@lido-sdk/constants';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import * as wagmiChains from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getConnectors } from 'reef-knot/core-react';
import dynamics from 'config/dynamics';
import { backendRPC, getBackendRPCPath } from 'config';

export const holesky = {
  id: CHAINS.Holesky,
  name: 'Holesky',
  network: 'holesky',
  // ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  nativeCurrency: {
    decimals: 18,
    name: 'Holesky Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: [backendRPC[CHAINS.Holesky]] },
    default: { http: [backendRPC[CHAINS.Holesky]] },
  },
  blockExplorers: {
    etherscan: { name: 'holesky', url: 'https://holesky.etherscan.io/' },
    default: { name: 'holesky', url: 'https://holesky.etherscan.io/' },
  },
  testnet: true,
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0x2548a7E09deE955c4d97688dcB6C5b24085725f5',
      blockCreated: 815385,
    },
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 77,
    },
  },
} as const;

export const hoodi = {
  id: CHAINS.Hoodi,
  name: 'Hoodi',
  network: 'hoodi',
  nativeCurrency: {
    decimals: 18,
    name: 'hoodiETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: [backendRPC[CHAINS.Hoodi]] },
    default: { http: [backendRPC[CHAINS.Hoodi]] },
  },
  blockExplorers: {
    etherscan: { name: 'hoodi', url: 'https://hoodi.etherscan.io/' },
    default: { name: 'hoodi', url: 'https://hoodi.etherscan.io/' },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 2589,
    },
  },
} as const;

const wagmiChainsArray = Object.values({
  ...wagmiChains,
  [CHAINS.Holesky]: holesky,
  [CHAINS.Hoodi]: hoodi,
});

const supportedChains = wagmiChainsArray.filter(
  (chain) =>
    // Temporary wagmi fix, need to hardcode it to not affect non-wagmi wallets
    dynamics.supportedChains.includes(chain.id) || chain.id === 80001,
);
const defaultChain = wagmiChainsArray.find(
  (chain) => chain.id === dynamics.defaultChain,
);

const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: getBackendRPCPath(chain.id),
      }),
    }),
  ],
);

const connectors = getConnectors({
  chains,
  defaultChain,
  rpc: backendRPC,
  walletconnectProjectId: dynamics.walletconnectProjectId,
});

const client = createClient({
  connectors,
  autoConnect: true,
  provider,
  webSocketProvider,
});

export const AppWagmiConfig: FC<PropsWithChildren> = ({ children }) => (
  <WagmiConfig client={client}>{children}</WagmiConfig>
);
