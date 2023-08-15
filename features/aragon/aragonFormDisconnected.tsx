import { ConnectWalletButton } from '@lidofinance/eth-ui-wallet-modal';
import { InputGroupStyled, InputNumber, Main } from 'shared/ui';

export const AragonFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputNumber fullwidth label="Vote ID" disabled />
      </InputGroupStyled>
      <ConnectWalletButton fullwidth />
    </Main.Card>
  );
};
