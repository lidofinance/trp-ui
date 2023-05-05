import styled from 'styled-components';
import { H1 } from '@lidofinance/lido-ui';

export const PageTitle = styled(H1)`
  font-weight: 700;
  font-style: normal;
  font-size: ${({ theme }) => theme.fontSizesMap.xl}px;
  margin-bottom: ${({ theme }) => theme.spaceMap.xs}px;
  line-height: 1.2em;
  text-align: center;
`;
