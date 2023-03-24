import { FormatTokenComponent } from './types';
import { BigNumber, constants, utils } from 'ethers';

const { Zero } = constants;
const { formatEther } = utils;

type FormatBalance = (balance?: BigNumber, maxDecimalDigits?: number) => string;

export const formatBalance: FormatBalance = (
  balance = Zero,
  maxDecimalDigits = 4,
) => {
  const balanceString = formatEther(balance);

  if (balanceString.includes('.')) {
    const parts = balanceString.split('.');
    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }

  return balanceString;
};

const FormatToken: FormatTokenComponent = (props) => {
  const { amount, symbol, approx = false, ...rest } = props;
  const prefix = !approx || amount?.isZero() ? '' : '≈';

  return (
    <span {...rest}>
      {prefix}
      {formatBalance(amount)}&nbsp;{symbol}
    </span>
  );
};

export default FormatToken;
