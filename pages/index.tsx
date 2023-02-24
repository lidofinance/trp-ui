import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Block } from '@lidofinance/lido-ui';

import VestingsProvider from 'features/home/providers/vestings-provider';
import Layout from 'components/layout';

import { Wallet, ClaimForm } from 'features/home';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <Layout
      title="Lido Token Reward Propgram"
      subtitle="Claim your vested tokens"
    >
      <Head>
        <title>Lido | Frontend Template</title>
      </Head>
      <VestingsProvider>
        <Wallet />
        <Block>
          <ClaimForm />
        </Block>
      </VestingsProvider>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {},
});
