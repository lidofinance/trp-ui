import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { SelectIcon, Option, SelectIconProps } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import { useVestingsContext } from './vestings-provider';

type SelectVestingProps = Omit<SelectIconProps, 'icon'> & {
  error?: string | ReactNode;
};

export const SelectVesting: FC<SelectVestingProps> = ({
  name,
  onChange,
  error,
  ...rest
}) => {
  const { vestingsList, vestingAddress, setVestingAddress } =
    useVestingsContext();
  const orderedVestings = useMemo(
    () => vestingsList?.slice()?.reverse(),
    [vestingsList],
  );

  useEffect(() => {
    onChange?.(vestingAddress);
  }, [onChange, vestingAddress]);

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
      name={name}
      icon={<AddressBadge address={vestingAddress} symbols={0} />}
      value={vestingAddress}
      onChange={handleVestingSelect}
      error={!!error}
      {...rest}
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
