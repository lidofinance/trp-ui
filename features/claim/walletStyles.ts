import { Block } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const Background = styled(Block)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  margin-bottom: ${({ theme }) => -theme.borderRadiusesMap.xl}px;

  padding-top: 0;
  padding-right: ${({ theme }) => theme.spaceMap.xxl}px;
  padding-bottom: ${({ theme }) => theme.borderRadiusesMap.xl}px;
  padding-left: ${({ theme }) => theme.spaceMap.xxl}px;

  background: radial-gradient(
      79% 79% at 23.39% 93.6%,
      #526fff 0%,
      rgba(92, 118, 243, 0) 100%
    ),
    linear-gradient(303.88deg, #514fc6 30.03%, #ff857c 94.79%);

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0;
    padding-right: ${({ theme }) => theme.spaceMap.lg}px;
    padding-bottom: ${({ theme }) => theme.borderRadiusesMap.xl}px;
    padding-left: ${({ theme }) => theme.spaceMap.lg}px;
  }
`;

export const Row = styled.div<{ $align?: string }>`
  display: flex;
  align-items: ${({ $align = 'normal' }) => $align};
  margin: ${({ theme }) => theme.spaceMap.xxl}px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: ${({ theme }) => theme.spaceMap.lg}px 0;
  }
`;

export const AddressBadgeWrapper = styled.div`
  margin-left: auto;
  cursor: pointer;
`;

export const Column = styled.div`
  flex: 1;
  flex-basis: 0;
  flex-shrink: 1;
`;

export const AmountTitle = styled.div`
  margin-bottom: 2px;
`;

export const SecondaryText = styled.span`
  opacity: 50%;
`;

export const TokensAmount = styled.span`
  font-size: ${({ theme }) => theme.fontSizesMap.sm}px;
  font-weight: 700;
`;
