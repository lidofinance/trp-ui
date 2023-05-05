import { InputGroupStyled, Main } from 'shared/ui';
import { WalletConnect } from 'features/walletModal';
import { InputAddress } from 'shared/ui';

export const SnapshotFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputAddress fullwidth label="Delegate to address" disabled />
      </InputGroupStyled>

      <WalletConnect fullwidth />
    </Main.Card>
  );
};
