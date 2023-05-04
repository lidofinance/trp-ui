import { format } from 'date-fns';
import {
  useVestingCliff,
  useVestingEndTime,
  useVestingToken,
  useVestingUnclaimed,
  Vesting,
} from 'features/vesting';
import { FC, memo } from 'react';
import { FormatToken } from 'shared/ui';
import {
  Card,
  Header,
  Badge,
  Index,
  Address,
  Details,
  DetailsRow,
  DetailsColumn,
  DetailsHeader,
  DetailsValue,
} from './vestingCardStyles';

export type VestingCardProps = {
  index?: number;
  vesting?: Vesting;
};

const formatDate = (date: Date | undefined): string => {
  if (date == null) {
    return '-';
  }
  return format(date, 'd MMM y');
};

export const VestingCard: FC<VestingCardProps> = memo(({ index, vesting }) => {
  const unclaimedSWR = useVestingUnclaimed(vesting?.escrow);
  const lockedSWR = useVestingUnclaimed(vesting?.escrow);
  const endDateSWR = useVestingEndTime(vesting?.escrow);
  const cliffDateSWR = useVestingCliff(vesting?.escrow);
  const token = useVestingToken();

  if (vesting == null) {
    return null;
  }

  return (
    <Card>
      <Header>
        <Badge address={vesting.escrow} symbols={0} />
        {index != null && <Index>#{index + 1}</Index>}
        <Address>
          {vesting.escrow.slice(0, 4)}...{vesting.escrow.slice(-3)}
        </Address>
      </Header>

      <Details>
        <DetailsRow>
          <DetailsColumn $primary>
            <DetailsHeader>Available</DetailsHeader>
            <DetailsValue>
              <FormatToken amount={unclaimedSWR.data} symbol={token.symbol} />{' '}
            </DetailsValue>
          </DetailsColumn>

          <DetailsColumn>
            <DetailsHeader>Locked</DetailsHeader>
            <DetailsValue>
              <FormatToken amount={lockedSWR.data} symbol={token.symbol} />{' '}
            </DetailsValue>
          </DetailsColumn>
        </DetailsRow>

        <DetailsRow>
          <DetailsColumn>
            <DetailsHeader>End date</DetailsHeader>
            <DetailsValue>{formatDate(new Date(endDateSWR.data))}</DetailsValue>
          </DetailsColumn>

          <DetailsColumn $primary>
            <DetailsHeader>Cliff</DetailsHeader>
            <DetailsValue>
              {formatDate(new Date(cliffDateSWR.data))}
            </DetailsValue>
          </DetailsColumn>
        </DetailsRow>
      </Details>
    </Card>
  );
});
VestingCard.displayName = 'VestingCard';
