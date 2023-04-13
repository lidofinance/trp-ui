import { FC, PropsWithChildren } from 'react';
import { Web3Provider } from './web3';
import { ModalProvider } from './modals';

export const WalletProviders: FC<PropsWithChildren> = ({ children }) => (
  <Web3Provider>
    <ModalProvider>{children}</ModalProvider>
  </Web3Provider>
);
