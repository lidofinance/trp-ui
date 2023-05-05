import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageSubtitle, PageTitle } from 'shared/ui';
import { Wallet } from 'features/claim';
import { SnapshotForm } from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Lido Token Rewards Plan</PageTitle>
        <PageSubtitle>Vote on Snapshot</PageSubtitle>
        <Wallet />
        <SnapshotForm />
      </Container>
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
