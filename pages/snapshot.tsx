import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageSubtitle, PageTitle } from 'shared/ui';
import { Snapshot } from 'features/snapshot';

const SnapshotPage: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Lido Token Rewards Plan</PageTitle>
        <PageSubtitle>Vote on Snapshot</PageSubtitle>
        <Snapshot />
      </Container>
    </Layout>
  );
};

export default SnapshotPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
