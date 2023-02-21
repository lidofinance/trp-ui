import { FC, useEffect } from 'react';

import { useVestingsContext } from 'features/home/hooks';
import FormatToken from 'components/formatToken';
import { WalletCardBalance } from 'components/walletCard';
import { useVestingLocked, useVestingToken } from 'hooks';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletLocked: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { isClaiming } = useVestingsContext();
  const locked = useVestingLocked(vestingAddress);
  const token = useVestingToken(vestingAddress);

  useEffect(() => {
    if (!isClaiming) locked.update();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClaiming]);

  return (
    <WalletCardBalance
      title="Locked"
      loading={locked.initialLoading}
      value={<FormatToken amount={locked.data} symbol={token || ''} />}
    />
  );
};
