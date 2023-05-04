import { Zero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from '@ethersproject/units';

export const validateNumericInput = (
  value: string,
  inputName: string,
  {
    maximum,
    minimum,
  }: {
    maximum?: BigNumber;
    minimum?: BigNumber;
  } = {},
): string | true => {
  const amount = Number(value);

  switch (true) {
    case !value:
      return `${inputName} is required`;
    case Number.isNaN(amount):
    case !Number.isFinite(amount):
    case value.includes('e'):
      return `${inputName} must be a number`;
  }

  let amountBigNumber: BigNumber;
  try {
    amountBigNumber = parseEther(value);
  } catch {
    return `${inputName} must be a valid number with up to 18 decimal places`;
  }

  switch (true) {
    case amountBigNumber.lt(Zero):
      return `${inputName} must not be a negative number`;
    case maximum && amountBigNumber.gt(maximum):
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return `${inputName} must not be greater than ${formatEther(maximum!)}`;
    case minimum && amountBigNumber.lt(minimum):
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return `${inputName} must not be greater than ${formatEther(minimum!)}`;
  }

  return true;
};
