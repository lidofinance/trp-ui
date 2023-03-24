import { Divider } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import { WalletCardRow, WalletCardComponent } from 'widgets/walletCard';
import FallbackWallet from 'widgets/fallbackWallet';
import { useVestingsContext } from '../providers';
import { WalletLocked } from './wallet-locked';
import { WalletUnclaimed } from './wallet-unclaimed';
import { WalletPeriod } from './wallet-period';
import { WalletCardStyled } from './wallet.style';
import { WalletVesting } from './wallet-vesting';

const WalletComponent: WalletCardComponent = (props) => {
  const { currentVesting } = useVestingsContext();

  if (!currentVesting) return null;

  return (
    <WalletCardStyled {...props}>
      <WalletCardRow>
        {currentVesting && <WalletLocked vestingAddress={currentVesting} />}
        {currentVesting && <WalletVesting vestingAddress={currentVesting} />}
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
