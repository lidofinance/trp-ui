import { BlockProps, InlineLoader } from '@lidofinance/lido-ui';
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
import { FallbackWallet } from './fallbackWallet';
import { MODAL, useModal } from 'features/walletModal';

export type WalletProps = BlockProps;

export const Wallet: FC<WalletProps> = (props) => {
  const { active, account } = useWeb3();
  const { openModal } = useModal(MODAL.wallet);
  const { data: vestings } = useAccountVestings();
  const tokenSWR = useVestingToken();

  const escrows = useMemo(
    () => vestings?.map((vesting) => vesting.escrow),
    [vestings],
  );

  const unclaimedSWR = useVestingsUnclaimed(escrows);
  const lockedSWR = useVestingsLocked(escrows);

  if (!active) {
    return <FallbackWallet {...props} />;
  }

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
            {unclaimedSWR.isLoading || tokenSWR.isLoading ? (
              <InlineLoader />
            ) : (
              <>
                <TokensAmount>
                  <FormatToken
                    amount={unclaimedSWR.data}
                    symbol={tokenSWR.data?.symbol}
                  />
                </TokensAmount>
                &nbsp;
                <TokenToWallet address={tokenSWR.data?.address} />
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
              {lockedSWR.isLoading || tokenSWR.isLoading ? (
                <InlineLoader />
              ) : (
                <>
                  <TokensAmount>
                    <FormatToken
                      amount={lockedSWR.data}
                      symbol={tokenSWR.data?.symbol}
                    />
                  </TokensAmount>
                  &nbsp;
                  <TokenToWallet address={tokenSWR.data?.address} />
                </>
              )}
            </SecondaryText>
          </div>
        </Main.Column>
      </Main.Row>
    </Main.Wallet>
  );
};
