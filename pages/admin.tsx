import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { MainSubtitle, MainTitle } from 'shared/ui';
import { AdminForm } from 'features/admin';

const AdminPage: FC = () => {
  return (
    <Layout>
      <MainTitle>Lido Token Rewards Plan</MainTitle>
      <MainSubtitle>Admin dashboard</MainSubtitle>
      <AdminForm />
    </Layout>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
