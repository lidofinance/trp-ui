import { FallbackWalletStyle } from './fallbackWalletStyles';
import { useSupportedChains, useWeb3 } from '@reef-knot/web3-react';
import { CHAINS } from 'config/chains';
import { FC, useMemo } from 'react';
import { WalletProps } from '../wallet';

const useErrorMessage = (): string | undefined => {
  const { error } = useWeb3();
  const { isUnsupported, supportedChains } = useSupportedChains();

  const chains = useMemo(() => {
    const chains = supportedChains.map(
      ({ chainId, name }) => CHAINS[chainId] || name,
    );
    const lastChain = chains.pop();

    return [chains.join(', '), lastChain].filter((chain) => chain).join(' or ');
  }, [supportedChains]);

  if (isUnsupported) {
    return `Unsupported chain. Please switch to ${chains} in your wallet`;
  }

  return error?.message;
};

export type FallbackWalletProps = WalletProps;

export const FallbackWallet: FC<FallbackWalletProps> = (props) => {
  const error = useErrorMessage();

  if (error) {
    return <FallbackWalletStyle {...props}>{error}</FallbackWalletStyle>;
  }

  return null;
};
