import { format, isPast } from 'date-fns';
import {
  useVestingCliff,
  useVestingEndTime,
  useVestingLocked,
  useVestingToken,
  useVestingUnclaimed,
  Vesting,
} from 'features/vesting';
import { FC, memo } from 'react';
import { CarouselCard, FormatToken } from 'shared/ui';
import {
  Header,
  Badge,
  Index,
  Address,
  Details,
  Row,
  Column,
  DetailsHeader,
  DetailsValue,
  CustomLoader,
} from './vestingCardStyles';

export type VestingCardDetailsProps = {
  index?: number;
  vesting?: Vesting;
};

const formatDate = (date: Date | undefined): string => {
  if (date == null) {
    return '-';
  }
  return format(date, 'd MMM y');
};

export const VestingCardDetailed: FC<VestingCardDetailsProps> = memo(
  ({ index, vesting }) => {
    const { data: unclaimed, isLoading: unclaimedIsLoading } =
      useVestingUnclaimed(vesting?.escrow);
    const { data: locked, isLoading: lockedIsLoading } = useVestingLocked(
      vesting?.escrow,
    );
    const { data: endDate, isLoading: endDateIsLoading } = useVestingEndTime(
      vesting?.escrow,
    );
    const { data: cliffDate, isLoading: cliffDateIsLoading } = useVestingCliff(
      vesting?.escrow,
    );
    const { data: token, isLoading: tokenIsLoading } = useVestingToken();

    if (vesting == null) {
      return null;
    }

    return (
      <CarouselCard>
        <Header>
          <Badge address={vesting.escrow} symbols={0} />
          {index != null && <Index>#{index + 1}</Index>}
          <Address>
            {vesting.escrow.slice(0, 4)}...{vesting.escrow.slice(-3)}
          </Address>
        </Header>

        <Details>
          <Row>
            <Column $primary>
              <DetailsHeader>Available</DetailsHeader>
              <DetailsValue>
                {unclaimedIsLoading || tokenIsLoading ? (
                  <CustomLoader />
                ) : (
                  <FormatToken
                    amount={unclaimed}
                    symbol={token?.symbol}
                    approx
                  />
                )}
              </DetailsValue>
            </Column>

            <Column>
              <DetailsHeader>Locked</DetailsHeader>
              <DetailsValue>
                {lockedIsLoading || tokenIsLoading ? (
                  <CustomLoader />
                ) : (
                  <FormatToken amount={locked} symbol={token?.symbol} />
                )}
              </DetailsValue>
            </Column>
          </Row>

          <Row>
            <Column>
              <DetailsHeader>End date</DetailsHeader>
              <DetailsValue>
                {endDateIsLoading ? (
                  <CustomLoader />
                ) : (
                  formatDate(new Date(endDate))
                )}
              </DetailsValue>
            </Column>

            <Column
              $primary={!cliffDateIsLoading && !isPast(new Date(cliffDate))}
            >
              <DetailsHeader>Cliff</DetailsHeader>
              <DetailsValue>
                {cliffDateIsLoading ? (
                  <CustomLoader />
                ) : (
                  formatDate(new Date(cliffDate))
                )}
              </DetailsValue>
            </Column>
          </Row>
        </Details>
      </CarouselCard>
    );
  },
);
VestingCardDetailed.displayName = 'VestingCard';
