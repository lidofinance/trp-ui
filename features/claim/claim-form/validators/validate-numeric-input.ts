import { Zero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from '@ethersproject/units';

export const validateNumericInput = (
  value: string,
  inputName: string,
  {
    zeroValid = false,
    limit,
    minimum,
  }: {
    zeroValid?: boolean;
    limit?: BigNumber;
    minimum?: BigNumber;
  } = {},
):
  | {
      ok: true;
      error: null;
    }
  | { error: string } => {
  const amount = Number(value);

  switch (true) {
    case !value:
      return {
        error: `${inputName} is required`,
      };
    case Number.isNaN(amount):
    case !Number.isFinite(amount):
    case value.includes('e'):
      return {
        error: `${inputName} must be a number`,
      };
  }

  let amountBigNumber: BigNumber;
  try {
    amountBigNumber = parseEther(value);
  } catch {
    return {
      error: `${inputName} must be a valid number with up to 18 decimal places`,
    };
  }

  switch (true) {
    case amountBigNumber.lt(Zero):
      return {
        error: `${inputName} must not be a negative number`,
      };
    case !zeroValid && amountBigNumber.eq(Zero):
      return {
        error: `${inputName} must be greater than 0`,
      };
    case limit && amountBigNumber.gt(limit):
      return {
        // typescript bug with case:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        error: `${inputName} must not be greater than ${formatEther(limit!)}`,
      };
    case minimum && amountBigNumber.lt(minimum):
      return {
        // typescript bug with case:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        error: `${inputName} must not be greater than ${formatEther(minimum!)}`,
      };
  }

  return { ok: true, error: null };
};
