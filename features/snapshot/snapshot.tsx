import { Main } from 'shared/ui';
import { SnapshotWallet } from './snapshotWallet';
import { SnapshotForm } from './snapshotForm';
import { VestingCarousel } from './vestingsCarousel';

export const Snapshot = () => {
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
