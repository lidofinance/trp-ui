import { useWeb3 } from 'reef-knot/web3-react';

import { InlineLoader } from '@lidofinance/lido-ui';
import { WALLET_MODAL, useModal } from '@lidofinance/eth-ui-wallet-modal';

import { useAccountVestings } from 'features/vesting';
import { AddressBadge, Main } from 'shared/ui';

import { AddressBadgeWrapper, AragonWalletStyle } from './aragonWalletStyles';

export const AragonWallet = () => {
  const { data: vestings } = useAccountVestings();
  const { account } = useWeb3();
  const { openModal } = useModal(WALLET_MODAL.wallet);

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
