import { FC, PropsWithChildren } from 'react';
import { ProviderWeb3 } from '@reef-knot/web3-react';
import { backendRPC } from 'shared/lib/rpc';
import { dynamics } from 'shared/ui/dynamics';

export type EnvConfig = {
  defaultChain: string;
  supportedChains: string;
};

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    // @ts-expect-error need to patch web3-react
    <ProviderWeb3
      defaultChainId={dynamics.defaultChain}
      supportedChainIds={dynamics.supportedChains}
      rpc={backendRPC}
    >
      {children}
    </ProviderWeb3>
  );
};
