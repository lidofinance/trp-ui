import { getEtherscanLink } from '@lido-sdk/helpers';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import AddressBadge from 'components/addressBadge/addressBadge';
import { WalletCardBalance } from 'components/walletCard';
import { FC } from 'react';
import { useWeb3 } from 'reef-knot';

export type WalletVestingProps = {
  vestingAddress: string;
};

export const WalletVesting: FC<WalletVestingProps> = ({ vestingAddress }) => {
  const { chainId } = useWeb3();

  if (chainId == null) {
    return null;
  }

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
          href={getEtherscanLink(chainId, vestingAddress, 'address')}
          target="_blank"
          rel="noreferrer noopener"
        >
          <AddressBadge address={vestingAddress} />
        </a>
      }
    />
  );
};
