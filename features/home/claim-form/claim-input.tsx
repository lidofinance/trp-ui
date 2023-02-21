import { FC, useEffect, useRef, useState } from 'react';
import { Button, SelectIcon, Option, Input } from '@lidofinance/lido-ui';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

import { useVestingsContext } from 'features/home/hooks';
import AddressBadge from 'components/addressBadge';
import { useVestingUnclaimed } from 'hooks';

import { InputGroupStyled, NoProgramStyled } from './styles';

type ClaimInputProps = {
  error: string | null;
  inputValue: string;
  setInputValue: (value: string) => void;
};

export const ClaimInput: FC<ClaimInputProps> = (props) => {
  const { error, inputValue, setInputValue } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const [showError, setShowError] = useState(false);

  const { currentVesting, vestings, setCurrentVesting } = useVestingsContext();
  const unclaimed = useVestingUnclaimed(currentVesting || '');

  useEffect(() => {
    if (inputValue) setShowError(true);
  }, [inputValue]);

  const maxButton = (
    <Button
      size="xxs"
      variant="translucent"
      onClick={() =>
        setInputValue(formatEther(unclaimed.data || BigNumber.from(0)))
      }
    >
      MAX
    </Button>
  );

  if (!currentVesting)
    return <NoProgramStyled>Don&apos;t have program</NoProgramStyled>;

  return (
    <InputGroupStyled fullwidth error={showError && error} ref={ref}>
      <SelectIcon
        icon={<AddressBadge address={currentVesting} symbols={0} />}
        value={currentVesting}
        onChange={setCurrentVesting}
        error={showError && error}
        anchorRef={ref}
      >
        {vestings?.map((vesting, index) => {
          const programName = `Program ${String(index + 1)}`;

          return (
            <Option
              key={index}
              leftDecorator={<AddressBadge address={vesting} color="accent" />}
              value={vesting}
            >
              {programName}
            </Option>
          );
        })}
      </SelectIcon>
      <Input
        fullwidth
        placeholder="0"
        rightDecorator={maxButton}
        label="Token amount"
        value={inputValue}
        onChange={(event) => setInputValue(event?.currentTarget.value)}
        error={showError && error}
      />
    </InputGroupStyled>
  );
};
