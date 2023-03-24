import { Divider } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import { WalletCardRow, WalletCardComponent } from 'widgets/walletCard';
import FallbackWallet from 'widgets/fallbackWallet';
import { useVestingsContext } from '../providers';
import { WalletLocked } from './walletLocked';
import { WalletUnclaimed } from './walletUnclaimed';
import { WalletPeriod } from './walletPeriod';
import { WalletVesting } from './walletVesting';
import styled from 'styled-components';
import { WalletCard } from 'widgets/walletCard';

export const WalletCardStyled = styled(WalletCard)`
  background: linear-gradient(52.01deg, #1b3349 0%, #01a2ff 100%);
`;

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
