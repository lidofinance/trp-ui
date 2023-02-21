import { FC, useEffect } from 'react';

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

  return (
    <WalletCardBalance
      title="Unclaimed"
      loading={unclaimed.initialLoading}
      value={<FormatToken amount={unclaimed.data} symbol={token || ''} />}
    />
  );
};
