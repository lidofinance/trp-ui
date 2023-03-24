import { BigNumber } from 'ethers';
import { Component } from 'shared/ui/components';

export type FormatTokenComponent = Component<
  'span',
  {
    symbol: string;
    amount?: BigNumber;
    approx?: boolean;
  }
>;
