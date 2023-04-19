import { FC, PropsWithChildren } from 'react';
import { Header } from 'features/header';
import { Main, Footer } from 'shared/ui';
import { LayoutStyle } from './layoutStyles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutStyle>
  );
};
