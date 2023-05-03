import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { FormatToken } from 'shared/ui/formatToken';
import { WalletCardBalance } from 'features/wallet';
import { useVestingLocked, useVestingToken } from 'features/vesting';
import { useClaimingContext } from 'features/claim';
import { TokenToWallet } from './token-to-wallet';

export const WalletLocked: FC = () => {
  const { isClaiming } = useClaimingContext();
  const locked = useVestingLocked();
  const { address, symbol } = useVestingToken();

  useEffect(() => {
    if (!isClaiming) locked.update();
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClaiming]);

  if (address == null) {
    return null;
  }

  return (
    <WalletCardBalance
      title={
        <>
          Locked{' '}
          <Tooltip
            placement="bottom"
            title="Amount of the tokens currently locked in the escrow and not yet available for claim"
          >
            <Question />
          </Tooltip>
        </>
      }
      loading={locked.initialLoading}
      value={
        <>
          <FormatToken amount={locked.data} symbol={symbol} />
          <TokenToWallet address={address} />
        </>
      }
    />
  );
};
