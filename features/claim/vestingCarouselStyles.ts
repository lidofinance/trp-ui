import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const SwiperStyled = styled(Swiper)`
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;

  .swiper-slide {
    width: 80%;
  }

  .swiper-slide:only-child {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .swiper-slide {
      width: 90%;
    }
  }
`;
