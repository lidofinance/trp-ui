import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { Snapshot } from 'features/snapshot';
import { H3 } from '@lidofinance/lido-ui';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

const SnapshotPage: FC = () => {
  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H3>Snapshot Voting Power Delegation</H3>
          </PageTitle>
          <NoSSRWrapper>
            <Snapshot />
          </NoSSRWrapper>
        </Container>
      </Layout>
    </VestingsProvider>
  );
};

export default SnapshotPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
