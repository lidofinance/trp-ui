import { useWeb3 } from 'reef-knot';
import { Divider } from '@lidofinance/lido-ui';
import { WalletCardRow, WalletCardComponent } from '@lidofinance/ui-primitives';
import { WalletFallback } from '@lidofinance/eth-ui-primitives';

import { useVestingsContext } from 'features/vesting';
import { WalletLocked } from './wallet-locked';
import { WalletUnclaimed } from './wallet-unclaimed';
import { WalletPeriod } from './wallet-period';
import { WalletCardStyled } from './wallet.style';
import { WalletVesting } from './wallet-vesting';

const WalletComponent: WalletCardComponent = (props) => {
  const { escrow: currentVesting } = useVestingsContext();

  if (!currentVesting) return null;

  return (
    <WalletCardStyled {...props}>
      <WalletCardRow>
        {currentVesting && <WalletLocked />}
        {currentVesting && <WalletVesting vestingAddress={currentVesting} />}
      </WalletCardRow>
      <Divider />
      <WalletCardRow>
        {currentVesting && <WalletUnclaimed />}
        {currentVesting && <WalletPeriod />}
      </WalletCardRow>
    </WalletCardStyled>
  );
};

export const Wallet: WalletCardComponent = (props) => {
  const { active } = useWeb3();
  return active ? (
    <WalletComponent {...props} />
  ) : (
    <WalletFallback {...props} />
  );
};
