import { InlineLoader } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui';
import styled from 'styled-components';

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceMap.xs}px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

export const Badge = styled(AddressBadge)`
  margin: 0;
  padding: 0;
`;

export const EnsName = styled.div`
  margin: 0;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 250px;
  white-space: nowrap;
`;

export const Address = styled.span`
  margin-left: ${({ theme }) => theme.spaceMap.sm}px;
  color: var(--lido-color-textSecondary);
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaceMap.md}px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div<{ $primary?: boolean }>`
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

export const VestingSlide = styled.div`
  border-radius: 16px;
  padding: ${({ theme }) => theme.spaceMap.xl}px;
  background-color: var(--lido-color-backgroundSecondary);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spaceMap.md}px;
  }
`;
