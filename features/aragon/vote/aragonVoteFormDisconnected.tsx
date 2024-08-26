import { InputGroupStyled, InputNumber, Main } from 'shared/ui';
import { WalletConnect } from 'features/walletModal';

export const AragonVoteFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputNumber fullwidth label="Vote ID" disabled />
      </InputGroupStyled>
      <WalletConnect fullwidth />
    </Main.Card>
  );
};
