import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageSubtitle, PageTitle } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';

const AragonPage: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Lido Token Rewards Plan</PageTitle>
        <PageSubtitle>Vote on Aragon</PageSubtitle>

        <Aragon />
      </Container>
    </Layout>
  );
};

export default AragonPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
