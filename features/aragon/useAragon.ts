import { contractHooksFactory } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import { runWithFunctionLogger } from 'features/loggers';
import { Aragon__factory } from 'generated';
import { useCallback, useMemo } from 'react';
import { useWeb3 } from 'reef-knot/web3-react';

const aragonAddressMap = {
  [CHAINS.Mainnet]: '0x2e59A20f205bB85a89C53f1936454680651E618e',
  [CHAINS.Goerli]: '0xbc0B67b4553f4CF52a913DE9A6eD0057E2E758Db',
  [CHAINS.Holesky]: '0xdA7d2573Df555002503F29aA4003e398d28cc00f',
  [CHAINS.Hoodi]: '0x15379d72Ec5Ff5635F5148d6e0F4a4Dcf8756636', // Test Voting contract for UI testing purposes, Actual: 0x49B3512c44891bef83F8967d075121Bd1b07a01B
};

export const useAragon = () => {
  const { chainId } = useWeb3();

  // TODO: get this from env
  const aragonAddress =
    chainId != null
      ? aragonAddressMap[chainId as keyof typeof aragonAddressMap]
      : '';

  const { useContractRPC, useContractWeb3 } = useMemo(
    () => contractHooksFactory(Aragon__factory, () => aragonAddress),
    [aragonAddress],
  );
  const contractRPC = useContractRPC();
  const contractWeb3 = useContractWeb3();

  return {
    contractRPC,
    contractWeb3,
  };
};

export const useGetVoting = () => {
  const { contractWeb3 } = useAragon();

  return useCallback(
    async (voteId: number) => {
      if (contractWeb3 == null) {
        return undefined;
      }
      try {
        return await runWithFunctionLogger('Aragon: get voting info', () =>
          contractWeb3['getVote'](voteId),
        );
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [contractWeb3],
  );
};
