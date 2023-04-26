import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Main, MainSubtitle, MainTitle } from 'shared/ui';
import { AdminForm } from 'features/admin';
import { useIsAdmin } from 'features/vesting';
import { useRouter } from 'next/router';

const AdminPage: FC = () => {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  if (isAdmin === false) {
    router.push('/');
    return null;
  }
  return (
    <Layout>
      <Main size="container">
        <MainTitle>Lido Token Rewards Plan</MainTitle>
        <MainSubtitle>Admin dashboard</MainSubtitle>
        <AdminForm />
      </Main>
    </Layout>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
