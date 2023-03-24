import { Component } from 'shared/ui/components';

export type TokenToWalletComponent = Component<
  'button',
  {
    address: string;
  }
>;
