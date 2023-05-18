import { BigNumber, constants, utils } from 'ethers';

const { Zero } = constants;
const { formatEther } = utils;

type FormatBalance = (balance?: BigNumber, maxDecimalDigits?: number) => string;

export const formatBalance: FormatBalance = (
  balance = Zero,
  maxDecimalDigits = 4,
) => {
  if (balance.isZero()) {
    return '0.0';
  }
  const balanceString = formatEther(balance);

  if (balanceString.includes('.')) {
    const [decimalPart, fractionPart] = balanceString.split('.');
    const nonZeroIndex =
      fractionPart.split('').findIndex((char) => char !== '0') + 1;
    return (
      decimalPart +
      '.' +
      fractionPart.slice(0, Math.max(nonZeroIndex, maxDecimalDigits))
    );
  }

  return balanceString;
};
