import { InlineLoader } from '@lidofinance/lido-ui';
import { useVestingsContext } from 'features/vesting';
import { MODAL, useModal } from 'features/walletModal';
import { useWeb3 } from 'reef-knot';
import { AddressBadge, Main } from 'shared/ui';
import { AddressBadgeWrapper } from './aragonWalletStyles';

export const AragonWallet = () => {
  const { vestings } = useVestingsContext();
  const { account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);

  return (
    <Main.Wallet>
      <Main.Row style={{ alignItems: 'center' }}>
        {vestings == null ? (
          <InlineLoader />
        ) : (
          <div>You have {vestings.length} active programs</div>
        )}

        <AddressBadgeWrapper>
          <AddressBadge address={account} onClick={openModal} color="accent" />
        </AddressBadgeWrapper>
      </Main.Row>
    </Main.Wallet>
  );
};
