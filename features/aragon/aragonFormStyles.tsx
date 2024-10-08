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

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

export const LinkWrapper = styled.div<{ isHidden?: boolean }>`
  visibility: ${(props) => (props?.isHidden ? 'hidden' : 'visible')};
`;
