import { FC, PropsWithChildren } from 'react';
import { CookieThemeProvider } from '@lidofinance/lido-ui';
import { ModalProvider } from 'widgets/walletModal';
import { Web3Provider } from './web3';
import { GlobalStyle } from './globalStyle';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CookieThemeProvider>
    <GlobalStyle />
    <Web3Provider>
      <ModalProvider>{children}</ModalProvider>
    </Web3Provider>
  </CookieThemeProvider>
);
