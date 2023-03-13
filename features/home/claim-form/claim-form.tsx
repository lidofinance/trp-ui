import { Loader } from '@lidofinance/lido-ui';

import { useVestingsContext } from 'features/home/hooks';
import { LoaderWrapperStyled, NoProgramStyled } from './styles';
import { ExistingClaimForm } from './existing-claim-form';
import { memo } from 'react';

export const ClaimForm = memo(() => {
  const { vestings, currentVesting, isVestingsLoading, setCurrentVesting } =
    useVestingsContext();

  if (isVestingsLoading) {
    return (
      <LoaderWrapperStyled>
        <Loader />
      </LoaderWrapperStyled>
    );
  }
  if (!currentVesting) {
    return <NoProgramStyled>Don&apos;t have program</NoProgramStyled>;
  }

  return (
    <ExistingClaimForm
      value={currentVesting}
      options={vestings}
      onChange={setCurrentVesting}
    />
  );
});

ClaimForm.displayName = 'Memo<ClaimForm>';
