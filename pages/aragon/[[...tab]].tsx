import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle, H1 } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

type AragonTab = 'vote' | 'delegation';

type AragonPageProps = {
  tab: AragonTab;
};

type AragonPageParams = {
  tab?: string[];
};

const AragonPage: FC<AragonPageProps> = ({ tab }) => {
  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H1>Aragon</H1>
          </PageTitle>
          <NoSSRWrapper>
            <Aragon tab={tab} />
          </NoSSRWrapper>
        </Container>
      </Layout>
    </VestingsProvider>
  );
};

export default AragonPage;

// we need [[...]] pattern for / and /delegation; anything else is a real 404
export const getStaticPaths: GetStaticPaths<AragonPageParams> = () => ({
  paths: [{ params: { tab: [] } }, { params: { tab: ['delegation'] } }],
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  AragonPageProps,
  AragonPageParams
> = ({ params }) => ({
  props: { tab: params?.tab?.[0] === 'delegation' ? 'delegation' : 'vote' },
});
