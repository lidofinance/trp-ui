import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { SelectIcon, Option, SelectIconProps } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import { useVestingsContext } from './vestingsContext';

type SelectVestingProps = Omit<SelectIconProps, 'icon'> & {
  error?: string | ReactNode;
};

export const SelectVesting: FC<SelectVestingProps> = ({
  name,
  onChange,
  error,
  ...rest
}) => {
  const {
    escrows: vestings,
    escrow,
    setEscrow: setCurrentVesting,
  } = useVestingsContext();
  const orderedVestings = useMemo(
    () => vestings?.slice()?.reverse(),
    [vestings],
  );

  useEffect(() => {
    onChange?.(escrow);
  }, [onChange, escrow]);

  const handleVestingSelect = useCallback(
    (newAddress: string) => {
      if (newAddress === escrow) {
        return;
      }
      setCurrentVesting(newAddress);
    },
    [escrow, setCurrentVesting],
  );

  return (
    <SelectIcon
      name={name}
      icon={<AddressBadge address={escrow} symbols={0} />}
      value={escrow}
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
