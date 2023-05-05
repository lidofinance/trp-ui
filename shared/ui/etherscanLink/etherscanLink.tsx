import { getEtherscanAddressLink } from '@lido-sdk/helpers';
import { useSDK } from '@lido-sdk/react';
import { Link } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren, memo, useMemo } from 'react';

export const EtherscanLink: FC<PropsWithChildren<{ address?: string }>> = memo(
  ({ address, children }) => {
    const { chainId } = useSDK();
    const etherscanLink = useMemo(
      () => (address != null ? getEtherscanAddressLink(chainId, address) : '#'),
      [chainId, address],
    );

    return <Link href={etherscanLink}>{children}</Link>;
  },
);
EtherscanLink.displayName = 'EtherscanLink';
