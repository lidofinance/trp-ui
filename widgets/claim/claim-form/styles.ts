import styled from 'styled-components';
import { InputGroup } from '@lidofinance/lido-ui';

export const InputGroupStyled = styled(InputGroup)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
  z-index: 2;
`;

export const NoProgramStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spaceMap.md}px;
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

export const LoaderWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spaceMap.md}px 0;
`;
