import styled from 'styled-components';

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
