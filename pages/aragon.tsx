import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Main, MainSubtitle, MainTitle } from 'shared/ui';
import { Wallet } from 'features/wallet';
import { AragonForm } from 'features/aragon';

const Aragon: FC = () => {
  return (
    <Layout>
      <Main>
        <MainTitle>Lido Token Rewards Plan</MainTitle>
        <MainSubtitle>Vote on Aragon</MainSubtitle>
        <Wallet />
        <AragonForm />
      </Main>
    </Layout>
  );
};

export default Aragon;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
