import {
  useVestingLocked,
  useVestingsContext,
  useVestingToken,
  useVestingUnclaimed,
  Vesting,
} from 'features/vesting';
import { FC, memo, useEffect } from 'react';
import { FormatToken } from 'shared/ui';
import {
  Badge,
  Details,
  Column,
  DetailsHeader,
  DetailsValue,
  CustomLoader,
  BadgeContainer,
  Row,
  VestingSlide,
} from './vestingSlideStyles';
import { BigNumber } from 'ethers';

export type VestingSummarySlideProps = {
  title?: string;
  vesting?: Vesting;
  isActive?: boolean;
};

export const VestingSummarySlide: FC<VestingSummarySlideProps> = memo(
  ({ title = 'Avaialble', vesting, isActive }) => {
    const { setActiveVesting } = useVestingsContext();
    const { data: unclaimed, isLoading: unclaimedIsLoading } =
      useVestingUnclaimed(vesting?.escrow);
    const { data: locked, isLoading: lockedIsLoading } = useVestingLocked(
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

    if (unclaimedIsLoading || lockedIsLoading || tokenIsLoading) {
      return (
        <VestingSlide>
          <Details>
            <Row style={{ alignItems: 'center' }}>
              <Column $primary>
                <DetailsHeader>{title}</DetailsHeader>
                <DetailsValue>
                  <CustomLoader />
                </DetailsValue>
              </Column>

              <Column>
                <BadgeContainer>
                  <CustomLoader />
                </BadgeContainer>
              </Column>
            </Row>
          </Details>
        </VestingSlide>
      );
    }

    return (
      <VestingSlide>
        <Details>
          <Row style={{ alignItems: 'center' }}>
            <Column $primary>
              <DetailsHeader>{title}</DetailsHeader>
              <DetailsValue>
                <FormatToken
                  amount={unclaimed?.add(locked ?? BigNumber.from(0))}
                  symbol={token?.symbol}
                />
              </DetailsValue>
            </Column>

            <Column>
              <BadgeContainer>
                <Badge address={vesting.escrow} title={vesting.escrow} />
              </BadgeContainer>
            </Column>
          </Row>
        </Details>
      </VestingSlide>
    );
  },
);
VestingSummarySlide.displayName = 'VestingSummarySlide';
