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
    const [decimalPart, fractionPart] = balanceString.split('.');
    const firstFractionDigit =
      fractionPart.split('').findIndex((char) => char !== '0') + 1;
    const prefix = fractionPart.length > maxDecimalDigits ? '≈' : '';
    const formattedFractionPart = fractionPart.slice(
      0,
      Math.max(firstFractionDigit, maxDecimalDigits),
    );
    return `${prefix}${decimalPart}.${formattedFractionPart}`;
  }

  return balanceString;
};
