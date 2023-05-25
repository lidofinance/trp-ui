import { Main, useWalletError } from 'shared/ui';
import { SnapshotWallet } from './snapshotWallet';
import { SnapshotForm } from './snapshotForm';
import { VestingCarousel } from './vestingsCarousel';
import { InlineLoader } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot/web3-react';
import { useAccountVestings } from 'features/vesting';
import { SnapshotFormDisconnected } from './snapshotFormDisconnected';
import { SnapshotFormError } from './snapshotFormError';

export const Snapshot = () => {
  const { active } = useWeb3();
  const { data: vestings, isLoading } = useAccountVestings();
  const walletError = useWalletError();

  if (isLoading) {
    return <InlineLoader style={{ height: '50px' }} />;
  }

  if (walletError != null) {
    return (
      <Main>
        <Main.ErrorWallet>{walletError}</Main.ErrorWallet>
        <SnapshotFormError />
      </Main>
    );
  }

  if (!active) {
    return (
      <Main>
        <SnapshotFormDisconnected />
      </Main>
    );
  }

  if (vestings?.length === 0) {
    return (
      <Main>
        <Main.ErrorWallet>You don&apos;t have active programs</Main.ErrorWallet>
        <SnapshotFormError text="No program" />
      </Main>
    );
  }

  return (
    <Main>
      <SnapshotWallet />

      <Main.Card>
        <VestingCarousel />
        <SnapshotForm />
      </Main.Card>
    </Main>
  );
};
