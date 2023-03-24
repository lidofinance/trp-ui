import { IdenticonBadgeProps } from '@lidofinance/lido-ui';
import { Component } from 'shared/ui/components';

export type AddressBadgeComponent = Component<
  'div',
  Omit<IdenticonBadgeProps, 'address' | 'as'> & { address?: string | null }
>;
