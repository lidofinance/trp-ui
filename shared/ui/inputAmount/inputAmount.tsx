import { Button, Input, InputProps } from '@lidofinance/lido-ui';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import { ChangeEvent, FC, useCallback } from 'react';

type InputAmountProps = InputProps & {
  error?: string | null;
  maxValue: { data?: BigNumber; loading: boolean };
  maxDisabled?: boolean;
};

export const InputAmount: FC<InputAmountProps> = ({
  onChange,
  maxValue,
  error,
  maxDisabled = false,
  ...rest
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.currentTarget.value);
    },
    [onChange],
  );

  return (
    <Input
      rightDecorator={
        <Button
          size="xxs"
          variant="translucent"
          disabled={maxDisabled}
          onClick={() => onChange?.(formatEther(maxValue.data || '0'))}
        >
          Max
        </Button>
      }
      onChange={handleChange}
      error={error != null}
      placeholder="0"
      {...rest}
    />
  );
};
