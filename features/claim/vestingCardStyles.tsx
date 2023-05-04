import { InlineLoader } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import styled from 'styled-components';

export const Card = styled.div`
  border-radius: 16px;
  padding: ${({ theme }) => theme.spaceMap.xl}px;
  background-color: var(--lido-color-backgroundSecondary);
  coursor: pointer;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => theme.spaceMap.md}px;
  }
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceMap.xs}px;
`;

export const Index = styled.span`
  color: var(--lido-color-text);
`;

export const Badge = styled(AddressBadge)`
  margin: 0;
  padding: 0;
`;

export const Address = styled.span`
  color: var(--lido-color-textSecondary);
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceMap.md}px;
`;

export const DetailsRow = styled.div`
  display: flex;
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
