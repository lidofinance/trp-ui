import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';

import FormatToken from 'components/formatToken';
import { WalletCardBalance } from 'components/walletCard';
import { useVestingLocked, useVestingToken } from 'hooks';
import { useClaimingContext } from '../providers';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletLocked: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { isClaiming } = useClaimingContext();
  const locked = useVestingLocked(vestingAddress);
  const token = useVestingToken(vestingAddress);

  useEffect(() => {
    if (!isClaiming) locked.update();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClaiming]);

  const lockedTitle = (
    <>
      Locked{' '}
      {
        <Tooltip
          placement="bottom"
          title="Amount of the tokens currently locked in the escrow and not yet available for claim"
        >
          <Question />
        </Tooltip>
      }
    </>
  );

  return (
    <WalletCardBalance
      title={lockedTitle}
      loading={locked.initialLoading}
      value={<FormatToken amount={locked.data} symbol={token || ''} />}
    />
  );
};
