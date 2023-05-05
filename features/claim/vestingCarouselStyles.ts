import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const SwiperStyled = styled(Swiper)`
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
  // Look at ClaimBlock component padding
  margin-right: -${({ theme }) => theme.spaceMap.lg}px;

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
