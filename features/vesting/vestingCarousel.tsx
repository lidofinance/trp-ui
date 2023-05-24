import { useAccountVestings } from 'features/vesting';
import { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { SwiperStyled } from './vestingCarouselStyles';
import { SwiperSlide } from 'swiper/react';
import { cloneElement } from 'react';

export type VestingCarouselProps = {
  slide?: ReactElement;
};

export const VestingCarousel: FC<VestingCarouselProps> = ({ slide }) => {
  const { data: vestings } = useAccountVestings();
  const [hiddenEscrows, setHiddenEscrows] = useState<string[]>([]);

  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  const handleHide = useCallback((escrow: string) => {
    setHiddenEscrows((hiddenEscrows) => [...hiddenEscrows, escrow]);
  }, []);

  return (
    <SwiperStyled grabCursor={true} slidesPerView={'auto'} spaceBetween={16}>
      {vestingsView
        ?.filter(({ escrow }) => !hiddenEscrows.includes(escrow))
        .map((vesting) => (
          <SwiperSlide key={vesting.escrow}>
            {(props) =>
              slide != null &&
              cloneElement(slide, {
                vesting,
                onHide: handleHide,
                ...props,
              })
            }
          </SwiperSlide>
        ))}
    </SwiperStyled>
  );
};
