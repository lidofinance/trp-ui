import { FC } from 'react';
import { Layout } from 'features/layout';
import { Container, PageTitle, H1 } from 'shared/ui';
import { Snapshot } from 'features/snapshot';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';
import { getProps } from 'shared/api/get-props';

const SnapshotPage: FC = () => {
  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H1>Delegate on Snapshot</H1>
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

export const getServerSideProps = getProps();
