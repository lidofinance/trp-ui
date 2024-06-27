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
import { FormatToken } from 'shared/ui';
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
  VestingSlide,
  BadgeContainer,
} from './vestingSlideStyles';
import { useModal } from '../walletModal';
import { encodeAddress } from '../addressModal';

export type VestingDetailedSlideProps = {
  vesting?: Vesting;
  isActive?: boolean;
};

const formatDate = (date: Date | undefined): string => {
  if (date == null) {
    return '-';
  }
  return format(date, 'd MMM y');
};

export const VestingDetailedSlide: FC<VestingDetailedSlideProps> = memo(
  ({ vesting, isActive }) => {
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
    const { openModal: openEscrowModal } = useModal(
      encodeAddress(vesting?.escrow, 'trp'),
    );
    useEffect(() => {
      if (isActive && vesting != null) {
        setActiveVesting(vesting);
      }
    }, [isActive, setActiveVesting, vesting]);

    if (vesting == null) {
      return null;
    }

    if (
      unclaimedIsLoading ||
      lockedIsLoading ||
      endDateIsLoading ||
      cliffDateIsLoading ||
      tokenIsLoading
    ) {
      return (
        <VestingSlide>
          <Header>
            <CustomLoader />
          </Header>

          <Details>
            <Row>
              <Column $primary>
                <DetailsHeader>Available</DetailsHeader>
                <DetailsValue>
                  <CustomLoader />
                </DetailsValue>
              </Column>

              <Column>
                <DetailsHeader>Locked</DetailsHeader>
                <DetailsValue>
                  <CustomLoader />
                </DetailsValue>
              </Column>
            </Row>

            <Row>
              <Column>
                <DetailsHeader>End date</DetailsHeader>
                <DetailsValue>
                  <CustomLoader />
                </DetailsValue>
              </Column>

              <Column>
                <DetailsHeader>Cliff</DetailsHeader>
                <DetailsValue>
                  <CustomLoader />
                </DetailsValue>
              </Column>
            </Row>
          </Details>
        </VestingSlide>
      );
    }

    return (
      <VestingSlide>
        <Header title={vesting.escrow}>
          <BadgeContainer onClick={openEscrowModal}>
            <Badge address={vesting.escrow} symbols={0} />
            <Address>
              {vesting.escrow.slice(0, 6)}...{vesting.escrow.slice(-6)}
            </Address>
          </BadgeContainer>
        </Header>

        <Details>
          <Row>
            <Column $primary>
              <DetailsHeader>Available</DetailsHeader>
              <DetailsValue>
                <FormatToken amount={unclaimed} symbol={token?.symbol} />
              </DetailsValue>
            </Column>

            <Column>
              <DetailsHeader>Locked</DetailsHeader>
              <DetailsValue>
                <FormatToken amount={locked} symbol={token?.symbol} />
              </DetailsValue>
            </Column>
          </Row>

          <Row>
            <Column>
              <DetailsHeader>End date</DetailsHeader>
              <DetailsValue>{formatDate(new Date(endDate))}</DetailsValue>
            </Column>

            <Column
              $primary={!cliffDateIsLoading && !isPast(new Date(cliffDate))}
            >
              <DetailsHeader>Cliff</DetailsHeader>
              <DetailsValue>{formatDate(new Date(cliffDate))}</DetailsValue>
            </Column>
          </Row>
        </Details>
      </VestingSlide>
    );
  },
);
VestingDetailedSlide.displayName = 'VestingDetailedSlide';
