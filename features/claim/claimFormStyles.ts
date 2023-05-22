import styled from 'styled-components';

export const FormControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

export const NoProgramStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spaceMap.md}px;
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;
