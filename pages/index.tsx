import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Claim } from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Container, PageSubtitle, PageTitle } from 'shared/ui';

const Home: FC = () => {
  return (
    <Layout>
      <Container>
        <PageTitle>Lido Token Rewards Plan</PageTitle>
        <PageSubtitle>Claim your tokens</PageSubtitle>
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
