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
import {
  useVestingEscrowFactoryContract,
  useVestingEscrowContract,
} from './contracts';
import { Vesting } from './types';

const { parseEther } = utils;

const EVENTS_STARTING_BLOCK: Record<number, number> = {
  [CHAINS.Mainnet]: 14441666,
};

export const useVestingAdmins = () => {
  const { contractRPC } = useVestingEscrowFactoryContract();

  const ownerSWR = useContractSWR({
    contract: contractRPC,
    method: 'owner',
  });

  const managerSWR = useContractSWR({
    contract: contractRPC,
    method: 'manager',
  });

  return {
    data: [ownerSWR.data, managerSWR.data],
    isLoading: ownerSWR.initialLoading || managerSWR.initialLoading,
    error: ownerSWR.error || managerSWR.error,
  };
};

export const useIsAdmin = () => {
  const { account } = useSDK();
  const { data } = useVestingAdmins();
  if (account == null || data == null) {
    return undefined;
  }
  return data.includes(account);
};

export const useVestings = () => {
  const { chainId } = useWeb3();
  const { contractRPC } = useVestingEscrowFactoryContract();

  const getVestingEscrowCreatedEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return [];

      const events = await contractRPC.queryFilter(
        contractRPC.filters.VestingEscrowCreated(),
        EVENTS_STARTING_BLOCK[chainId],
      );

      return (
        events
          .map((e) => e.decode?.(e.data, e.topics) as Vesting)
          // Not sure why do we need ({ ...event })
          .map((event) => ({ ...event }))
      );
    },
    [contractRPC],
  );

  return useSWR(
    `vestings-${chainId}`,
    async () => getVestingEscrowCreatedEvents(chainId),
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

export const useSnapshotDelegate = () => {
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

export const useRevokeUnvested = (escrow: string | undefined) => {
  const { chainId } = useWeb3();
  const { contractWeb3 } = useVestingEscrowContract(escrow);

  return useCallback(async () => {
    if (chainId == null || contractWeb3 == null) {
      return;
    }
    await transaction('Revoke unvested tokens', chainId, () =>
      contractWeb3['revoke_unvested'](),
    );
  }, [chainId, contractWeb3]);
};

export const useVestingIsRevoked = (escrow: string | undefined) => {
  const { chainId } = useWeb3();
  const { contractRpc } = useVestingEscrowContract(escrow);

  const getUnvestedTokensRevokedEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return false;

      const events = await contractRpc.queryFilter(
        contractRpc.filters.UnvestedTokensRevoked(),
        EVENTS_STARTING_BLOCK[chainId],
      );

      return events.length > 0;
    },
    [contractRpc],
  );

  return useSWR(
    `unvested-tokens-revoked-${chainId}-${escrow}`,
    () => getUnvestedTokensRevokedEvents(chainId),
    {
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    },
  );
};

export const useAragonVote = () => {
  const { chainId } = useWeb3();
  const {
    vestingContract: { contractWeb3 },
  } = useVestingsContext();

  return useCallback(
    async (callData: string | undefined) => {
      if (contractWeb3 == null || chainId == null || callData == null) {
        return;
      }
      await transaction('Vote via Aragon', chainId, () =>
        contractWeb3['aragon_vote'](callData),
      );
    },
    [contractWeb3, chainId],
  );
};
