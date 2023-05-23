import { VestingCardSlide, useAccountVestings } from 'features/vesting';
import { useCallback, useMemo, useState } from 'react';
import { Carousel } from 'shared/ui';

export const VestingCarousel = () => {
  const { data: vestings } = useAccountVestings();
  const [hiddenEscrows, setHiddenEscrows] = useState<string[]>([]);

  const vestingsView = useMemo(() => vestings?.slice()?.reverse(), [vestings]);

  const handleHide = useCallback((escrow: string) => {
    setHiddenEscrows((hiddenEscrows) => [...hiddenEscrows, escrow]);
  }, []);

  return (
    <Carousel>
      {vestingsView
        ?.filter(({ escrow }) => !hiddenEscrows.includes(escrow))
        .map((vesting) => (
          <VestingCardSlide
            key={vesting.escrow}
            vesting={vesting}
            onHide={handleHide}
          />
        ))}
    </Carousel>
  );
};
