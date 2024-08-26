import {
  useAragonDelegateAddress,
  useSnapshotDelegateAddress,
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
  EnsName,
} from './vestingSlideStyles';
import { BigNumber } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { useModal } from '../walletModal';
import { encodeAddress } from '../addressModal';
import { useENS } from '../addressModal';
import { InlineLoader } from '@lidofinance/lido-ui';

export type VestingSummarySlideProps = {
  title?: string;
  vesting?: Vesting;
  isActive?: boolean;
  showDelegation?: 'snapshot' | 'aragon';
};

export const VestingSummarySlide: FC<VestingSummarySlideProps> = memo(
  ({ title = 'Avaialble', vesting, isActive, showDelegation }) => {
    const { setActiveVesting } = useVestingsContext();
    const { data: unclaimed, isLoading: unclaimedIsLoading } =
      useVestingUnclaimed(vesting?.escrow);
    const { data: locked, isLoading: lockedIsLoading } = useVestingLocked(
      vesting?.escrow,
    );
    const { data: aragonDelegate, isLoading: aragonDelegateIsLoading } =
      useAragonDelegateAddress(vesting?.escrow);
    const { data: snapshotDelegate, isLoading: snapshotDelegateIsLoading } =
      useSnapshotDelegateAddress(vesting?.escrow);
    const { data: ensName, isLoading: ensNameIsLoading } =
      useENS(aragonDelegate);
    const { data: token, isLoading: tokenIsLoading } = useVestingToken();
    const { openModal: openDelegateModal } = useModal(
      encodeAddress(aragonDelegate, 'delegate'),
    );
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

    const delegate =
      showDelegation === 'snapshot' ? snapshotDelegate : aragonDelegate;

    if (
      unclaimedIsLoading ||
      lockedIsLoading ||
      tokenIsLoading ||
      snapshotDelegateIsLoading ||
      aragonDelegateIsLoading
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
                {delegate === AddressZero ? (
                  'Not delegated'
                ) : (
                  <BadgeContainer>
                    {ensNameIsLoading ? (
                      <InlineLoader />
                    ) : !ensName ? (
                      <Badge
                        address={delegate}
                        title={delegate}
                        onClick={openDelegateModal}
                      />
                    ) : (
                      <EnsName onClick={openDelegateModal}>{ensName}</EnsName>
                    )}
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
