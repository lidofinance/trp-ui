import { FormatTokenComponent } from './types';
import { formatBalance } from 'shared/lib';

export const FormatToken: FormatTokenComponent = (props) => {
  const { amount, symbol, approx = false, ...rest } = props;
  const prefix = !approx || amount?.isZero() ? '' : '≈';

  return (
    <span {...rest}>
      {prefix}
      {formatBalance(amount)}&nbsp;{symbol}
    </span>
  );
};
