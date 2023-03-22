import { Question, Tooltip } from '@lidofinance/lido-ui';
import AddressBadge from 'components/addressBadge/addressBadge';
import { WalletCardBalance } from 'components/walletCard';
import { FC } from 'react';

export type WalletVestingProps = {
  vestingAddress: string;
};

export const WalletVesting: FC<WalletVestingProps> = ({ vestingAddress }) => {
  return (
    <WalletCardBalance
      title={
        <>
          Program{' '}
          <Tooltip placement="bottom" title="Vesting program on etherscan">
            <Question />
          </Tooltip>
        </>
      }
      value={
        <a
          href={`https://etherscan.io/address/${vestingAddress}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <AddressBadge address={vestingAddress} />
        </a>
      }
    />
  );
};
