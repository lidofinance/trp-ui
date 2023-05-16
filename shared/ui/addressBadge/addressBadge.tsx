import { IdenticonBadgeProps, useBreakpoint } from '@lidofinance/lido-ui';
import { ComponentProps, FC } from 'react';
import { AddressBadgeStyle } from './addressBadgeStyles';

export type AddressBadgeProps = Omit<ComponentProps<'div'>, 'ref' | 'color'> &
  Omit<IdenticonBadgeProps, 'address' | 'as'> & {
    address?: string | null;
    symbols?: number;
  };

export const AddressBadge: FC<AddressBadgeProps> = ({
  address,
  symbols,
  ...rest
}) => {
  const isMobile = useBreakpoint('md');
  const defaultSymbols = isMobile ? 3 : 6;
  const calculatedSymbols = symbols ?? defaultSymbols;

  return (
    <AddressBadgeStyle
      symbols={calculatedSymbols}
      address={address ?? ''}
      {...rest}
    />
  );
};
