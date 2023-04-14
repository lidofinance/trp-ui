import { FC, ReactNode, useCallback, useMemo } from 'react';
import { SelectIcon, Option } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import { useVestingsContext } from './vestings-provider';

type SelectVestingProps = {
  error?: string | ReactNode;
};

export const SelectVesting: FC<SelectVestingProps> = ({ error }) => {
  const { vestingsList, vestingAddress, setVestingAddress } =
    useVestingsContext();
  const orderedVestings = useMemo(
    () => vestingsList?.slice()?.reverse(),
    [vestingsList],
  );

  const handleVestingSelect = useCallback(
    (newAddress: string) => {
      if (newAddress === vestingAddress) {
        return;
      }
      setVestingAddress(newAddress);
    },
    [vestingAddress, setVestingAddress],
  );

  return (
    <SelectIcon
      icon={<AddressBadge address={vestingAddress} symbols={0} />}
      value={vestingAddress}
      onChange={handleVestingSelect}
      error={!!error}
    >
      {orderedVestings?.map((vesting, index) => (
        <Option
          key={index}
          leftDecorator={<AddressBadge address={vesting} color="accent" />}
          value={vesting}
        >
          {`Program ${String(index + 1)}`}
        </Option>
      ))}
    </SelectIcon>
  );
};
