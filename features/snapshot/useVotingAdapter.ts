import { contractHooksFactory } from '@lido-sdk/react';
import { CHAINS } from 'config/chains';
import { runWithFunctionLogger } from 'features/loggers';
import { VotingAdapter__factory } from 'generated';
import { useCallback, useMemo } from 'react';
import { useWeb3 } from 'reef-knot';

const votingAdapterAddressMap = {
  [CHAINS.Mainnet]: '0xCFda8aB0AE5F4Fa33506F9C51650B890E4871Cc1',
  [CHAINS.Goerli]: '0x4d5C16778B7632e7B0C24fF102072247b9cf34c2',
};

export const useVotingAdapter = () => {
  const { chainId } = useWeb3();

  // TODO: get this from env
  const votingAdapterAddress =
    chainId != null ? votingAdapterAddressMap[chainId as CHAINS] : '';

  const { useContractRPC, useContractWeb3 } = useMemo(
    () =>
      contractHooksFactory(VotingAdapter__factory, () => votingAdapterAddress),
    [votingAdapterAddress],
  );
  const contractRPC = useContractRPC();
  const contractWeb3 = useContractWeb3();

  const encodeCalldata = useCallback(
    async (delegateAddress: string) => {
      if (chainId == null || contractWeb3 == null) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return undefined;
      }
      return await runWithFunctionLogger(
        'Encode Snapshot set delegate calldata',
        () =>
          contractWeb3['encode_snapshot_set_delegate_calldata'](
            delegateAddress,
          ),
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
