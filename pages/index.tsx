import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Block } from '@lidofinance/lido-ui';
import { Layout } from 'components/layout';
import {
  VestingsProvider,
  ClaimingProvider,
  Wallet,
  ClaimForm,
} from 'features/claim';
import { Section } from 'components/section';
import { FAQ } from 'features/faq';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <Layout title="Lido Token Rewards Plan" subtitle="Claim your tokens">
      <Head>
        <title>TRP UI | Lido</title>
      </Head>
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {},
});
