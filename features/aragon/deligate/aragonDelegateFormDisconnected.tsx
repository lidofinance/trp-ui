import { InputGroupStyled, Main, InputAddress } from 'shared/ui';
import { WalletConnect } from 'features/walletModal';

export const AragonDelegateFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputAddress fullwidth label="Delegate to" disabled />
      </InputGroupStyled>
      <WalletConnect fullwidth />
    </Main.Card>
  );
};
