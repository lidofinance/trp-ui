import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle } from '@lidofinance/next-widget-layout';

import { Snapshot } from 'features/snapshot';
import { VestingsProvider } from 'features/vesting';

const SnapshotPage: FC = () => {
  return (
    <VestingsProvider>
      <LayoutTitle>Snapshot Voting Power Delegation</LayoutTitle>

      <Section>
        <Snapshot />
      </Section>
    </VestingsProvider>
  );
};

export default SnapshotPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
