import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { useCallback } from 'react';
import { CHAINS } from 'config/chains';
import useSWR from 'swr';
import { contractHooksFactory } from '@lido-sdk/react';
import { VestingEscrowFactory__factory } from 'generated';

export const VESTING_FACTORY_BY_NETWORK: {
  [key in CHAINS]?: string;
} = {
  [CHAINS.Mainnet]: '0xDA1DF6442aFD2EC36aBEa91029794B9b2156ADD0',
  [CHAINS.Goerli]: '0x8D20FD1Ac547e035BF01089cFb92459054F82Ff7',
};

export const getVestingEscrowFactoryAddress = (chainId: CHAINS): string => {
  return VESTING_FACTORY_BY_NETWORK[chainId] ?? '0x00';
};

const FROM_BLOCK: Record<number, number> = {
  [CHAINS.Mainnet]: 14441666,
};

type VestingEscrowCreatedEvent = [string, string] & {
  creator: string;
  recipient: string;
  escrow: string;
};

const useVestingEscrowFactory = () => {
  const vestingEscrowFactory = contractHooksFactory(
    VestingEscrowFactory__factory,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (chainId) => getVestingEscrowFactoryAddress(chainId as any),
  );
  const { useContractRPC, useContractWeb3 } = vestingEscrowFactory;
  const contractWeb3 = useContractWeb3();
  const contractRPC = useContractRPC();

  return {
    contractWeb3,
    contractRPC,
  };
};

const useGetEventsVestingEscrowCreated = () => {
  const { contractRPC: factoryRpc } = useVestingEscrowFactory();

  const filter = factoryRpc.filters.VestingEscrowCreated();

  return useCallback(
    async (chainId?: CHAINS) => {
      if (chainId == null) return [];

      const events = await factoryRpc.queryFilter(filter, FROM_BLOCK[chainId]);

      return events.map((e) =>
        e.decode?.(e.data, e.topics),
      ) as VestingEscrowCreatedEvent[];
    },
    [factoryRpc, filter],
  );
};

export const useVestings = () => {
  const { account } = useSDK();
  const { chainId } = useWeb3();
  const getEvents = useGetEventsVestingEscrowCreated();

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
