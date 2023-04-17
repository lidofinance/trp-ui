import {
  useVestingEscrowFactoryRPC,
  useVestingEscrowFactoryWeb3,
} from 'config';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { useCallback } from 'react';
import { CHAINS } from 'config/chains';
import useSWR from 'swr';

const FROM_BLOCK: Record<number, number> = {
  [CHAINS.Mainnet]: 14441666,
};

type VestingEscrowCreatedEvent = [string, string] & {
  creator: string;
  recipient: string;
  escrow: string;
};

const useVestingEscrowFactory = () => {
  const factoryWeb3 = useVestingEscrowFactoryWeb3();
  const factoryRpc = useVestingEscrowFactoryRPC();

  return {
    factoryWeb3,
    factoryRpc,
  };
};

const useGetEventsVestingEscrowCreated = () => {
  const { factoryRpc } = useVestingEscrowFactory();

  const filter = factoryRpc.filters.VestingEscrowCreated();

  const getEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return [];

      const events = await factoryRpc.queryFilter(filter, FROM_BLOCK[chainId]);

      return events.map((e) =>
        e.decode?.(e.data, e.topics),
      ) as VestingEscrowCreatedEvent[];
    },
    [factoryRpc, filter],
  );

  return { getEvents };
};

export const useVestings = () => {
  const { account } = useSDK();
  const { chainId } = useWeb3();
  const { getEvents } = useGetEventsVestingEscrowCreated();

  const { data, error, isLoading, isValidating } = useSWR(
    `vestings-${chainId}-${account}`,
    async () =>
      (await getEvents(chainId))
        .filter((event) => event.recipient === account)
        .map((event) => ({ ...event })),
    {
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    },
  );

  return {
    vestings: data?.map((vesting) => vesting.escrow),
    isLoading,
    isValidating,
    error,
  };
};
