import { FC } from 'react';
import { WalletCardBalance } from 'features/wallet';
import { FormatDate } from 'shared/ui';
import { useVestingEndTime, useVestingStartTime } from 'features/vesting';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletPeriod: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const startTime = useVestingStartTime(vestingAddress);
  const endTime = useVestingEndTime(vestingAddress);

  const isLoading = startTime.initialLoading || endTime.initialLoading;

  const value = (
    <>
      <FormatDate timeStamp={startTime.data} month="short" />
      {' - '}
      <FormatDate timeStamp={endTime.data} month="short" />
    </>
  );

  return (
    <WalletCardBalance small title="Period" loading={isLoading} value={value} />
  );
};
