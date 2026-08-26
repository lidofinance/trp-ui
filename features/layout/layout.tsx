import { FC, PropsWithChildren } from 'react';
import { Header } from 'features/header';
import { Footer } from 'shared/ui';
import { TestEnvBanner } from 'shared/ui/testEnvBanner';
import { NoSSRWrapper } from 'shared/ui/noSSRWrapper';
import { LayoutStyle } from './layoutStyles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <NoSSRWrapper>
        <TestEnvBanner />
      </NoSSRWrapper>
      <Header />
      {children}
      <Footer />
    </LayoutStyle>
  );
};
