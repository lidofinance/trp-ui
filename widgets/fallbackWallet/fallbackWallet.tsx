import { useErrorMessage } from './useErrorMessage';
import { WalletCard } from 'widgets/walletCard';
import styled from 'styled-components';
import { WalletCardComponent } from 'widgets/walletCard';

export const FallbackWalletStyle = styled(WalletCard)`
  text-align: center;
  background: var(--lido-color-error);
  background-image: none !important;
`;

export type FallbackWalletComponent = WalletCardComponent;

const FallbackWallet: FallbackWalletComponent = (props) => {
  const error = useErrorMessage();

  if (error) {
    return <FallbackWalletStyle {...props}>{error}</FallbackWalletStyle>;
  }

  return null;
};

export default FallbackWallet;
