import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import { AragonForm } from 'features/aragon';

const Aragon: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Vote on Aragon</MainSubtitle>
      <Wallet />
      <AragonForm />
    </Layout>
  );
};

export default Aragon;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
