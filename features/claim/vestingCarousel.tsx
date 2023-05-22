import {
  VestingCardDetailed,
  useAccountVestings,
  useVestingsContext,
} from 'features/vesting';
import { useCallback, useMemo } from 'react';
import Swiper from 'swiper';
import { Carousel } from 'shared/ui';

export const VestingCarousel = () => {
  const { setActiveVesting } = useVestingsContext();
  const { data: vestings } = useAccountVestings();

  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  const handleSlideChange = useCallback(
    (swiper: Swiper) => {
      if (vestingsView == null) {
        return;
      }
      const activeIndex = swiper.activeIndex;
      setActiveVesting(vestingsView[activeIndex]);
    },
    [vestingsView, setActiveVesting],
  );

  return (
    <Carousel onSlideChange={handleSlideChange}>
      {vestingsView?.map((vesting, index) => (
        <VestingCardDetailed
          key={vesting.escrow}
          vesting={vesting}
          index={index}
        />
      ))}
    </Carousel>
  );
};
