import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import { SnapshotForm } from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Vote on Snapshot</MainSubtitle>
      <Wallet />
      <SnapshotForm />
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
