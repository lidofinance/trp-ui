import { useLidoSWR } from '@lido-sdk/react';
import { BigNumber } from 'ethers';
import { useMemo } from 'react';

export const useLdoPrice = (amount?: BigNumber) => {
  const swrResult = useLidoSWR(
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

  const data = swrResult.data;
  const amountUsd = useMemo(() => {
    if (data == undefined || amount == undefined) return undefined;
    return amount.mul(BigNumber.from(data * 10_000)).div(10_000);
  }, [data, amount]);

  return { ...swrResult, amountUsd };
};
