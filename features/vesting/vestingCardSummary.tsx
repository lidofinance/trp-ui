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
    const { data: unclaimed, isLoading: unclaimedIsLoading } =
      useVestingUnclaimed(vesting?.escrow);
    const { data: locked, isLoading: lockedIsLoading } = useVestingLocked(
      vesting?.escrow,
    );
    const { data: token, isLoading: tokenIsLoading } = useVestingToken();

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
                {unclaimedIsLoading || lockedIsLoading || tokenIsLoading ? (
                  <CustomLoader />
                ) : (
                  <FormatToken
                    amount={unclaimed?.add(locked ?? BigNumber.from(0))}
                    symbol={token?.symbol}
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
