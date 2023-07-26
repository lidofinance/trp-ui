import { WalletConnectButton } from '@lidofinance/eth-ui-wallet-modal';
import { InputGroupStyled, InputNumber, Main } from 'shared/ui';

export const AragonFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputNumber fullwidth label="Vote ID" disabled />
      </InputGroupStyled>
      <WalletConnectButton fullwidth />
    </Main.Card>
  );
};
