import { useBreakpoint } from '@lidofinance/lido-ui';
import { IdenticonBadge, IdenticonBadgeProps } from '@lidofinance/lido-ui';
import styled from 'styled-components';
import { Component } from 'shared/ui/components';

export type AddressBadgeComponent = Component<
  'div',
  Omit<IdenticonBadgeProps, 'address' | 'as'> & { address?: string | null }
>;

export const AddressBadgeStyle = styled(IdenticonBadge)`
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  & > * {
    flex-shrink: 0;
  }

  & > :first-child {
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AddressBadge: AddressBadgeComponent = (props) => {
  const { address, ...rest } = props;
  const isMobile = useBreakpoint('md');

  return (
    <AddressBadgeStyle
      symbols={isMobile ? 3 : 6}
      address={address ?? ''}
      {...rest}
    />
  );
};
