import { FC, useEffect } from 'react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { FormatToken } from 'shared/ui/formatToken';
import { WalletCardBalance } from 'features/wallet';
import {
  useVestingUnclaimed,
  useVestingToken,
  useVestingCliff,
} from 'features/vesting';
import { FormatDate } from 'shared/ui/formatDate';
import { TextStyled } from './wallet-unclaimed.style';
import { TokenToWallet } from './token-to-wallet';
import { useClaimingContext } from 'features/claim';

export const WalletUnclaimed: FC = () => {
  const { isClaiming } = useClaimingContext();
  const unclaimed = useVestingUnclaimed();
  const { address, symbol } = useVestingToken();
  const cliff = useVestingCliff();

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
              Cliff: <FormatDate timeStamp={cliff.data} month="short" />
            </TextStyled>
          </div>
        </>
      }
    />
  );
};
