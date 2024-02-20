import { contractHooksFactory } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import {
  VestingEscrowFactory__factory,
  VestingEscrow__factory,
} from 'generated';
import { useMemo } from 'react';

export const VESTING_FACTORY_BY_NETWORK: {
  [key in CHAINS | string]?: string;
} = {
  [CHAINS.Mainnet]: '0xDA1DF6442aFD2EC36aBEa91029794B9b2156ADD0',
  [CHAINS.Goerli]: '0x8D20FD1Ac547e035BF01089cFb92459054F82Ff7',
  [CHAINS.Holesky]: '0x586f0b51d46ac8ac6058702d99cd066ae514e96b',
};

const vestingEscrowFactory = contractHooksFactory(
  VestingEscrowFactory__factory,
  (chainId) => VESTING_FACTORY_BY_NETWORK[chainId] ?? '0x00',
);

export const useVestingEscrowFactoryContract = () => {
  const { useContractRPC, useContractWeb3 } = vestingEscrowFactory;
  const contractWeb3 = useContractWeb3();
  const contractRPC = useContractRPC();

  return {
    contractWeb3,
    contractRPC,
  };
};

export const useVestingEscrowContract = (address: string | undefined) => {
  const { useContractRPC, useContractWeb3 } = useMemo(
    () => contractHooksFactory(VestingEscrow__factory, () => address ?? ''),
    [address],
  );
  const contractRpc = useContractRPC();
  const contractWeb3 = useContractWeb3();

  return { contractRpc, contractWeb3 };
};
