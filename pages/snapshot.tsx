import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { Snapshot } from 'features/snapshot';
import { H3 } from '@lidofinance/lido-ui';

const SnapshotPage: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>
          <H3>Snapshot Voting Power Delegation</H3>
        </PageTitle>
        <Snapshot />
      </Container>
    </Layout>
  );
};

export default SnapshotPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
