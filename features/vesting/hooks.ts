import { useCallback, useMemo } from 'react';
import { useContractSWR } from '@lido-sdk/react';
import { BigNumber, utils } from 'ethers';
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
import { VestingEscrow__factory } from 'generated';
import { createContractGetter } from '@lido-sdk/contracts';

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

  const accountVestings = useMemo(
    () => vestingSWR.data?.filter((vesting) => vesting.recipient === account),
    [vestingSWR.data, account],
  );

  return {
    data: accountVestings,
    isLoading: vestingSWR.isLoading,
    error: vestingSWR.error,
  };
};

const vestingEscrowContractFactory = createContractGetter(
  VestingEscrow__factory,
);

export const useVestingsUnclaimed = (escrows: string[] | undefined) => {
  const { providerRpc } = useSDK();

  const fetcher = async () => {
    if (escrows == null) {
      return BigNumber.from(0);
    }
    try {
      return escrows
        .map((escrow) => vestingEscrowContractFactory(escrow, providerRpc))
        .map((contract) => contract.unclaimed())
        .reduce(async (acc, cur) => {
          const accValue = await acc;
          const curValue = await cur;
          return accValue.add(curValue);
        }, Promise.resolve(BigNumber.from(0)));
    } catch (e) {
      console.error(e);
      return BigNumber.from(0);
    }
  };

  const cacheKey = 'unclaimed' + escrows?.join('-');

  return useSWR(cacheKey, fetcher);
};

export const useVestingsLocked = (escrows: string[] | undefined) => {
  const { providerRpc } = useSDK();

  const fetcher = async () => {
    if (escrows == null) {
      return BigNumber.from(0);
    }
    try {
      return escrows
        .map((escrow) => vestingEscrowContractFactory(escrow, providerRpc))
        .map((contract) => contract.locked())
        .reduce(async (acc, cur) => {
          const accValue = await acc;
          const curValue = await cur;
          return accValue.add(curValue);
        }, Promise.resolve(BigNumber.from(0)));
    } catch (e) {
      console.error(e);
      return BigNumber.from(0);
    }
  };

  const cacheKey = 'locked' + escrows?.join('-');

  return useSWR(cacheKey, fetcher);
};

export const useVestingUnclaimed = (escrow: string | undefined) => {
  const { contractRpc } = useVestingEscrowContract(escrow);

  return useSWR(`unclaimed-${escrow}`, () => contractRpc.unclaimed());
};

export const useVestingLocked = (escrow: string | undefined) => {
  const { contractRpc } = useVestingEscrowContract(escrow);

  return useSWR(`locked-${escrow}`, () => contractRpc.locked());
};

export const useVestingEndTime = (escrow: string | undefined) => {
  const { contractRpc } = useVestingEscrowContract(escrow);

  const { data, ...rest } = useSWR(`end-time-${escrow}`, () =>
    contractRpc.end_time(),
  );
  const endSeconds = data?.toNumber() || 0;
  const endMiliseconds = endSeconds * 1000;

  return {
    data: endMiliseconds,
    ...rest,
  };
};

export const useVestingCliff = (escrow: string | undefined) => {
  const { contractRpc } = useVestingEscrowContract(escrow);

  const startTimeSWR = useSWR(`start-time-${escrow}`, () =>
    contractRpc.start_time(),
  );
  const startSeconds = startTimeSWR.data?.toNumber() || 0;
  const startMiliseconds = startSeconds * 1000;

  const cliffSWR = useSWR(`cliff-time-${escrow}`, () =>
    contractRpc.cliff_length(),
  );
  const cliffSeconds = cliffSWR.data?.toNumber() || 0;
  const cliffMiliseconds = cliffSeconds * 1000;

  return {
    data: startMiliseconds + cliffMiliseconds,
    error: startTimeSWR.error || cliffSWR.error,
    isLoading: startTimeSWR.isLoading || cliffSWR.isLoading,
    isValidating: startTimeSWR.isValidating || cliffSWR.isValidating,
  };
};

export const useVestingToken = () => {
  const { chainId } = useSDK();
  const { contractRPC } = useVestingEscrowFactoryContract();

  const fetcher = async () => {
    const address = await contractRPC.token();
    const symbol = getTokenByAddress(address);
    return {
      address,
      symbol,
    };
  };

  return useSWR(`vesting-token-${chainId}`, fetcher);
};

export const useVestingClaim = (escrow: string | undefined) => {
  const { chainId } = useWeb3();
  const { contractWeb3 } = useVestingEscrowContract(escrow);

  return useCallback(
    async (amount: string, account: string) => {
      if (!contractWeb3 || !chainId) return;

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
