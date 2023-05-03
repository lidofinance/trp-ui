import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Claim } from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { Main, MainSubtitle, MainTitle } from 'shared/ui';

const Home: FC = () => {
  return (
    <Layout>
      <Main>
        <MainTitle>Lido Token Rewards Plan</MainTitle>
        <MainSubtitle>Claim your tokens</MainSubtitle>
        <Claim />
        <Section title="FAQ">
          <FAQ />
        </Section>
      </Main>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
