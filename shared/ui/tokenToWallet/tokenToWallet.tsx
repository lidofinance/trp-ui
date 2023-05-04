import { Tooltip } from '@lidofinance/lido-ui';
import { useTokenToWallet } from '@lido-sdk/react';
import { TokenToWalletStyle } from './tokenToWalletStyles';
import { ComponentProps, FC } from 'react';

export type TokenToWalletProps = Omit<ComponentProps<'button'>, 'ref'> & {
  address: string;
};

export const TokenToWallet: FC<TokenToWalletProps> = (props) => {
  const { address, ...rest } = props;
  const { addToken } = useTokenToWallet(address);

  if (!addToken) return null;

  return (
    <Tooltip placement="bottomLeft" title="Add tokens to wallet">
      <TokenToWalletStyle tabIndex={-1} onClick={addToken} {...rest} />
    </Tooltip>
  );
};
