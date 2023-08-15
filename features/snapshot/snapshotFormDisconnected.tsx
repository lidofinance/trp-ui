import { ConnectWalletButton } from '@lidofinance/eth-ui-wallet-modal';

import { InputGroupStyled, Main } from 'shared/ui';
import { InputAddress } from 'shared/ui';

export const SnapshotFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputAddress fullwidth label="Delegate to address" disabled />
      </InputGroupStyled>

      <ConnectWalletButton fullwidth />
    </Main.Card>
  );
};
