import {
  useVestingEscrowFactoryRPC,
  useVestingEscrowFactoryWeb3,
} from 'config';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { useCallback } from 'react';
import get from 'lodash/get';
import { CHAINS } from '@lido-sdk/constants';
import useSWR from 'swr';

const FROM_BLOCK = {
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
  const { account } = useSDK();
  const { chainId } = useWeb3();

  return { factoryWeb3, factoryRpc, account, chainId };
};

const useGetEventsVestingEscrowCreated = () => {
  const { factoryRpc } = useVestingEscrowFactory();

  const filter = factoryRpc.filters.VestingEscrowCreated();

  const getEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (!chainId) return [];

      const events = await factoryRpc.queryFilter(
        filter,
        get(FROM_BLOCK, chainId, undefined),
      );

      return events.map((e) =>
        e.decode?.(e.data, e.topics),
      ) as VestingEscrowCreatedEvent[];
    },
    [factoryRpc, filter],
  );

  return { getEvents };
};

export const useVestings = () => {
  const { account } = useVestingEscrowFactory();
  const { getEvents } = useGetEventsVestingEscrowCreated();

  const { chainId } = useWeb3();

  return useSWR(
    `vestings-${chainId}-${account}`,
    async () => {
      const events = await getEvents(chainId);

      return events
        .filter((event) => event.recipient === account)
        .map((event) => ({
          ...event,
        }));
    },
    {
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    },
  );
};
