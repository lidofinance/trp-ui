import { FC, useMemo } from 'react';
import { useWeb3 } from 'reef-knot/web3-react';

import { InlineLoader } from '@lidofinance/lido-ui';
import { WALLET_MODAL, useModal } from '@lidofinance/eth-ui-wallet-modal';
import { FormatToken, TokenToWallet } from '@lidofinance/eth-ui-primitives';

import {
  useAccountVestings,
  useVestingsLocked,
  useVestingsUnclaimed,
  useVestingToken,
} from 'features/vesting';
import { AddressBadge, Main } from 'shared/ui';
import { useLdoPrice } from 'shared/lib/useLdoPrice';

import {
  AddressBadgeWrapper,
  SecondaryText,
  TokensAmount,
  AmountTitle,
} from './walletStyles';

export const Wallet: FC = () => {
  const { account } = useWeb3();
  const { openModal } = useModal(WALLET_MODAL.wallet);
  const { data: vestings } = useAccountVestings();
  const { data: token, isLoading: tokenIsLoading } = useVestingToken();

  const escrows = useMemo(
    () => vestings?.map((vesting) => vesting.escrow),
    [vestings],
  );

  const { data: unclaimed, isLoading: unclaimedIsLoading } =
    useVestingsUnclaimed(escrows);
  const {
    amountUsd: unclaimedAmountUsd,
    initialLoading: unclaimedAmountUsdLoading,
  } = useLdoPrice(unclaimed);

  const { data: locked, isLoading: lockedIsLoading } =
    useVestingsLocked(escrows);
  const { amountUsd: lockedAmountUsd, initialLoading: lockedAmountUsdLoading } =
    useLdoPrice(locked);

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
                <div>
                  <TokensAmount>
                    <FormatToken amount={unclaimed} symbol={token?.symbol} />
                  </TokensAmount>
                  &nbsp;
                  <TokenToWallet address={token?.address} />
                </div>
                <div>
                  {unclaimedAmountUsdLoading ? (
                    <InlineLoader />
                  ) : (
                    <>≈{unclaimedAmountUsd?.round(1).toString()} USD</>
                  )}
                </div>
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
                  <div>
                    <TokensAmount>
                      <FormatToken
                        amount={locked}
                        symbol={token?.symbol || ''}
                      />
                    </TokensAmount>
                    &nbsp;
                    <TokenToWallet address={token?.address || ''} />
                  </div>
                  <div>
                    {lockedAmountUsdLoading ? (
                      <InlineLoader />
                    ) : (
                      <>≈{lockedAmountUsd?.round(2).toString()} USD</>
                    )}
                  </div>
                </>
              )}
            </SecondaryText>
          </div>
        </Main.Column>
      </Main.Row>
    </Main.Wallet>
  );
};
