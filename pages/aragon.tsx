import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';
import { H3 } from '@lidofinance/lido-ui';

const AragonPage: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>
          <H3>Aragon Vote</H3>
        </PageTitle>
        <Aragon />
      </Container>
    </Layout>
  );
};

export default AragonPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
