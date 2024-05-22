import {
  useVestingDelegate,
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
import { AddressZero } from '@ethersproject/constants';
import { useModal } from '../walletModal';

export type VestingSummarySlideProps = {
  title?: string;
  vesting?: Vesting;
  isActive?: boolean;
  showDelegation?: boolean;
};

export const VestingSummarySlide: FC<VestingSummarySlideProps> = memo(
  ({ title = 'Avaialble', vesting, isActive, showDelegation }) => {
    const { setActiveVesting } = useVestingsContext();
    const { data: unclaimed, isLoading: unclaimedIsLoading } =
      useVestingUnclaimed(vesting?.escrow);
    const { data: locked, isLoading: lockedIsLoading } = useVestingLocked(
      vesting?.escrow,
    );
    const { data: delegate, isLoading: delegateIsLoading } = useVestingDelegate(
      vesting?.escrow,
    );
    const { data: token, isLoading: tokenIsLoading } = useVestingToken();
    const { openModal: openDelegateModal } = useModal(delegate || '');
    const { openModal: openEscrowModal } = useModal(vesting?.escrow || '');
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
      tokenIsLoading ||
      delegateIsLoading
    ) {
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
                <Badge
                  address={vesting.escrow}
                  title={vesting.escrow}
                  onClick={openEscrowModal}
                />
              </BadgeContainer>
            </Column>
          </Row>
          {showDelegation && (
            <Row style={{ alignItems: 'center', marginTop: '16px' }}>
              <Column $primary>
                <DetailsHeader>Delegated to</DetailsHeader>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                {delegate === AddressZero && 'Not delegated'}
                {delegate !== AddressZero && (
                  <BadgeContainer>
                    <Badge
                      address={delegate}
                      title={delegate}
                      onClick={openDelegateModal}
                    />
                  </BadgeContainer>
                )}
              </Column>
            </Row>
          )}
        </Details>
      </VestingSlide>
    );
  },
);
VestingSummarySlide.displayName = 'VestingSummarySlide';
