import { useCallback, useEffect, useState } from 'react';
import { Button } from '@lidofinance/lido-ui';

import { useVestingsContext } from 'features/home/hooks';
import { useInputValidate, useVestingClaim, useVestingUnclaimed } from 'hooks';

import { ClaimInput } from './claim-input';

export const ClaimForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);

  const { currentVesting, setIsClaiming } = useVestingsContext();
  const unclaimed = useVestingUnclaimed(currentVesting || '');
  const claim = useVestingClaim(currentVesting || '');

  const claimHandler = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsPending(true);
      setIsClaiming(true);

      await claim(inputValue);
      setIsPending(false);
      setIsClaiming(false);
      setInputValue('');
    },
    [claim, inputValue, setIsClaiming],
  );

  useEffect(() => {
    setInputValue('');
  }, [currentVesting]);

  const { error } = useInputValidate({
    value: inputValue,
    inputName: 'Token Amount',
    limit: unclaimed.data,
  });

  return (
    <>
      <form action="" method="post" onSubmit={claimHandler}>
        <ClaimInput
          error={error}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Button
          fullwidth
          type="submit"
          loading={isPending}
          disabled={!!error || !inputValue}
        >
          Claim
        </Button>
      </form>
    </>
  );
};
