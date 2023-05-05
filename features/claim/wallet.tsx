import { InlineLoader } from '@lidofinance/lido-ui';
import { useWeb3 } from 'reef-knot';
import {
  useAccountVestings,
  useVestingsLocked,
  useVestingsUnclaimed,
  useVestingToken,
} from 'features/vesting';
import {
  AddressBadgeWrapper,
  SecondaryText,
  TokensAmount,
  AmountTitle,
} from './walletStyles';
import { FC, useMemo } from 'react';
import { AddressBadge, FormatToken, Main, TokenToWallet } from 'shared/ui';
import { MODAL, useModal } from 'features/walletModal';

export const Wallet: FC = () => {
  const { account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);
  const { data: vestings } = useAccountVestings();
  const { data: token, isLoading: tokenIsLoading } = useVestingToken();

  const escrows = useMemo(
    () => vestings?.map((vesting) => vesting.escrow),
    [vestings],
  );

  const { data: unclaimed, isLoading: unclaimedIsLoading } =
    useVestingsUnclaimed(escrows);
  const { data: locked, isLoading: lockedIsLoading } =
    useVestingsLocked(escrows);

  return (
    <Main.Wallet>
      <Main.Row style={{ alignItems: 'center' }}>
        {vestings == null ? (
          <InlineLoader />
        ) : (
          <div>You have {vestings.length} active programs</div>
        )}

        <AddressBadgeWrapper>
          <AddressBadge address={account} onClick={openModal} color="accent" />
        </AddressBadgeWrapper>
      </Main.Row>

      <Main.Divider />

      <Main.Row style={{ alignItems: 'top' }}>
        <Main.Column>
          <AmountTitle>
            Available to claim <SecondaryText>total</SecondaryText>
          </AmountTitle>

          <div>
            {unclaimedIsLoading || tokenIsLoading ? (
              <InlineLoader />
            ) : (
              <>
                <TokensAmount>
                  <FormatToken amount={unclaimed} symbol={token?.symbol} />
                </TokensAmount>
                &nbsp;
                <TokenToWallet address={token?.address} />
              </>
            )}
          </div>
        </Main.Column>

        <Main.Column>
          <AmountTitle>
            Locked <SecondaryText>total</SecondaryText>
          </AmountTitle>

          <div>
            <SecondaryText>
              {lockedIsLoading || tokenIsLoading ? (
                <InlineLoader />
              ) : (
                <>
                  <TokensAmount>
                    <FormatToken amount={locked} symbol={token?.symbol} />
                  </TokensAmount>
                  &nbsp;
                  <TokenToWallet address={token?.address} />
                </>
              )}
            </SecondaryText>
          </div>
        </Main.Column>
      </Main.Row>
    </Main.Wallet>
  );
};