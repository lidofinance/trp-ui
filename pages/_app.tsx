import { memo } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import {
  ToastContainer,
  CookiesTooltip,
  migrationAllowCookieToCrossDomainCookieClientSide,
  migrationThemeCookiesToCrossDomainCookiesClientSide,
  CookieThemeProvider,
} from '@lidofinance/lido-ui';
import { withCsp } from 'shared/api/withCsp';
import { GlobalStyle } from 'shared/ui';
import { VestingsProvider } from 'features/vesting';
import { ModalProvider } from 'features/walletModal';
import { ProviderWeb3 } from 'reef-knot';
import dynamics from 'config/dynamics';
import { backendRPC } from 'config';

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

const AppWrapper = (props: AppProps): JSX.Element => {
  const { ...rest } = props;

  return (
    <CookieThemeProvider>
      {/* @ts-expect-error need to patch web3-react */}
      <ProviderWeb3
        defaultChainId={dynamics.defaultChain}
        supportedChainIds={dynamics.supportedChains}
        rpc={backendRPC}
      >
        <ModalProvider>
          <GlobalStyle />
          <VestingsProvider>
            <MemoApp {...rest} />
            <CookiesTooltip />
            <ToastContainer />
          </VestingsProvider>
        </ModalProvider>
      </ProviderWeb3>
    </CookieThemeProvider>
  );
};

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  return await NextApp.getInitialProps(appContext);
};

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
