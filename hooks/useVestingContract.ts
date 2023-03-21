import { useCallback, useMemo } from 'react';
import { contractHooksFactory } from '@lido-sdk/react';
import { useSDK, useContractSWR } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { VestingEscrow__factory } from 'generated';
import { utils } from 'ethers';
import { transaction } from 'components/transaction';
import { TOKENS_BY_ADDRESS } from 'config';

const { parseEther } = utils;

const useVestingEscrowContract = (address = '') => {
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

export const useVestingUnclaimed = (address = '') => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'unclaimed',
    shouldFetch: !(address === ''),
  });
};

export const useVestingLocked = (address = '') => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'locked',
    shouldFetch: !(address === ''),
  });
};

export const useVestingToken = (address = '') => {
  const { contractRpc } = useVestingEscrowContract(address);

  const { data } = useContractSWR({
    contract: contractRpc,
    method: 'token',
    shouldFetch: !(address === ''),
  });

  if (data == null) {
    return {
      address: undefined,
      symbol: '',
    };
  }

  return {
    address: data,
    symbol: TOKENS_BY_ADDRESS[data] ?? '',
  };
};

export const useVestingStartTime = (address = '') => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'start_time',
    shouldFetch: !(address === ''),
  });
};

export const useVestingEndTime = (address = '') => {
  const { contractRpc } = useVestingEscrowContract(address);

  return useContractSWR({
    contract: contractRpc,
    method: 'end_time',
    shouldFetch: !(address === ''),
  });
};

export const useVestingCliff = (address = '') => {
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

export const useVestingPeriod = (address = '') => {
  const start = useVestingStartTime(address);
  const end = useVestingEndTime(address);
  const startTimestamp = start.data?.toNumber() || 0;
  const endTimestamp = end.data?.toNumber() || 0;

  const startInTime = startTimestamp * 1000;
  const endInTime = endTimestamp * 1000;

  const isLoading = start.initialLoading || end.initialLoading;

  return { startInTime, endInTime, isLoading };
};

export const useVestingClaim = (address = '') => {
  const { contractWeb3, account, chainId } = useVestingEscrowContract(address);

  return useCallback(
    async (amount: string, selectedAccount = account) => {
      if (!contractWeb3 || !selectedAccount || !chainId) return;

      await transaction('Claim', chainId, () =>
        contractWeb3['claim(address,uint256)'](
          selectedAccount,
          parseEther(amount),
        ),
      );
    },
    [account, chainId, contractWeb3],
  );
};
