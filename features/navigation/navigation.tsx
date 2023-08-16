import { FC } from 'react';
import {
  NavigationAdaptive,
  NavigationLink,
} from '@lidofinance/next-widget-layout';

import { useIsAdmin } from 'features/vesting';

import AdminIcon from 'features/header/icons/admin.svg';
import AragonIcon from 'features/header/icons/aragon.svg';
import ClaimIcon from 'features/header/icons/claim.svg';
import SnapshotIcon from 'features/header/icons/snapshot.svg';

export const Navigation: FC = () => {
  const isAdmin = useIsAdmin();

  return (
    <NavigationAdaptive>
      <NavigationLink title="Claim" href={'/'} icon={<ClaimIcon />} />
      <NavigationLink
        title="Snapshot"
        href={'/snapshot'}
        icon={<SnapshotIcon />}
      />
      <NavigationLink title="Aragon" href={'aragon'} icon={<AragonIcon />} />

      {isAdmin && (
        <NavigationLink title="Admin" href={'admin'} icon={<AdminIcon />} />
      )}
    </NavigationAdaptive>
  );
};
