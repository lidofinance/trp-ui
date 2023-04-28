import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { LidoLogo } from '@lidofinance/lido-ui';
import {
  HeaderStyle,
  HeaderLogoStyle,
  HeaderActionsStyle,
  Nav,
  NavLink,
} from './headerStyles';
import { HeaderWallet } from './headerWallet';
import { useRouter } from 'next/router';

type Route = {
  name: string;
  path: string;
  icon: ReactNode;
};

const routes: Route[] = [
  {
    name: 'Claim',
    path: '/',
    icon: null,
  },
  {
    name: 'Snapshot',
    path: '/snapshot',
    icon: null,
  },
  {
    name: 'Aragon',
    path: '/aragon',
    icon: null,
  },
];

export const Header: FC = () => {
  const router = useRouter();

  return (
    <HeaderStyle size="full" forwardedAs="header">
      <HeaderLogoStyle>
        <Link href="/">
          <LidoLogo />
        </Link>
      </HeaderLogoStyle>

      <Nav>
        {routes.map(({ name, path, icon }) => (
          <NavLink key={path} href={path} $active={router.pathname === path}>
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </Nav>

      <HeaderActionsStyle>
        <HeaderWallet />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};
