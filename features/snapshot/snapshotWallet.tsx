import { useWeb3 } from 'reef-knot/web3-react';

import { InlineLoader } from '@lidofinance/lido-ui';
import { WALLET_MODAL, useModal } from '@lidofinance/eth-ui-wallet-modal';

import { useAccountVestings } from 'features/vesting';
import { AddressBadge, Main } from 'shared/ui';
import {
  AddressBadgeWrapper,
  SnapshotWalletStyle,
} from './snapshotWalletStyles';

export const SnapshotWallet = () => {
  const vestingsSWR = useAccountVestings();
  const { account } = useWeb3();
  const { openModal } = useModal(WALLET_MODAL.wallet);

  return (
    <SnapshotWalletStyle>
      <Main.Row style={{ alignItems: 'center' }}>
        {vestingsSWR.isLoading ? (
          <InlineLoader />
        ) : (
          <div>You have {vestingsSWR.data?.length} active programs</div>
        )}

        <AddressBadgeWrapper>
          <AddressBadge address={account} onClick={openModal} color="accent" />
        </AddressBadgeWrapper>
      </Main.Row>
    </SnapshotWalletStyle>
  );
};
