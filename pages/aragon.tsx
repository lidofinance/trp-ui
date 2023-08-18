import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';
import { H3 } from '@lidofinance/lido-ui';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

const AragonPage: FC = () => {
  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H3>Aragon Vote</H3>
          </PageTitle>
          <NoSSRWrapper>
            <Aragon />
          </NoSSRWrapper>
        </Container>
      </Layout>
    </VestingsProvider>
  );
};

export default AragonPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
