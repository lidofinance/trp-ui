import { FC } from 'react';

import { useWalletError } from 'shared/ui';
import { useAccountVestings } from 'features/vesting';
import { useWeb3 } from 'reef-knot/web3-react';
import { AragonVote } from './vote/aragonVote';
import { AragonDelegate } from './delegate/aragonDelegate';
import { Switch } from '../../shared/ui/switch';
import { CHAINS } from '@lido-sdk/constants';

const NAV_ROUTES = [
  { name: 'Vote', path: '/aragon' },
  { name: 'Delegation', path: '/aragon/delegation' },
];

export const Aragon: FC<{ tab: string }> = ({ tab }) => {
  const isDelegation = tab === 'delegation';
  const { active, chainId } = useWeb3();
  const { data: vestings, isLoading } = useAccountVestings();
  const walletError = useWalletError();
  return (
    <div>
      {chainId !== CHAINS.Mainnet && (
        <Switch checked={isDelegation} routes={NAV_ROUTES} />
      )}
      {!isDelegation && (
        <AragonVote
          active={active}
          vestings={vestings}
          isLoading={isLoading}
          walletError={walletError}
        />
      )}
      {isDelegation && (
        <AragonDelegate
          active={active}
          vestings={vestings}
          isLoading={isLoading}
          walletError={walletError}
        />
      )}
    </div>
  );
};
