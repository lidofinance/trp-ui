import styled from 'styled-components';

export const CarouselCard = styled.div`
  border-radius: 16px;
  padding: ${({ theme }) => theme.spaceMap.xl}px;
  background-color: var(--lido-color-backgroundSecondary);
  coursor: pointer;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spaceMap.md}px;
  }
`;
