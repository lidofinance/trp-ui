import {
  useVestingLocked,
  useVestingToken,
  useVestingUnclaimed,
  Vesting,
} from 'features/vesting';
import { FC, memo } from 'react';
import { CarouselCard, FormatToken } from 'shared/ui';
import {
  Badge,
  Index,
  Details,
  DetailsColumn,
  DetailsHeader,
  DetailsValue,
  CustomLoader,
  BadgeContainer,
} from './vestingCardStyles';
import { BigNumber } from 'ethers';

export type VestingCardProps = {
  index?: number;
  vesting?: Vesting;
};

export const VestingCard: FC<VestingCardProps> = memo(({ index, vesting }) => {
  const unclaimedSWR = useVestingUnclaimed(vesting?.escrow);
  const lockedSWR = useVestingLocked(vesting?.escrow);
  const tokenSWR = useVestingToken();

  if (vesting == null) {
    return null;
  }

  return (
    <CarouselCard>
      <Details>
        <DetailsColumn $primary>
          <DetailsHeader>Available to vote</DetailsHeader>
          <DetailsValue>
            {unclaimedSWR.isLoading || lockedSWR.isLoading ? (
              <CustomLoader />
            ) : (
              <FormatToken
                amount={unclaimedSWR.data?.add(
                  lockedSWR.data ?? BigNumber.from(0),
                )}
                symbol={tokenSWR.data?.symbol}
              />
            )}
          </DetailsValue>
        </DetailsColumn>

        <DetailsColumn>
          <BadgeContainer>
            {index != null && <Index>#{index + 1}</Index>}
            <Badge address={vesting.escrow} />
          </BadgeContainer>
        </DetailsColumn>
      </Details>
    </CarouselCard>
  );
});
VestingCard.displayName = 'VestingCard';
