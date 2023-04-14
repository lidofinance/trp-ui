import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { ClaimingProvider } from 'features/claim';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import { VestingsProvider } from 'features/vesting';
import { SnapshotForm } from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Vote on Snapshot</MainSubtitle>
      <ClaimingProvider>
        <VestingsProvider>
          <Wallet />
          <SnapshotForm />
        </VestingsProvider>
      </ClaimingProvider>
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
