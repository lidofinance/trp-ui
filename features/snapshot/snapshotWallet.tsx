import { InlineLoader } from '@lidofinance/lido-ui';
import { useAccountVestings } from 'features/vesting';
import { MODAL, useModal } from 'features/walletModal';
import { useWeb3 } from 'reef-knot';
import { AddressBadge, Main } from 'shared/ui';
import {
  AddressBadgeWrapper,
  SnapshotWalletStyle,
} from './snapshotWalletStyles';

export const SnapshotWallet = () => {
  const vestingsSWR = useAccountVestings();
  const { account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);

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
