import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { FormatToken } from 'shared/ui/formatToken';
import { WalletCardBalance } from 'widgets/walletCard';
import {
  useVestingUnclaimed,
  useVestingToken,
  useVestingCliff,
} from '../hooks/useVestingContract';
import { FormatDate } from 'shared/ui/formatDate';
import { TextStyled } from './walletUnclaimedStyle';
import { useClaimingContext } from '../providers';
import { TokenToWallet } from './tokenToWallet';

type WalletLockedProps = {
  vestingAddress: string;
};

export const WalletUnclaimed: FC<WalletLockedProps> = ({ vestingAddress }) => {
  const { isClaiming } = useClaimingContext();
  const unclaimed = useVestingUnclaimed(vestingAddress);
  const { address, symbol } = useVestingToken(vestingAddress);
  const cliff = useVestingCliff(vestingAddress);

  useEffect(() => {
    if (!isClaiming) unclaimed.update();
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
          Unclaimed{' '}
          <Tooltip
            placement="bottom"
            title="Amount of the tokens on the escrow balance available for claim at the moment"
          >
            <Question />
          </Tooltip>
        </>
      }
      loading={unclaimed.initialLoading}
      value={
        <>
          <div>
            <FormatToken amount={unclaimed.data} symbol={symbol} />{' '}
            <TokenToWallet address={address} />
          </div>
          <div>
            <TextStyled size={'xxs'}>
              Cliff: <FormatDate timeStamp={cliff.cliffInTime} month="short" />
            </TextStyled>
          </div>
        </>
      }
    />
  );
};
