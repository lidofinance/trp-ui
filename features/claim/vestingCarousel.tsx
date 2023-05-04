import { useVestingsContext } from 'features/vesting';
import { VestingCard } from './vestingCard';
import { SwiperSlide } from 'swiper/react';
import { SwiperStyled } from './vestingCarouselStyles';
import { useCallback } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export const VestingCarousel = () => {
  const { vestings, setActiveVesting } = useVestingsContext();

  const handleSlideChange = useCallback(
    (swiper: Swiper) => {
      const activeIndex = swiper.activeIndex;
      if (vestings == null) {
        return;
      }
      setActiveVesting(vestings[activeIndex]);
    },
    [vestings, setActiveVesting],
  );

  return (
    <SwiperStyled
      grabCursor={true}
      slidesPerView={'auto'}
      spaceBetween={16}
      onSlideChange={handleSlideChange}
    >
      {vestings?.map((vesting, index) => (
        <SwiperSlide key={vesting.escrow} style={{ width: '80%' }}>
          <VestingCard vesting={vesting} index={index} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
