import { useCallback, useMemo } from 'react';
import { contractHooksFactory } from '@lido-sdk/react';
import { useContractSWR } from '@lido-sdk/react';
import { VestingEscrow__factory } from 'generated';
import { utils } from 'ethers';
import { transaction } from 'shared/ui/transaction';
import { getTokenByAddress } from 'config';
import { useWeb3 } from 'reef-knot';

const { parseEther } = utils;

const useVestingContract = (address: string | undefined) => {
  const { useContractRPC, useContractWeb3 } = useMemo(
    () => contractHooksFactory(VestingEscrow__factory, () => address ?? ''),
    [address],
  );
  const contractRpc = useContractRPC();
  const contractWeb3 = useContractWeb3();

  return { contractRpc, contractWeb3 };
};

export const useVestingUnclaimed = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'unclaimed',
    shouldFetch: !(address === ''),
  });
};

export const useVestingLocked = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'locked',
    shouldFetch: !(address === ''),
  });
};

export const useVestingStartTime = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'start_time',
    shouldFetch: !(address === ''),
  });

  const startSeconds = data?.toNumber() || 0;
  const startMiliseconds = startSeconds * 1000;

  return {
    data: startMiliseconds,
    error,
    loading,
    initialLoading,
  };
};

export const useVestingEndTime = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'end_time',
    shouldFetch: !(address === ''),
  });

  const endSeconds = data?.toNumber() || 0;
  const endMiliseconds = endSeconds * 1000;

  return {
    data: endMiliseconds,
    error,
    loading,
    initialLoading,
  };
};

export const useVestingCliff = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  const startTime = useVestingStartTime(address);

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'cliff_length',
    shouldFetch: !(address === ''),
  });

  const cliffSeconds = data?.toNumber() || 0;
  const cliffMiliseconds = cliffSeconds * 1000;

  return {
    data: startTime.data + cliffMiliseconds,
    error: startTime.error || error,
    loading: startTime.loading || loading,
    initialLoading: startTime.initialLoading || initialLoading,
  };
};

export const useVestingToken = (address: string | undefined) => {
  const { contractRpc } = useVestingContract(address);

  const { data } = useContractSWR({
    contract: contractRpc,
    method: 'token',
    shouldFetch: !(address === ''),
  });

  if (data == null) {
    return {
      address: undefined,
      symbol: '',
    };
  }

  return {
    address: data,
    symbol: getTokenByAddress(data),
  };
};

export const useVestingClaim = (address: string | undefined) => {
  const { chainId } = useWeb3();
  const { contractWeb3 } = useVestingContract(address);

  return useCallback(
    async (amount: string, account: string) => {
      if (!contractWeb3 || !account || !chainId) return;

      await transaction('Claim', chainId, () =>
        contractWeb3['claim(address,uint256)'](account, parseEther(amount)),
      );
    },
    [chainId, contractWeb3],
  );
};

export const useVestingSnapshotDelegate = (address: string | undefined) => {
  const { chainId } = useWeb3();
  const { contractWeb3 } = useVestingContract(address);

  return useCallback(
    async (callData: string | undefined) => {
      if (contractWeb3 == null || chainId == null || callData == null) {
        return;
      }
      await transaction('Set Snapshot delegate', chainId, () =>
        contractWeb3['snapshot_set_delegate'](callData),
      );
    },
    [contractWeb3, chainId],
  );
};
