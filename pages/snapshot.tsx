import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { Snapshot } from 'features/snapshot';

const SnapshotPage: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Snapshot Voting Power Delegation</PageTitle>
        <Snapshot />
      </Container>
    </Layout>
  );
};

export default SnapshotPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
