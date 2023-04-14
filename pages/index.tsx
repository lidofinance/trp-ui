import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Block } from '@lidofinance/lido-ui';
import { Layout } from 'features/layout';
import {
  VestingsProvider,
  ClaimingProvider,
  Wallet,
  ClaimForm,
} from 'features/claim';
import { Section } from 'shared/ui/section';
import { FAQ } from 'features/faq';
import { MainSubtitle, MainTitle } from 'shared/ui';

const Home: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Claim your tokens</MainSubtitle>
      <ClaimingProvider>
        <VestingsProvider>
          <Wallet />
          <Block>
            <ClaimForm />
          </Block>
          <Section title="FAQ">
            <FAQ />
          </Section>
        </VestingsProvider>
      </ClaimingProvider>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
