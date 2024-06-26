import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageTitle, H1 } from 'shared/ui';
import { AdminForm } from 'features/admin';
import { useIsAdmin } from 'features/vesting';
import { useRouter } from 'next/router';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';

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
          <H1>Admin dashboard</H1>
        </PageTitle>
        <NoSSRWrapper>
          <AdminForm />
        </NoSSRWrapper>
      </Container>
    </Layout>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
