import { format } from 'date-fns';
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
    const unclaimedSWR = useVestingUnclaimed(vesting?.escrow);
    const lockedSWR = useVestingLocked(vesting?.escrow);
    const endDateSWR = useVestingEndTime(vesting?.escrow);
    const cliffDateSWR = useVestingCliff(vesting?.escrow);
    const tokenSWR = useVestingToken();

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
                {unclaimedSWR.isLoading ? (
                  <CustomLoader />
                ) : (
                  <FormatToken
                    amount={unclaimedSWR.data}
                    symbol={tokenSWR.data?.symbol}
                  />
                )}
              </DetailsValue>
            </Column>

            <Column>
              <DetailsHeader>Locked</DetailsHeader>
              <DetailsValue>
                {lockedSWR.isLoading ? (
                  <CustomLoader />
                ) : (
                  <FormatToken
                    amount={lockedSWR.data}
                    symbol={tokenSWR.data?.symbol}
                  />
                )}
              </DetailsValue>
            </Column>
          </Row>

          <Row>
            <Column>
              <DetailsHeader>End date</DetailsHeader>
              <DetailsValue>
                {endDateSWR.isLoading ? (
                  <CustomLoader />
                ) : (
                  formatDate(new Date(endDateSWR.data))
                )}
              </DetailsValue>
            </Column>

            <Column $primary>
              <DetailsHeader>Cliff</DetailsHeader>
              <DetailsValue>
                {cliffDateSWR.isLoading ? (
                  <CustomLoader />
                ) : (
                  formatDate(new Date(cliffDateSWR.data))
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
