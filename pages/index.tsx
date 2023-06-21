import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Claim } from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Container, PageTitle } from 'shared/ui';
import { H3 } from '@lidofinance/lido-ui';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

const Home: FC = () => {
  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H3 style={{ marginBottom: '4px' }}>Lido Token Rewards Plan</H3>
            Claim your tokens
          </PageTitle>
          <NoSSRWrapper>
            <Claim />
          </NoSSRWrapper>
          <Section title="FAQ">
            <FAQ />
          </Section>
        </Container>
      </Layout>
    </VestingsProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
