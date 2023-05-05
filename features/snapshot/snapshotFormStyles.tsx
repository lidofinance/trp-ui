import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const VestingInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;
