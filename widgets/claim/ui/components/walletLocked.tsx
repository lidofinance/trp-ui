import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { FormatToken } from 'shared/ui/formatToken';
import { WalletCardBalance } from 'widgets/walletCard';
import { useVestingLocked, useVestingToken } from '../hooks/useVestingContract';
import { useClaimingContext } from '../providers';
import { TokenToWallet } from './tokenToWallet';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletLocked: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { isClaiming } = useClaimingContext();
  const locked = useVestingLocked(vestingAddress);
  const { address, symbol } = useVestingToken(vestingAddress);

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
