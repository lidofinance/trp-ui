import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Claim } from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Container, PageTitle } from 'shared/ui';
import { H3 } from '@lidofinance/lido-ui';

const Home: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>
          <H3 style={{ marginBottom: '4px' }}>Lido Token Rewards Plan</H3>
          Claim your tokens
        </PageTitle>
        <Claim />
        <Section title="FAQ">
          <FAQ />
        </Section>
      </Container>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
