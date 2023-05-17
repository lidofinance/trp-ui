import { FC } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import { ProviderWeb3 } from '@reef-knot/web3-react';
import { ProviderWalletModal } from '@lidofinance/eth-ui-wallet-modal';
import { WidgetApp, NavigationLinkProps } from '@lidofinance/next-widget-app';

import { backendRPC, dynamics } from 'config';
import { ClaimingProvider } from 'features/claim';
// TODO import { useIsAdmin, VestingsProvider } from 'features/vesting';
import { VestingsProvider } from 'features/vesting';
import ClaimIcon from 'features/header/icons/claim.svg';
import SnapshotIcon from 'features/header/icons/snapshot.svg';
import AragonIcon from 'features/header/icons/aragon.svg';
import AdminIcon from 'features/header/icons/admin.svg';
import { HeaderActions } from 'features/header/headerActions';
import { withCsp } from 'shared/api/withCsp';

const AppWrapper: FC<AppProps> = ({ ...props }) => {
  // const isAdmin = useIsAdmin();
  const isAdmin = false;

  // Header pages
  const headerNavigation: NavigationLinkProps[] = [
    {
      title: 'Claim',
      href: '/',
      icon: <ClaimIcon />,
    },
    {
      title: 'Snapshot',
      href: '/snapshot',
      icon: <SnapshotIcon />,
    },
    {
      title: 'Aragon',
      href: '/aragon',
      icon: <AragonIcon />,
    },
  ];

  if (isAdmin) {
    headerNavigation.push({
      title: 'Admin',
      href: '/admin',
      icon: <AdminIcon />,
    });
  }

  return (
    // @ts-expect-error need to patch web3-react
    <ProviderWeb3
      defaultChainId={dynamics.defaultChain}
      supportedChainIds={dynamics.supportedChains}
      rpc={backendRPC}
    >
      {/* @ts-expect-error need to patch ProviderWalletModal */}
      <ProviderWalletModal walletsMetrics={[]} hiddenWallets={['Opera Wallet']}>
        <WidgetApp
          navigation={headerNavigation}
          headerActions={<HeaderActions />}
        >
          <ClaimingProvider>
            <VestingsProvider>
              <NextApp {...props} />
            </VestingsProvider>
          </ClaimingProvider>
        </WidgetApp>
      </ProviderWalletModal>
    </ProviderWeb3>
  );
};

// TODO
// @ts-expect-error ???
AppWrapper.getInitialProps = async (appContext: AppContext) => {
  return await NextApp.getInitialProps(appContext);
};

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
