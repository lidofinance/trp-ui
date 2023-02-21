import { useCallback, useMemo } from 'react';
import { contractHooksFactory } from '@lido-sdk/react';
import { useSDK, useContractSWR, useEthereumSWR } from '@lido-sdk/react';
import { useWeb3 } from 'reef-knot';
import { VestingEscrow__factory } from 'generated';
import { CHAINS } from '@lido-sdk/constants';
import { parseEther } from '@ethersproject/units';

import { transaction } from 'components/transaction';
import { getTokenNameByAddress } from 'config';

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

export const ONE_DAY_SLOTS_COUNT = 5 * 60 * 24;
export const ONE_WEEK_SLOTS_COUNT = ONE_DAY_SLOTS_COUNT * 7;
export const ONE_MONTH_SLOTS_COUNT = ONE_WEEK_SLOTS_COUNT * 4;

export const useVestingPeriod = (address: string) => {
  const start = useVestingStartTime(address);
  const end = useVestingEndTime(address);
  const startBlockNumber = start.data?.toNumber() || 0;
  const endBlockNumber = end.data?.toNumber() || 0;

  const currentBlock = useEthereumSWR({
    method: 'getBlockNumber',
  });
  const currentBlockNumber = currentBlock.data || 0;

  const startInFuture = startBlockNumber > currentBlockNumber;
  const endInFuture = endBlockNumber > currentBlockNumber;

  const startDelay = Math.abs(currentBlockNumber - startBlockNumber);
  const endDelay = Math.abs(currentBlockNumber - endBlockNumber);

  const now = Date.now();

  const startInTime = startInFuture
    ? now + startDelay * 12 * 1000
    : now - startDelay * 12 * 1000;
  const endInTime = endInFuture
    ? now + endDelay * 12 * 1000
    : now - endDelay * 12 * 1000;

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
