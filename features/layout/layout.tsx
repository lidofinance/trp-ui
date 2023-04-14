import { FC, PropsWithChildren } from 'react';
import { Header } from 'features/header';
import { Main, Footer } from 'shared/ui';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
