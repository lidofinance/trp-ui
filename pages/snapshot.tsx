import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from 'shared/ui/layout';
import { VestingsProvider } from 'features/claim';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <Layout title="Lido Token Rewards Plan" subtitle="Vote on Snapshot">
      <Head>
        <title>TRP UI | Lido</title>
      </Head>
      <VestingsProvider>Snapshot</VestingsProvider>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {},
});
