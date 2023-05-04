import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  overflow-x: scroll;
`;

export const SwiperStyled = styled(Swiper)`
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;
