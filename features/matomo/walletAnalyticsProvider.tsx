/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ReactNode,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import invariant from 'tiny-invariant';
import { useWeb3 } from 'reef-knot/web3-react';
import { trackMatomoEvent } from './trackMatomoEvent';
import { MATOMO_EVENT } from './events';

const WalletAnalyticsContext = createContext<{
  onConnectModalClick: () => void;
  onDisconnect: () => void;
}>({
  onDisconnect: () => {},
  onConnectModalClick: () => {},
});
WalletAnalyticsContext.displayName = 'WalletAnalyticsContext';

export const useWalletAnalytics = () => {
  const value = useContext(WalletAnalyticsContext);
  invariant(
    value !== null,
    'useWalletAnalytics was used used outside of WalletAnalyticsContext',
  );
  return value;
};

export const WalletAnalyticsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { account } = useWeb3();

  const accountRef = useRef<string | null>(null);
  const hasConnectedRef = useRef(false);
  const isConnectingWithModalRef = useRef(false);

  useEffect(() => {
    if (account) {
      // Wallet connected
      if (accountRef.current === null) {
        // Wallet connected from modal
        if (isConnectingWithModalRef.current) {
          trackMatomoEvent(MATOMO_EVENT.walletConnected);
          isConnectingWithModalRef.current = false;
        } else {
          // Wallet connected automatically (e.g. previously connected)
          trackMatomoEvent(MATOMO_EVENT.walletAutoConnected);
        }
        hasConnectedRef.current = true;
      } else if (account !== accountRef.current || hasConnectedRef.current) {
        // Wallet reconnected
        trackMatomoEvent(MATOMO_EVENT.walletReconnected);
      }
      accountRef.current = account;
    }
  }, [account]);

  const onDisconnect = useCallback(() => {
    trackMatomoEvent(MATOMO_EVENT.disconnectWallet);
  }, []);

  const onConnectModalClick = useCallback(() => {
    trackMatomoEvent(MATOMO_EVENT.connectWallet);
    isConnectingWithModalRef.current = true;
  }, []);

  return (
    <WalletAnalyticsContext.Provider
      value={{
        onDisconnect,
        onConnectModalClick,
      }}
    >
      {children}
    </WalletAnalyticsContext.Provider>
  );
};
