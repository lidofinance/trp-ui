import { BlockProps, Divider, InlineLoader } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import {
  useVestingLocked,
  useVestingsContext,
  useVestingToken,
  useVestingUnclaimed,
} from 'features/vesting';
import {
  AddressBadgeWrapper,
  Row,
  Background,
  Column,
  Secondary,
  TokensAmount,
  AmountTitle,
} from './wallet.style';
import { FC } from 'react';
import { AddressBadge, FormatToken, TokenToWallet } from 'shared/ui';
import { useModal } from '../useModal';
import { MODAL } from '../providers';
import { FallbackWallet } from '../fallbackWallet';

export type WalletProps = BlockProps;

export const Wallet: FC<WalletProps> = (props) => {
  const { active, account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);
  const { activeVesting, vestings } = useVestingsContext();
  const { address, symbol } = useVestingToken();
  const unclaimedSWR = useVestingUnclaimed(activeVesting?.escrow);
  const lockedSWR = useVestingLocked(activeVesting?.escrow);

  if (activeVesting == null || vestings == null || address == null) {
    return null;
  }

  if (!active) {
    return <FallbackWallet {...props} />;
  }

  return (
    <Background color="accent" {...props}>
      <Row>
        <div>You have {vestings.length} active programs</div>

        <AddressBadgeWrapper>
          <AddressBadge address={account} onClick={openModal} color="accent" />
        </AddressBadgeWrapper>
      </Row>

      <Divider />

      <Row>
        <Column>
          <AmountTitle>
            Available to claim <Secondary>total</Secondary>
          </AmountTitle>
          <div>
            {unclaimedSWR.initialLoading ? (
              <InlineLoader />
            ) : (
              <TokensAmount>
                <FormatToken amount={unclaimedSWR.data} symbol={symbol} />
              </TokensAmount>
            )}
            &nbsp;
            <TokenToWallet address={address} />
          </div>
        </Column>
        <Column>
          <AmountTitle>
            Locked <Secondary>total</Secondary>
          </AmountTitle>
          <div>
            <Secondary>
              {lockedSWR.initialLoading ? (
                <InlineLoader />
              ) : (
                <TokensAmount>
                  <FormatToken amount={lockedSWR.data} symbol={symbol} />
                </TokensAmount>
              )}
              &nbsp;
              <TokenToWallet address={address} />
            </Secondary>
          </div>
        </Column>
      </Row>
    </Background>
  );
};
