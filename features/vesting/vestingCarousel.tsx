import { useAccountVestings } from 'features/vesting';
import { FC, ReactElement, useMemo } from 'react';
import { SwiperStyled, SwiperWrapper } from './vestingCarouselStyles';
import { SwiperSlide } from 'swiper/react';
import { cloneElement } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper';

export type VestingCarouselProps = {
  slide?: ReactElement;
};

export const VestingCarousel: FC<VestingCarouselProps> = ({ slide }) => {
  const { data: vestings } = useAccountVestings();
  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  return (
    <SwiperWrapper>
      <div className="swiper-button-prev-unique swiper-button-prev">
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 5.5L1 5.5"
            stroke="#B3BCC8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 10L1 5.5L5.5 1"
            stroke="#B3BCC8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="swiper-button-next-unique swiper-button-next">
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.5L13 5.5"
            stroke="#B3BCC8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 1L13 5.5L8.5 10"
            stroke="#B3BCC8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <SwiperStyled
        grabCursor={true}
        slidesPerView={'auto'}
        spaceBetween={16}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev-unique',
          nextEl: '.swiper-button-next-unique',
        }}
        modules={[Pagination, Navigation]}
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
    </SwiperWrapper>
  );
};
