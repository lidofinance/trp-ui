import { format, isPast } from 'date-fns';
import {
  useVestingCliff,
  useVestingEndTime,
  useVestingLocked,
  useVestingsContext,
  useVestingToken,
  useVestingUnclaimed,
  Vesting,
} from 'features/vesting';
import { FC, memo, useEffect } from 'react';
import { CarouselCard, FormatToken } from 'shared/ui';
import {
  Header,
  Badge,
  Address,
  Details,
  Row,
  Column,
  DetailsHeader,
  DetailsValue,
  CustomLoader,
} from './vestingCardStyles';

export type VestingCardSlideProps = {
  vesting?: Vesting;
  isActive?: boolean;
  onHide?: (escrow: string) => unknown;
};

const formatDate = (date: Date | undefined): string => {
  if (date == null) {
    return '-';
  }
  return format(date, 'd MMM y');
};

export const VestingCardSlide: FC<VestingCardSlideProps> = memo(
  ({ vesting, isActive, onHide }) => {
    const { setActiveVesting } = useVestingsContext();
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

    useEffect(() => {
      if (isActive && vesting != null) {
        setActiveVesting(vesting);
      }
    }, [isActive, setActiveVesting, vesting]);

    if (vesting == null) {
      return null;
    }

    if (unclaimed?.isZero() && locked?.isZero()) {
      onHide?.(vesting.escrow);
      return null;
    }

    return (
      <CarouselCard>
        <Header>
          <Badge address={vesting.escrow} symbols={0} />
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
                  <FormatToken amount={unclaimed} symbol={token?.symbol} />
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
VestingCardSlide.displayName = 'VestingCard';
