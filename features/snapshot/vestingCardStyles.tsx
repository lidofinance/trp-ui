import { InlineLoader } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import styled from 'styled-components';

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Index = styled.span`
  color: var(--lido-color-text);
`;

export const Badge = styled(AddressBadge)`
  margin: 0;
  padding: 0;
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceMap.md}px;
`;

export const DetailsColumn = styled.div<{ $primary?: boolean }>`
  color: ${({ $primary = false }) =>
    $primary ? 'var(--lido-color-text)' : 'var(--lido-color-textSecondary)'};
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
`;

export const DetailsHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
`;

export const DetailsValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  font-weight: 700;
  padding-right: ${({ theme }) => theme.fontSizesMap.xxxs}px;
`;

export const CustomLoader = styled(InlineLoader)`
  max-width: 60%;
`;
