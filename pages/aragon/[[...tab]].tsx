import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'features/layout';
import { Container, PageTitle, H1 } from 'shared/ui';
import { Aragon } from 'features/aragon/aragon';
import { VestingsProvider } from 'features/vesting';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

// we need [[...]] pattern for / and /delegation
const parseTab = (
  tabSegments: string | string[] | undefined,
): 'vote' | 'delegation' | null => {
  // a plain string is ?tab= from the query string, not a path segment — ignore
  if (!tabSegments || typeof tabSegments === 'string') {
    return 'vote';
  }
  if (tabSegments.length === 1 && tabSegments[0] === 'delegation') {
    return 'delegation';
  }
  return null;
};

const AragonPage: FC = () => {
  const { query, isReady, replace } = useRouter();
  const tab = parseTab(query.tab);

  useEffect(() => {
    if (isReady && tab === null) {
      void replace('/404');
    }
  }, [isReady, tab, replace]);

  return (
    <VestingsProvider>
      <Layout>
        <Container>
          <PageTitle>
            <H1>Aragon</H1>
          </PageTitle>
          <NoSSRWrapper>
            {isReady && tab !== null ? <Aragon tab={tab} /> : null}
          </NoSSRWrapper>
        </Container>
      </Layout>
    </VestingsProvider>
  );
};

export default AragonPage;
