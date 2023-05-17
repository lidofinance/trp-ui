import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle, LayoutSubTitle } from '@lidofinance/next-widget-app';

import { Wallet } from 'features/wallet';
import { SnapshotForm } from 'features/snapshot';

const Snapshot: FC = () => {
  return (
    <>
      <LayoutTitle>Lido Token Rewards Plan</LayoutTitle>
      <LayoutSubTitle>Vote on Snapshot</LayoutSubTitle>

      <Section>
        <Wallet />
        <SnapshotForm />
      </Section>
    </>
  );
};

export default Snapshot;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
