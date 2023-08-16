import { FC } from 'react';
import { GetStaticProps } from 'next';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle } from '@lidofinance/next-widget-layout';

import { Aragon } from 'features/aragon/aragon';
import { VestingsProvider } from 'features/vesting';

const AragonPage: FC = () => {
  return (
    <VestingsProvider>
      <LayoutTitle>Aragon Vote</LayoutTitle>

      <Section>
        <Aragon />
      </Section>
    </VestingsProvider>
  );
};

export default AragonPage;

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});
