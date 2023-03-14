import {
  useVestingEscrowFactoryRPC,
  useVestingEscrowFactoryWeb3,
} from 'config';
import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { useCallback } from 'react';
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
  const sdk = useSDK();
  const web3 = useWeb3();
  const factoryWeb3 = useVestingEscrowFactoryWeb3();
  const factoryRpc = useVestingEscrowFactoryRPC();

  return {
    factoryWeb3,
    factoryRpc,
    account: sdk.account,
    chainId: web3.chainId,
  };
};

const useGetEventsVestingEscrowCreated = () => {
  const { factoryRpc } = useVestingEscrowFactory();

  const filter = factoryRpc.filters.VestingEscrowCreated();

  const getEvents = useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return [];

      // You have been visited by Typescript
      const fromBlock:
        | (typeof FROM_BLOCK)[keyof typeof FROM_BLOCK]
        | undefined = FROM_BLOCK[chainId as keyof typeof FROM_BLOCK];
      const events = await factoryRpc.queryFilter(filter, fromBlock);

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
    async () =>
      (await getEvents(chainId))
        .filter((event) => event.recipient === account)
        .map((event) => ({ ...event })),
    {
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    },
  );
};
