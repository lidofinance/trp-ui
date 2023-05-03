import { AddressBadge } from 'shared/ui';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: scroll;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;

export const Card = styled.div`
  border-radius: 16px;
  padding: ${({ theme }) => theme.spaceMap.xl}px;
  min-width: 300px;
  width: 80%;
  background-color: var(--lido-color-backgroundSecondary);
  coursor: pointer;
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaceMap.xs}px;
`;

export const Index = styled.span`
  font-color: var(--lido-color-text-Secondary);
`;

export const Badge = styled(AddressBadge)`
  margin: 0;
  padding: 0;
`;

export const Address = styled.span`
  font-color: var(--lido-color-text-Secondary);
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
`;
