import { VestingCardSummary, useVestingsContext } from 'features/vesting';
import { useCallback, useMemo } from 'react';
import Swiper from 'swiper';
import { Carousel } from 'shared/ui';

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
    <Carousel onSlideChange={handleSlideChange}>
      {vestingsView?.map((vesting, index) => (
        <VestingCardSummary
          title="Available to vote"
          key={vesting.escrow}
          vesting={vesting}
          index={index}
        />
      ))}
    </Carousel>
  );
};
