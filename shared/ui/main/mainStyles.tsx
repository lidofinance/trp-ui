import { Block, Divider } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const MainWallet = styled(Block)`
  color: var(--lido-color-accentContrast);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  background: radial-gradient(
      79% 79% at 23.39% 93.6%,
      #526fff 0%,
      rgba(92, 118, 243, 0) 100%
    ),
    linear-gradient(303.88deg, #514fc6 30.03%, #ff857c 94.79%);

  margin-bottom: ${({ theme }) => -theme.borderRadiusesMap.xl}px;
  padding: ${({ theme }) => theme.spaceMap.xxl}px;
  padding-bottom: ${({ theme }) =>
    theme.spaceMap.xxl + theme.borderRadiusesMap.xl}px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spaceMap.lg}px;
    padding-bottom: ${({ theme }) =>
      theme.spaceMap.lg + theme.borderRadiusesMap.xl}px;
  }
`;

export const ErrorWallet = styled(MainWallet)`
  text-align: center;
  background: var(--lido-color-error);
  color: var(--lido-color-accentContrast);
  background-image: none !important;
`;

export const MainCard = styled(Block)`
  padding: ${({ theme }) => theme.spaceMap.lg}px;
  background: var(--lido-color-foreground);
  color: var(--lido-color-textSecondary);
`;

export const MainRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MainColumn = styled.div`
  flex: 1;
  flex-grow: 1;
  flex-basis: 0;
  padding-right: ${({ theme }) => theme.spaceMap.xs}px;
`;

export const MainDivider = styled(Divider)`
  margin: ${({ theme }) => theme.spaceMap.xxl}px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    margin: ${({ theme }) => theme.spaceMap.lg}px 0;
  }
`;
