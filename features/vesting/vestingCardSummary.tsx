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
  Column,
  DetailsHeader,
  DetailsValue,
  CustomLoader,
  BadgeContainer,
  Row,
} from './vestingCardStyles';
import { BigNumber } from 'ethers';

export type VestingCardSummaryProps = {
  title?: string;
  index?: number;
  vesting?: Vesting;
};

export const VestingCardSummary: FC<VestingCardSummaryProps> = memo(
  ({ title = 'Avaialble', index, vesting }) => {
    const unclaimedSWR = useVestingUnclaimed(vesting?.escrow);
    const lockedSWR = useVestingLocked(vesting?.escrow);
    const tokenSWR = useVestingToken();

    if (vesting == null) {
      return null;
    }

    return (
      <CarouselCard>
        <Details>
          <Row style={{ alignItems: 'center' }}>
            <Column $primary>
              <DetailsHeader>{title}</DetailsHeader>
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
            </Column>

            <Column>
              <BadgeContainer>
                {index != null && <Index>#{index + 1}</Index>}
                <Badge address={vesting.escrow} />
              </BadgeContainer>
            </Column>
          </Row>
        </Details>
      </CarouselCard>
    );
  },
);
VestingCardSummary.displayName = 'VestingCard';
