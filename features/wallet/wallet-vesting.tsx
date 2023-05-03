import { getEtherscanLink } from '@lido-sdk/helpers';
import { useSDK } from '@lido-sdk/react';
import { Question, Tooltip } from '@lidofinance/lido-ui';
import { AddressBadge } from 'shared/ui/addressBadge/addressBadge';
import { WalletCardBalance } from 'features/wallet';
import { FC } from 'react';
import { VestingAddressLink } from './wallet-vesting.style';
import { useVestingsContext } from 'features/vesting';

export const WalletVesting: FC = () => {
  const { activeVesting } = useVestingsContext();
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
          href={getEtherscanLink(
            chainId,
            activeVesting?.escrow ?? '',
            'address',
          )}
          target="_blank"
          rel="noreferrer noopener"
        >
          <AddressBadge address={activeVesting?.escrow} color="accent" />
        </VestingAddressLink>
      }
    />
  );
};
