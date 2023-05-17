import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle, LayoutSubTitle } from '@lidofinance/next-widget-app';

import { Wallet } from 'features/wallet';
import { AragonForm } from 'features/aragon';

const Aragon: FC = () => {
  return (
    <>
      <LayoutTitle>Lido Token Rewards Plan</LayoutTitle>
      <LayoutSubTitle>Vote on Aragon</LayoutSubTitle>

      <Section>
        <Wallet />
        <AragonForm />
      </Section>
    </>
  );
};

export default Aragon;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
