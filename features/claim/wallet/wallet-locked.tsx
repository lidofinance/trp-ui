import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import FormatToken from 'components/formatToken';
import { WalletCardBalance } from 'components/walletCard';
import { useVestingLocked, useVestingToken } from 'hooks';
import { useClaimingContext } from '../providers';
import { TokenToWallet } from './token-to-wallet';

type WalletLockedProps = {
  vestingAddress: string;
};

const lockedTitle = (
  <>
    Locked{' '}
    {
      <Tooltip
        placement="bottom"
        title="Amount of the tokens currently locked in the escrow and not yet available for claim"
      >
        <Question />
      </Tooltip>
    }
  </>
);

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
      title={lockedTitle}
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
