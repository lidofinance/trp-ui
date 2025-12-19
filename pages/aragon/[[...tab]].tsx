import { FC } from 'react';
import { GetServerSideProps } from 'next';
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

type TabsLayoutProps = {
  tab: 'vote' | 'delegation';
};

type TabsPageParams = {
  tab: string[] | undefined;
};

// we need [[...]] pattern for / and /delegation
export const getServerSideProps: GetServerSideProps<
  TabsLayoutProps,
  TabsPageParams
  // eslint-disable-next-line @typescript-eslint/require-await
> = async ({ params }) => {
  const tab = params?.tab;
  if (!tab) return { props: { tab: 'vote' } };
  if (tab.length > 1) return { notFound: true };
  if (tab[0] === 'delegation') return { props: { tab: 'delegation' } };

  return { notFound: true };
};
