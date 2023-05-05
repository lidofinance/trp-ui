import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaceMap.md}px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: wrap;
  }
`;

export const VestingInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;
