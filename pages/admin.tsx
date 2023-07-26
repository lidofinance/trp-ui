import { FC, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Section } from '@lidofinance/lido-ui';
import { LayoutTitle } from '@lidofinance/next-widget-layout';

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
      <LayoutTitle>Admin dashboard</LayoutTitle>

      <Section>
        <AdminForm />
      </Section>
    </>
  );
};

export default AdminPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});
