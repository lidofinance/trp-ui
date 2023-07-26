import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle, LayoutSubTitle } from '@lidofinance/next-widget-layout';

import { FAQ } from 'features/faq';
import { Claim } from 'features/claim';
import { VestingsProvider } from 'features/vesting';

const Home: FC = () => {
  return (
    <VestingsProvider>
      <LayoutTitle>Lido Token Rewards Plan</LayoutTitle>
      <LayoutSubTitle>Claim your tokens</LayoutSubTitle>

      <Section>
        <Claim />
      </Section>

      <Section title="FAQ">
        <FAQ />
      </Section>
    </VestingsProvider>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
