import { FC, ReactNode, useCallback, useMemo } from 'react';
import { SelectIcon, Option, SelectIconProps } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import { useVestingsContext } from './vestingsContext';
import { Vesting } from './types';

type SelectVestingProps = Omit<SelectIconProps, 'icon'> & {
  error?: string | ReactNode;
};

// TODO: delete
export const SelectVesting: FC<SelectVestingProps> = ({
  name,
  error,
  ...rest
}) => {
  const { activeVesting, vestings, setActiveVesting } = useVestingsContext();

  const orderedVestings = useMemo(
    () => vestings?.slice()?.reverse(),
    [vestings],
  );

  const handleVestingSelect = useCallback(
    (selectedEscrow: string) => {
      if (selectedEscrow === activeVesting?.escrow) {
        return;
      }
      setActiveVesting(
        vestings?.find(
          (vesting) => vesting.escrow === selectedEscrow,
        ) as Vesting,
      );
    },
    [activeVesting, vestings, setActiveVesting],
  );

  return (
    <SelectIcon
      name={name}
      icon={<AddressBadge address={activeVesting?.escrow} symbols={0} />}
      value={activeVesting?.escrow}
      onChange={handleVestingSelect}
      error={!!error}
      {...rest}
    >
      {orderedVestings?.map((vesting, index) => (
        <Option
          key={index}
          leftDecorator={
            <AddressBadge address={vesting.escrow} color="accent" />
          }
          value={vesting.escrow}
        >
          {`Program ${String(index + 1)}`}
        </Option>
      ))}
    </SelectIcon>
  );
};
