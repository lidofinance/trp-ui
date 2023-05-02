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
import { useIsAdmin } from 'features/vesting';
import AdminIcon from './icons/admin.svg';
import AragonIcon from './icons/aragon.svg';
import ClaimIcon from './icons/claim.svg';
import SnapshotIcon from './icons/snapshot.svg';

type Route = {
  name: string;
  path: string;
  icon: ReactNode;
  priveledgedPath: boolean;
};

const routes: Route[] = [
  {
    name: 'Claim',
    path: '/',
    icon: <ClaimIcon />,
    priveledgedPath: false,
  },
  {
    name: 'Snapshot',
    path: '/snapshot',
    icon: <SnapshotIcon />,
    priveledgedPath: false,
  },
  {
    name: 'Aragon',
    path: '/aragon',
    icon: <AragonIcon />,
    priveledgedPath: false,
  },
  {
    name: 'Admin',
    path: '/admin',
    icon: <AdminIcon />,
    priveledgedPath: true,
  },
];

export const Header: FC = () => {
  const router = useRouter();
  const isAdmin = useIsAdmin();

  return (
    <HeaderStyle size="full" forwardedAs="header">
      <HeaderLogoStyle>
        <Link href="/">
          <LidoLogo />
        </Link>
      </HeaderLogoStyle>

      <Nav>
        {routes.map(
          ({ name, path, icon, priveledgedPath }) =>
            (priveledgedPath === false || isAdmin === true) && (
              <NavLink
                key={path}
                href={path}
                $active={router.pathname === path}
              >
                {icon}
                <span>{name}</span>
              </NavLink>
            ),
        )}
      </Nav>

      <HeaderActionsStyle>
        <HeaderWallet />
      </HeaderActionsStyle>
    </HeaderStyle>
  );
};
