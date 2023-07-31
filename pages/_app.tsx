import { FC } from 'react';
import NextApp, { AppProps } from 'next/app';

import { EVMWidgetApp } from '@lidofinance/eth-next-widget-app-evm';
import { migrationAllowCookieToCrossDomainCookieClientSide } from '@lidofinance/lido-ui';

import { backendRPC, getBackendRPCPath, dynamics } from 'config';
import { HeaderActions } from 'features/headerActions';
import { Navigation } from 'features/navigation';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';
import { GlobalStyle } from 'shared/ui';

// Migrations old allow cookies to new cross domain cookies
migrationAllowCookieToCrossDomainCookieClientSide(
  'LIDO_WIDGET__COOKIES_ALLOWED',
);

const AppWrapper: FC<AppProps> = (props) => (
  <NoSSRWrapper>
    <EVMWidgetApp
      navigation={<Navigation />}
      headerActions={<HeaderActions />}
      reefKnot={{
        hiddenWallets: ['Opera Wallet'],
      }}
      providerWeb3={{
        defaultChainId: dynamics.defaultChain,
        supportedChainIds: dynamics.supportedChains,
        rpc: backendRPC,
        walletconnectProjectId: dynamics.walletconnectProjectId,
      }}
      wagmi={{
        defaultChain: dynamics.defaultChain,
        supportedChains: dynamics.supportedChains,
        backendRPC: backendRPC,
        getBackendRPCPath: getBackendRPCPath,
        walletconnectProjectId: dynamics.walletconnectProjectId,
      }}
    >
      <GlobalStyle />
      <NextApp {...props} />
    </EVMWidgetApp>
  </NoSSRWrapper>
);

export default AppWrapper;
