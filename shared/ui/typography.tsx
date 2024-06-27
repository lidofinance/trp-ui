import styled from 'styled-components';
import { H1 as H } from '@lidofinance/lido-ui';

export const H1 = styled(H)`
  font-size: ${({ theme }) => theme.fontSizesMap.xl}px;
`;
export const H4 = styled.h4`
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  font-weight: 500;
  color: var(--lido-color-textSecondary);
  line-height: 1.5em;
  text-align: center;
`;
