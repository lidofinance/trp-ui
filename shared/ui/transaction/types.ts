import { CHAINS } from 'config/chains';
import { FC, PropsWithChildren } from 'react';

export type TransactionToastComponent = FC<
  PropsWithChildren<{
    title: React.ReactNode;
  }>
>;

export type TransactionToastEtherscanComponent = FC<
  PropsWithChildren<{
    title: React.ReactNode;
    chainId: CHAINS;
    hash: string;
  }>
>;
