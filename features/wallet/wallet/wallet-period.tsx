import { FC } from 'react';
import { WalletCardBalance } from 'features/wallet';
import { FormatDate } from 'shared/ui';
import { useVestingPeriod } from 'features/vesting';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletPeriod: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { startInTime, endInTime, isLoading } =
    useVestingPeriod(vestingAddress);

  const value = (
    <>
      <FormatDate timeStamp={startInTime} month="short" />
      {' - '}
      <FormatDate timeStamp={endInTime} month="short" />
    </>
  );

  return (
    <WalletCardBalance small title="Period" loading={isLoading} value={value} />
  );
};
