import { useCallback, useMemo } from 'react';
import { contractHooksFactory } from '@lido-sdk/react';
import { useSDK, useContractSWR } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { VestingEscrow__factory } from 'generated';
import { CHAINS } from '@lido-sdk/constants';
import { utils } from 'ethers';
import { transaction } from 'components/transaction';
import { getTokenNameByAddress } from 'config';

const { parseEther } = utils;

const useVestingEscrowContract = (address: string) => {
  const vestingEscrow = useMemo(
    () => contractHooksFactory(VestingEscrow__factory, () => address),
    [address],
  );

  const { account } = useSDK();
  const { chainId } = useWeb3();
  const contractRpc = vestingEscrow.useContractRPC();
  const contractWeb3 = vestingEscrow.useContractWeb3();

  return { contractRpc, contractWeb3, account, chainId };
};

export const useVestingUnclaimed = (address: string) => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'unclaimed',
    shouldFetch: !(address === ''),
  });
};

export const useVestingLocked = (address: string) => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'locked',
    shouldFetch: !(address === ''),
  });
};

export const useVestingToken = (address: string) => {
  const { contractRpc, chainId } = useVestingEscrowContract(address);

  const { data } = useContractSWR({
    contract: contractRpc,
    method: 'token',
    shouldFetch: !(address === ''),
  });

  return getTokenNameByAddress(data || '0x00', chainId as CHAINS);
};

export const useVestingStartTime = (address: string) => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'start_time',
    shouldFetch: !(address === ''),
  });
};

export const useVestingEndTime = (address: string) => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'end_time',
    shouldFetch: !(address === ''),
  });
};

export const useVestingCliff = (address: string) => {
  const { contractRpc } = useVestingEscrowContract(address);
  const start = useVestingStartTime(address);

  const { data: cliffLength, initialLoading } = useContractSWR({
    contract: contractRpc,
    method: 'cliff_length',
    shouldFetch: !(address === ''),
  });

  const startTimestamp = start.data?.toNumber() || 0;
  const cliffTimestamp = startTimestamp + (cliffLength?.toNumber() || 0);
  const cliffInTime = cliffTimestamp * 1000;
  const isLoading = start.initialLoading || initialLoading;

  return { cliffInTime, isLoading };
};

export const useVestingPeriod = (address: string) => {
  const start = useVestingStartTime(address);
  const end = useVestingEndTime(address);
  const startTimestamp = start.data?.toNumber() || 0;
  const endTimestamp = end.data?.toNumber() || 0;

  const startInTime = startTimestamp * 1000;
  const endInTime = endTimestamp * 1000;

  const isLoading = start.initialLoading || end.initialLoading;

  return { startInTime, endInTime, isLoading };
};

export const useVestingClaim = (address: string) => {
  const { contractWeb3, account, chainId } = useVestingEscrowContract(address);

  return useCallback(
    async (value: string) => {
      if (!contractWeb3 || !account || !chainId) return;

      const callback = () =>
        contractWeb3['claim(address,uint256)'](account, parseEther(value));

      await transaction('Claim', chainId, callback);
    },
    [account, chainId, contractWeb3],
  );
};
