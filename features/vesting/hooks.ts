import { useCallback } from 'react';
import { useContractSWR } from '@lido-sdk/react';
import { utils } from 'ethers';
import { transaction } from 'shared/ui/transaction';
import { getTokenByAddress } from 'config';
import { useWeb3 } from 'reef-knot';
import { useVestingsContext } from './vestingsContext';
import { useSDK } from '@lido-sdk/react';
import { CHAINS } from 'config/chains';
import useSWR from 'swr';
import { VestingEscrowCreatedEventObject } from 'generated/VestingEscrowFactory';
import { useVestingEscrowFactoryContract } from './contracts';

const { parseEther } = utils;

const EVENTS_STARTING_BLOCK: Record<number, number> = {
  [CHAINS.Mainnet]: 14441666,
};

export const useVestings = () => {
  const { chainId } = useWeb3();
  const { contractRPC } = useVestingEscrowFactoryContract();

  const filter = contractRPC.filters.VestingEscrowCreated();

  const getEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return [];

      const events = await contractRPC.queryFilter(
        filter,
        EVENTS_STARTING_BLOCK[chainId],
      );

      return events.map((e) =>
        e.decode?.(e.data, e.topics),
      ) as VestingEscrowCreatedEventObject[];
    },
    [contractRPC, filter],
  );

  return useSWR(
    `vestings-${chainId}`,
    async () => (await getEvents(chainId)).map((event) => ({ ...event })),
    {
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    },
  );
};

export const useAccountVestings = () => {
  const { account } = useSDK();
  const vestingSWR = useVestings();

  const accountVestings = vestingSWR.data?.filter(
    (vesting) => vesting.recipient === account,
  );

  return {
    data: accountVestings,
    isLoading: vestingSWR.isLoading,
    error: vestingSWR.error,
  };
};

export const useVestingUnclaimed = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  return useContractSWR({
    contract: contractRpc,
    method: 'unclaimed',
    shouldFetch: contractRpc != null,
  });
};

export const useVestingLocked = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  return useContractSWR({
    contract: contractRpc,
    method: 'locked',
    shouldFetch: contractRpc != null,
  });
};

export const useVestingStartTime = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'start_time',
    shouldFetch: contractRpc != null,
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

export const useVestingEndTime = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'end_time',
    shouldFetch: contractRpc != null,
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

export const useVestingCliff = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  const startTime = useVestingStartTime();

  const { data, error, loading, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'cliff_length',
    shouldFetch: contractRpc != null,
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

export const useVestingToken = () => {
  const {
    vestingContract: { contractRpc },
  } = useVestingsContext();

  const { data } = useContractSWR({
    contract: contractRpc,
    method: 'token',
    shouldFetch: contractRpc != null,
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

export const useVestingClaim = () => {
  const { chainId } = useWeb3();
  const {
    vestingContract: { contractWeb3 },
  } = useVestingsContext();

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

export const useVestingSnapshotDelegate = () => {
  const { chainId } = useWeb3();
  const {
    vestingContract: { contractWeb3 },
  } = useVestingsContext();

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
