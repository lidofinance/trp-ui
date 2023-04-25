import { FC } from 'react';
import { GetStaticProps } from 'next';
import { Layout } from 'features/layout';
import { Main, MainSubtitle, MainTitle } from 'shared/ui';
import { AdminForm } from 'features/admin';

const AdminPage: FC = () => {
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
