import { useSDK } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import useSWR from 'swr';

const ENS_NAME_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';

export const useENS = (address = '') => {
  const { providerRpc, chainId } = useSDK();

  const fetcher = async () => {
    if (chainId === CHAINS.Holesky || chainId === CHAINS.Hoodi) {
      providerRpc.network.ensAddress = ENS_NAME_ADDRESS;
    }
    return providerRpc.lookupAddress(address);
  };

  const cacheKey = `ens-name-${address}`;
  return useSWR(cacheKey, fetcher);
};
