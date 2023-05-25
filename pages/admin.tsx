import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle } from 'shared/ui';
import { AdminForm } from 'features/admin';
import { useIsAdmin } from 'features/vesting';
import { useRouter } from 'next/router';
import { H3 } from '@lidofinance/lido-ui';

const AdminPage: FC = () => {
  const router = useRouter();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/');
    }
  }, [isAdmin, router]);

  return (
    <Layout>
      <Container size="container">
        <PageTitle>
          <H3>Admin dashboard</H3>
        </PageTitle>
        <AdminForm />
      </Container>
    </Layout>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
