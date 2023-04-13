import { getEtherscanLink } from '@lido-sdk/helpers';
import { useSDK } from '@lido-sdk/react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui/addressBadge/addressBadge';
import { WalletCardBalance } from 'features/wallet';
import { FC } from 'react';
import { VestingAddressLink } from './wallet-vesting.style';

export type WalletVestingProps = {
  vestingAddress: string;
};

export const WalletVesting: FC<WalletVestingProps> = ({ vestingAddress }) => {
  const { chainId } = useSDK();

  if (chainId == null) {
    return null;
  }

  return (
    <WalletCardBalance
      title={
        <>
          Program{' '}
          <Tooltip placement="bottom" title="Program on etherscan">
            <Question />
          </Tooltip>
        </>
      }
      value={
        <VestingAddressLink
          href={getEtherscanLink(chainId, vestingAddress, 'address')}
          target="_blank"
          rel="noreferrer noopener"
        >
          <AddressBadge address={vestingAddress} color="accent" />
        </VestingAddressLink>
      }
    />
  );
};
