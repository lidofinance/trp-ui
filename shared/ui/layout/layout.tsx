import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Header } from 'shared/ui/header';
import { Main } from 'shared/ui/main';
import { Footer } from 'shared/ui/footer';
import { LayoutTitleStyle, LayoutSubTitleStyle } from './layoutStyles';
import { LayoutProps } from './types';

export const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const { title, subtitle } = props;
  const { children } = props;

  return (
    <>
      <Head>
        <meta name="description" content="Lido Token Rewards Plan" />
      </Head>
      <Header />
      <Main>
        <LayoutTitleStyle>{title}</LayoutTitleStyle>
        <LayoutSubTitleStyle>{subtitle}</LayoutSubTitleStyle>
        {children}
      </Main>
      <Footer />
    </>
  );
};
