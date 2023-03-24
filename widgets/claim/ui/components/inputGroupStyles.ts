import { InputGroup } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const InputGroupStyled = styled(InputGroup)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
  z-index: 2;
`;
