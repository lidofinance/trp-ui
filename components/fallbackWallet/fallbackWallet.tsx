import { FallbackWalletComponent } from './types';
import { FallbackWalletStyle } from './fallbackWalletStyles';
import { useErrorMessage } from './useErrorMessage';

export const FallbackWallet: FallbackWalletComponent = (props) => {
  const error = useErrorMessage();

  if (error) {
    return <FallbackWalletStyle {...props}>{error}</FallbackWalletStyle>;
  }

  return null;
};
