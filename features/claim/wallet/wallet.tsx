import { useSDK } from '@lido-sdk/react';
import { Divider } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';

import {
  WalletCardRow,
  WalletCardAccount,
  WalletCardComponent,
} from 'components/walletCard';
import FallbackWallet from 'components/fallbackWallet';
import { useVestingsContext } from '../providers';

import { WalletLocked } from './wallet-locked';
import { WalletUnclaimed } from './wallet-unclaimed';
import { WalletPeriod } from './wallet-period';

import { WalletCardStyled } from './styles';

const WalletComponent: WalletCardComponent = (props) => {
  const { account } = useSDK();
  const { currentVesting } = useVestingsContext();

  if (!currentVesting) return null;

  return (
    <WalletCardStyled {...props}>
      <WalletCardRow>
        {currentVesting && <WalletLocked vestingAddress={currentVesting} />}
        <WalletCardAccount account={account} />
      </WalletCardRow>
      <Divider />
      <WalletCardRow>
        {currentVesting && <WalletUnclaimed vestingAddress={currentVesting} />}
        {currentVesting && <WalletPeriod vestingAddress={currentVesting} />}
      </WalletCardRow>
    </WalletCardStyled>
  );
};

export const Wallet: WalletCardComponent = (props) => {
  const { active } = useWeb3();
  return active ? (
    <WalletComponent {...props} />
  ) : (
    <FallbackWallet {...props} />
  );
};
