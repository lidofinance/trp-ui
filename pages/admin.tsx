import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle, LayoutSubTitle } from '@lidofinance/next-widget-app';

import { AdminForm } from 'features/admin';
import { useIsAdmin } from 'features/vesting';

const AdminPage: FC = () => {
  const router = useRouter();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/');
    }
  }, [isAdmin, router]);

  return (
    <>
      {/*TODO: <Main size="container">*/}
      <LayoutTitle>Lido Token Rewards Plan</LayoutTitle>
      <LayoutSubTitle>Admin dashboard</LayoutSubTitle>

      <Section>
        <AdminForm />
      </Section>
      {/*</Main>*/}
    </>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
