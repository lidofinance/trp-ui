import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Block } from '@lidofinance/lido-ui';
import { Layout } from 'widgets/layout';
import {
  VestingsProvider,
  ClaimingProvider,
  Wallet,
  ClaimForm,
} from 'widgets/claim';

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
        </VestingsProvider>
      </ClaimingProvider>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {},
});
