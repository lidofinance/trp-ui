import { BigNumber } from 'ethers';
import { Component } from 'shared/ui';

export type FormatTokenComponent = Component<
  'span',
  {
    symbol: string;
    amount?: BigNumber;
    approx?: boolean;
  }
>;
