import { useAccountVestings } from 'features/vesting';
import { FC, ReactElement, useMemo } from 'react';
import { SwiperStyled } from './vestingCarouselStyles';
import { SwiperSlide } from 'swiper/react';
import { cloneElement } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

export type VestingCarouselProps = {
  slide?: ReactElement;
};

export const VestingCarousel: FC<VestingCarouselProps> = ({ slide }) => {
  const { data: vestings } = useAccountVestings();
  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  return (
    <SwiperStyled
      grabCursor={true}
      slidesPerView={'auto'}
      spaceBetween={16}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      {vestingsView?.map((vesting) => (
        <SwiperSlide key={vesting.escrow}>
          {(props) =>
            slide != null &&
            cloneElement(slide, {
              vesting,
              ...props,
            })
          }
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
