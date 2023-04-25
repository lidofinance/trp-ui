import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Main, MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import { SnapshotForm } from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <Layout>
      <Main>
        <MainTitle>Lido Token Rewards Plan</MainTitle>
        <MainSubtitle>Vote on Snapshot</MainSubtitle>
        <Wallet />
        <SnapshotForm />
      </Main>
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
