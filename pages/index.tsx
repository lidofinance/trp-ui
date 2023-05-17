import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section, Block } from '@lidofinance/lido-ui';
import { LayoutTitle, LayoutSubTitle } from '@lidofinance/next-widget-app';

import { ClaimForm } from 'features/claim';
import { FAQ } from 'features/faq';
import { Wallet } from 'features/wallet';

const Home: FC = () => {
  return (
    <>
      <LayoutTitle>Lido Token Rewards Plan</LayoutTitle>
      <LayoutSubTitle>Claim your tokens</LayoutSubTitle>

      <Section>
        <Wallet />

        <Block>
          <ClaimForm />
        </Block>
      </Section>

      <Section title="FAQ">
        <FAQ />
      </Section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
