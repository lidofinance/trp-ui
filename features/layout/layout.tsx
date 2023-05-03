import { FC, PropsWithChildren } from 'react';
import { Header } from 'features/header';
import { Footer } from 'shared/ui';
import { LayoutStyle } from './layoutStyles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <Header />
      {children}
      <Footer />
    </LayoutStyle>
  );
};
