import { Component } from 'shared/ui';

export type TokenToWalletComponent = Component<
  'button',
  {
    address: string;
  }
>;
