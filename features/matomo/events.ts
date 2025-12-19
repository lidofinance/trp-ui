import { MatomoEventType } from '@lidofinance/analytics-matomo';

const MATOMO_APP_NAME = 'TRP_Widget';
const MATOMO_APP_PREFIX = 'trp_widget';

export const enum MATOMO_EVENT {
  walletConnected = 'wallet_connected',
  walletAutoConnected = 'wallet_autoconnected',
  connectWallet = 'connect_wallet',
  disconnectWallet = 'disconnect_wallet',
  claim = 'claim',
  claimToAnotherAddress = 'claim_to_another_address',
  useMyAddress = 'use_my_address',
}

const createEvent = (
  description: string,
  eventKey: string,
): MatomoEventType => [
  MATOMO_APP_NAME,
  description,
  `${MATOMO_APP_PREFIX}_${eventKey}`,
];

export const MATOMO_CLICK_EVENTS: Record<MATOMO_EVENT, MatomoEventType> = {
  [MATOMO_EVENT.walletConnected]: createEvent(
    'Wallet is connected',
    MATOMO_EVENT.walletConnected,
  ),
  [MATOMO_EVENT.walletAutoConnected]: createEvent(
    'Wallet is auto-connected',
    MATOMO_EVENT.walletAutoConnected,
  ),
  [MATOMO_EVENT.connectWallet]: createEvent(
    'Push "Connect wallet"',
    MATOMO_EVENT.connectWallet,
  ),
  [MATOMO_EVENT.disconnectWallet]: createEvent(
    'Disconnect wallet manually',
    MATOMO_EVENT.disconnectWallet,
  ),
  [MATOMO_EVENT.claim]: createEvent('Push "Claim"', MATOMO_EVENT.claim),
  [MATOMO_EVENT.claimToAnotherAddress]: createEvent(
    'Push "Claim to another address"',
    MATOMO_EVENT.claimToAnotherAddress,
  ),
  [MATOMO_EVENT.useMyAddress]: createEvent(
    'Push "Use my address"',
    MATOMO_EVENT.useMyAddress,
  ),
};
