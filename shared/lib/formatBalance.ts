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
