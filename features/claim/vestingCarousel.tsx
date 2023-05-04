import { useVestingsContext } from 'features/vesting';
import { VestingCard } from './vestingCard';
import { SwiperSlide } from 'swiper/react';
import { SwiperStyled } from './vestingCarouselStyles';
import { useCallback, useMemo } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

export const VestingCarousel = () => {
  const { vestings, setActiveVesting } = useVestingsContext();

  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  const handleSlideChange = useCallback(
    (swiper: Swiper) => {
      const activeIndex = swiper.activeIndex;
      if (vestingsView == null) {
        return;
      }
      setActiveVesting(vestingsView[activeIndex]);
    },
    [vestingsView, setActiveVesting],
  );

  return (
    <SwiperStyled
      grabCursor={true}
      slidesPerView={'auto'}
      spaceBetween={16}
      onSlideChange={handleSlideChange}
    >
      {vestingsView?.map((vesting, index) => (
        <SwiperSlide key={vesting.escrow}>
          <VestingCard vesting={vesting} index={index} />
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
