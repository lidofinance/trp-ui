import { Button, Input } from '@lidofinance/lido-ui';
import { formatEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

type ClaimInputProps = {
  value: string;
  error?: string | null;
  maxValue: { data?: BigNumber; loading: boolean };
  onChange: (value: string) => unknown;
};

export const InputUnvestAmount = ({
  value,
  onChange,
  maxValue,
  error,
}: ClaimInputProps) => (
  <Input
    fullwidth
    placeholder="0"
    rightDecorator={
      <Button
        size="xxs"
        variant="translucent"
        onClick={() => onChange(formatEther(maxValue.data || '0'))}
      >
        Max
      </Button>
    }
    label="Token amount"
    value={value}
    onChange={(event) => onChange(event?.currentTarget.value)}
    error={!!error}
  />
);