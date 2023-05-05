import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Container, PageSubtitle, PageTitle } from 'shared/ui';
import { AdminForm } from 'features/admin';
import { useIsAdmin } from 'features/vesting';
import { useRouter } from 'next/router';

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
        <PageTitle>Lido Token Rewards Plan</PageTitle>
        <PageSubtitle>Admin dashboard</PageSubtitle>
        <AdminForm />
      </Container>
    </Layout>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
