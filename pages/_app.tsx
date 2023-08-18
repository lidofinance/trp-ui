import { memo } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import {
  ToastContainer,
  CookiesTooltip,
  migrationAllowCookieToCrossDomainCookieClientSide,
  migrationThemeCookiesToCrossDomainCookiesClientSide,
  CookieThemeProvider,
} from '@lidofinance/lido-ui';
import { GlobalStyle } from 'shared/ui';
import { ModalProvider } from 'features/walletModal';
import { ProviderWeb3 } from 'reef-knot/web3-react';
import dynamics from 'config/dynamics';
import { backendRPC } from 'config';
import Head from 'next/head';
import { AppWagmiConfig } from 'features/wagmi';

// Migrations old cookies to new cross domain cookies
migrationThemeCookiesToCrossDomainCookiesClientSide();

// Migrations old allow cookies to new cross domain cookies
migrationAllowCookieToCrossDomainCookieClientSide(
  'LIDO_WIDGET__COOKIES_ALLOWED',
);

const App = memo((props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
});
App.displayName = 'App';

const MemoApp = memo(App);

const AppWrapper = (props: AppProps): JSX.Element => (
  <>
    <Head>
      <title>TRP UI | Lido</title>
    </Head>

    <CookieThemeProvider>
      <AppWagmiConfig>
        {/* @ts-expect-error need to patch web3-react */}
        <ProviderWeb3
          defaultChainId={dynamics.defaultChain}
          supportedChainIds={dynamics.supportedChains}
          rpc={backendRPC}
          walletconnectProjectId={dynamics.walletconnectProjectId}
        >
          <ModalProvider>
            <MemoApp {...props} />
          </ModalProvider>
        </ProviderWeb3>
      </AppWagmiConfig>

      <GlobalStyle />
      <CookiesTooltip />
      <ToastContainer />
    </CookieThemeProvider>
  </>
);

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  return await NextApp.getInitialProps(appContext);
};

export default AppWrapper;
