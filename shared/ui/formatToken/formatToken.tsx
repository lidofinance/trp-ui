import { formatBalance } from 'shared/lib';
import { ComponentProps, FC } from 'react';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

export type FormatTokenProps = ComponentProps<'span'> & {
  symbol?: string;
  amount?: BigNumber;
};

export const FormatToken: FC<FormatTokenProps> = ({
  amount,
  symbol,
  ...rest
}) => {
  if (amount == null) {
    return null;
  }

  return (
    <span {...rest} title={`${formatEther(amount)} ${symbol}`}>
      {formatBalance(amount)} {symbol}
    </span>
  );
};
