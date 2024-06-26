import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle, H1 } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

const AragonPage: FC<{ tab: string }> = ({ tab }) => {
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

type WrapModePageProps = {
  tab: 'vote' | 'delegation';
};

type WrapModePageParams = {
  tab: ['delegation'] | undefined;
};

export const getStaticPaths: GetStaticPaths<WrapModePageParams> = async () => {
  return {
    paths: [
      { params: { tab: undefined } },
      { params: { tab: ['delegation'] } },
    ],
    fallback: false, // return 404 on non match
  };
};

// we need [[...]] pattern for / and /delegation
export const getStaticProps: GetStaticProps<
  WrapModePageProps,
  WrapModePageParams
> = async ({ params }) => {
  const tab = params?.tab;
  if (!tab) return { props: { tab: 'vote' } };
  if (tab[0] === 'delegation') return { props: { tab: 'delegation' } };

  return { notFound: true };
};
