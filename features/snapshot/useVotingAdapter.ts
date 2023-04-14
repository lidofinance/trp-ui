import { contractHooksFactory } from '@lido-sdk/react';
import { runWithFunctionLogger } from 'features/loggers';
import { VotingAdapter__factory } from 'generated';
import { useCallback, useMemo } from 'react';
import { useWeb3 } from 'reef-knot';

export const useVotingAdapter = (address: string | undefined) => {
  const { chainId } = useWeb3();

  const { useContractRPC, useContractWeb3 } = useMemo(
    () => contractHooksFactory(VotingAdapter__factory, () => address ?? ''),
    [address],
  );
  const contractRPC = useContractRPC();
  const contractWeb3 = useContractWeb3();

  const encodeCalldata = useCallback(
    async (delegateAddress: string) => {
      if (chainId == null || contractWeb3 == null) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
      }
      await runWithFunctionLogger('encode_snapshot_set_delegate_calldata', () =>
        contractWeb3['encode_snapshot_set_delegate_calldata'](delegateAddress),
      );
    },
    [chainId, contractWeb3],
  );

  return {
    contractRPC,
    contractWeb3,
    encodeCalldata,
  };
};
