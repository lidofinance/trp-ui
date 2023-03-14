import { BigNumber, constants, utils } from 'ethers';

const { formatEther, parseEther } = utils;
const { Zero } = constants;

type UseInputValidation = (data: {
  value: string;
  inputName: string;
  zeroValid?: boolean;
  limit?: BigNumber;
  minimum?: BigNumber;
}) => {
  ok: boolean;
  error: string | null;
};

export const useInputValidate: UseInputValidation = ({
  value,
  inputName,
  zeroValid = false,
  limit,
  minimum,
}) => {
  const amount = Number(value);

  if (!value) {
    return {
      ok: false,
      error: `${inputName} is required`,
    };
  }

  if (
    Number.isNaN(amount) || // no NaN
    !Number.isFinite(amount) || // no infinity or -infinity
    value.includes('e') // no numbers in scientific notation
  ) {
    return {
      ok: false,
      error: `${inputName} must be a number`,
    };
  }

  let amountBigNumber: BigNumber;
  try {
    amountBigNumber = parseEther(value);
  } catch {
    return {
      ok: false,
      error: `${inputName} must be a valid number with up to 18 decimal places`,
    };
  }

  if (amountBigNumber.lt(Zero)) {
    return {
      ok: false,
      error: `${inputName} must not be a negative number`,
    };
  }

  if (!zeroValid) {
    if (amountBigNumber.eq(Zero)) {
      return {
        ok: false,
        error: `${inputName} must be greater than 0`,
      };
    }
  }

  if (limit) {
    if (amountBigNumber.gt(limit)) {
      return {
        ok: false,
        error: `${inputName} must not be greater than ${formatEther(limit)}`,
      };
    }
  }

  if (minimum) {
    if (amountBigNumber.lt(minimum)) {
      return {
        ok: false,
        error: `${inputName} must not be greater than ${formatEther(minimum)}`,
      };
    }
  }

  return { ok: true, error: null, warning: null };
};
