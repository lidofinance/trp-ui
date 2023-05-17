import { FC } from 'react';
import { WalletCardBalance } from '@lidofinance/ui-primitives';

import { FormatDate } from 'shared/ui';
import { useVestingEndTime, useVestingStartTime } from 'features/vesting';

export const WalletPeriod: FC = () => {
  const startTime = useVestingStartTime();
  const endTime = useVestingEndTime();

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
