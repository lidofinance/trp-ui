import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { ClaimingProvider, VestingsProvider } from 'features/claim';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { Block } from '@lidofinance/lido-ui';

const Snapshot: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Vote on Snapshot</MainSubtitle>
      <ClaimingProvider>
        <VestingsProvider>
          <Block>Snapshot</Block>
        </VestingsProvider>
      </ClaimingProvider>
    </Layout>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
