import styled from 'styled-components';
import { H1 } from '@lidofinance/lido-ui';

export const MainTitle = styled(H1)`
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizesMap.xl}px;
  margin-bottom: 0.2em;
  line-height: 1.2em;
  text-align: center;

  &:empty {
    display: none;
  }
`;
