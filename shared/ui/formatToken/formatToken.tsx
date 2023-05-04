import { formatBalance } from 'shared/lib';
import { ComponentProps, FC } from 'react';
import { BigNumber } from 'ethers';

export type FormatTokenProps = ComponentProps<'span'> & {
  symbol?: string;
  amount?: BigNumber;
  approx?: boolean;
};

export const FormatToken: FC<FormatTokenProps> = (props) => {
  const { amount, symbol, approx = false, ...rest } = props;
  const prefix = !approx || amount?.isZero() ? '' : '≈';

  return (
    <span {...rest}>
      {prefix}
      {formatBalance(amount)} {symbol}
    </span>
  );
};
