import { CHAINS } from '@lido-sdk/constants';
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

const vestingEscrowFactory = contractHooksFactory(
  VestingEscrowFactory__factory,
  (chainId) => getVestingEscrowFactoryAddress(chainId),
);
export const useVestingEscrowFactoryRPC = vestingEscrowFactory.useContractRPC;
export const useVestingEscrowFactoryWeb3 = vestingEscrowFactory.useContractWeb3;
