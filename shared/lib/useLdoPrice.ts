import { useLidoSWR } from '@lido-sdk/react';
import { BigNumber, FixedNumber, utils } from 'ethers';
import { useMemo } from 'react';

const { formatEther } = utils;

export const useLdoPrice = (amount?: BigNumber) => {
  const { data: rate, ...rest } = useLidoSWR(
    ['ldo-usd-price'],
    async () => {
      const result = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=lido-dao&vs_currencies=usd',
      );
      const ldoPrice = Number((await result.json())['lido-dao']['usd']);
      if (isNaN(ldoPrice)) throw new Error('invalid response');
      return ldoPrice;
    },
    {
      refreshInterval: 60 * 1000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  );

  const amountUsd = useMemo(() => {
    if (rate == undefined || amount == undefined) return undefined;
    const fixedAmount = FixedNumber.from(formatEther(amount));
    const fixedRate = FixedNumber.from(rate.toString());
    return fixedAmount.mulUnsafe(fixedRate);
  }, [rate, amount]);

  return { ...rest, amountUsd };
};
