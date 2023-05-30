import { InlineLoader } from '@lidofinance/lido-ui';
import { useAccountVestings } from 'features/vesting';
import { MODAL, useModal } from 'features/walletModal';
import { useWeb3 } from 'reef-knot/web3-react';
import { AddressBadge, Main } from 'shared/ui';
import { AddressBadgeWrapper, AragonWalletStyle } from './aragonWalletStyles';

export const AragonWallet = () => {
  const { data: vestings } = useAccountVestings();
  const { account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);

  return (
    <AragonWalletStyle>
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
    </AragonWalletStyle>
  );
};
