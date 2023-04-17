import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { SelectIcon, Option, SelectIconProps } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import { useVestingsContext } from './vestingsProvider';

type SelectVestingProps = Omit<SelectIconProps, 'icon'> & {
  error?: string | ReactNode;
};

export const SelectVesting: FC<SelectVestingProps> = ({
  name,
  onChange,
  error,
  ...rest
}) => {
  const { vestings, currentVesting, setCurrentVesting } = useVestingsContext();
  const orderedVestings = useMemo(
    () => vestings?.slice()?.reverse(),
    [vestings],
  );

  useEffect(() => {
    onChange?.(currentVesting);
  }, [onChange, currentVesting]);

  const handleVestingSelect = useCallback(
    (newAddress: string) => {
      if (newAddress === currentVesting) {
        return;
      }
      setCurrentVesting(newAddress);
    },
    [currentVesting, setCurrentVesting],
  );

  return (
    <SelectIcon
      name={name}
      icon={<AddressBadge address={currentVesting} symbols={0} />}
      value={currentVesting}
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
