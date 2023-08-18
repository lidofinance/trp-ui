import { FC, PropsWithChildren } from 'react';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import * as wagmiChains from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getConnectors } from 'reef-knot/core-react';
import dynamics from 'config/dynamics';
import { backendRPC, getBackendRPCPath } from 'config';

const wagmiChainsArray = Object.values(wagmiChains);
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
