import { contractHooksFactory } from '@lido-sdk/react';
import { CHAINS } from '@lido-sdk/constants';
import { SnapshotDeledation__factory } from 'generated';

export const SNAPSHOT_DELEGATION_FACTORY_BY_NETWORK: {
  [key in CHAINS | string]?: string;
} = {
  [CHAINS.Mainnet]: '0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446',
  [CHAINS.Holesky]: '0x',
};

const snapshotDelegationFactory = contractHooksFactory(
  SnapshotDeledation__factory,
  (chainId) => SNAPSHOT_DELEGATION_FACTORY_BY_NETWORK[chainId] ?? '0x00',
);

export const useSnapshotDelegationContract = () => {
  const { useContractRPC, useContractWeb3 } = snapshotDelegationFactory;
  const contractWeb3 = useContractWeb3();
  const contractRpc = useContractRPC();

  return {
    contractWeb3,
    contractRpc,
  };
};
