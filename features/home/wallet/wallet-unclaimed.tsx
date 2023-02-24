import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';

import { useVestingsContext } from 'features/home/hooks';
import FormatToken from 'components/formatToken';
import { WalletCardBalance } from 'components/walletCard';
import { useVestingUnclaimed, useVestingToken } from 'hooks';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletUnclaimed: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { isClaiming } = useVestingsContext();
  const unclaimed = useVestingUnclaimed(vestingAddress);
  const token = useVestingToken(vestingAddress);

  useEffect(() => {
    if (!isClaiming) unclaimed.update();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClaiming]);

  const unclaimedTitle = (
    <>
      Unclaimed{' '}
      {
        <Tooltip
          placement="bottom"
          title="Amount of the tokens on the escrow balance available for claim at the moment"
        >
          <Question />
        </Tooltip>
      }
    </>
  );

  return (
    <WalletCardBalance
      title={unclaimedTitle}
      loading={unclaimed.initialLoading}
      value={<FormatToken amount={unclaimed.data} symbol={token || ''} />}
    />
  );
};
