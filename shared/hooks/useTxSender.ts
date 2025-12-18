import { useAddressValidation } from 'features/addressValidation';
import { useWeb3 } from 'reef-knot/web3-react';
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { useCallback } from 'react';
import { transaction } from 'shared/ui';

export const useTxSender = () => {
  const { chainId } = useWeb3();
  const { validateAddress } = useAddressValidation();

  return useCallback(
    async <T extends TransactionReceipt>(
      name: string,
      callback: () => Promise<TransactionResponse>,
    ) => {
      if (!chainId) return;
      const isValid = await validateAddress();

      // if address is not valid, don't send the transaction
      if (!isValid) return;

      return transaction<T>(name, chainId, callback);
    },
    [chainId, validateAddress],
  );
};
