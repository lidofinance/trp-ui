import { contractHooksFactory } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import { runWithFunctionLogger } from 'features/loggers';
import { VotingAdapter__factory } from 'generated';
import { useCallback, useMemo } from 'react';
import { useWeb3 } from 'reef-knot/web3-react';

const votingAdapterAddressMap = {
  [CHAINS.Mainnet]: '0xCFda8aB0AE5F4Fa33506F9C51650B890E4871Cc1',
  [CHAINS.Goerli]: '0x4d5C16778B7632e7B0C24fF102072247b9cf34c2',
  [CHAINS.Holesky]: '0x1dF997832b44b7ED00597f103165920537c980D4',
};

export const useVotingAdapter = () => {
  const { chainId } = useWeb3();

  // TODO: get this from env
  const votingAdapterAddress =
    chainId != null
      ? votingAdapterAddressMap[chainId as keyof typeof votingAdapterAddressMap]
      : '';

  const { useContractRPC, useContractWeb3 } = useMemo(
    () =>
      contractHooksFactory(VotingAdapter__factory, () => votingAdapterAddress),
    [votingAdapterAddress],
  );
  const contractRPC = useContractRPC();
  const contractWeb3 = useContractWeb3();

  return {
    contractRPC,
    contractWeb3,
  };
};

export const useEncodeSnapshotCalldata = () => {
  const { contractWeb3 } = useVotingAdapter();

  return useCallback(
    async (delegateAddress: string) => {
      if (contractWeb3 == null) {
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
    [contractWeb3],
  );
};

export const useEncodeAragonCalldata = () => {
  const { contractWeb3 } = useVotingAdapter();

  return useCallback(
    async (voteId: number, success: boolean) => {
      if (contractWeb3 == null) {
        return undefined;
      }
      return await runWithFunctionLogger(
        'Encode Aragon set delegate calldata',
        () => contractWeb3['encode_aragon_vote_calldata'](voteId, success),
      );
    },
    [contractWeb3],
  );
};

export const useEncodeAragonDelegationVPCalldata = () => {
  const { contractWeb3 } = useVotingAdapter();

  return useCallback(
    async (address: string) => {
      if (contractWeb3 == null) {
        return undefined;
      }
      return await runWithFunctionLogger(
        'Encode Aragon set delegate VP calldata',
        () => contractWeb3['encode_delegate_calldata'](address),
      );
    },
    [contractWeb3],
  );
};
