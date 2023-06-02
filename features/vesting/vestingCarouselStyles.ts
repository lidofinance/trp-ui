import { Children } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Swiper } from 'swiper/react';

const multipleChildren = css`
  // Look at Main.Card component padding
  margin-right: ${({ theme }) => -theme.spaceMap.lg}px;

  .swiper-slide {
    width: 80%;
  }

  .swiper-slide:last-child {
    // Look at Main.Card component padding
    margin-right: ${({ theme }) => theme.spaceMap.lg}px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .swiper-slide {
      width: 90%;
    }
  }
`;

export const SwiperStyled = styled(Swiper)`
  .swiper-pagination {
    position: initial;
    margin-top: ${({ theme }) => theme.spaceMap.lg}px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .swiper-pagination {
      margin-top: ${({ theme }) => theme.spaceMap.md}px;
    }
  }

  .swiper-pagination-bullet {
    opacity: 1;
    background: var(--lido-color-backgroundSecondary);
  }

  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: var(--lido-color-text);
  }

  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
  }

  ${({ children }) =>
    Children.toArray(children).length !== 1 && multipleChildren}
`;

export const SwiperWrapper = styled.div`
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-sides-offset: -${({ theme }) => theme.spaceMap.xxl * 3}px;
    color: var(--lido-color-textSecondary);
    border: 1px solid var(--lido-color-textSecondary);
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    content: '';
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    .swiper-button-next,
    .swiper-button-prev {
      display: none;
    }
  }
`;
