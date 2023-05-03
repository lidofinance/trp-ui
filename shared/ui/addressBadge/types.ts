import { IdenticonBadgeProps } from '@lidofinance/lido-ui';
import { Component } from 'shared/ui';

export type AddressBadgeComponent = Component<
  'div',
  Omit<IdenticonBadgeProps, 'address' | 'as'> & { address?: string | null }
>;
