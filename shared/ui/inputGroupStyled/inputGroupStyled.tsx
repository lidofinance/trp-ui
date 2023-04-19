import styled from 'styled-components';
import { InputGroup } from '@lidofinance/lido-ui';

export const InputGroupStyled = styled(InputGroup)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;

  span:nth-of-type(2) {
    // hack for tooltip
    z-index: 1;
  }
`;
