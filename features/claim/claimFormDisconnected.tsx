import { Button, Input } from '@lidofinance/lido-ui';
import { WalletConnect } from 'features/walletModal';
import { InputGroupStyled, Main } from 'shared/ui';

export const ClaimFormDisconnected = () => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <Input
          rightDecorator={
            <Button size="xxs" variant="translucent" disabled={true}>
              Max
            </Button>
          }
          fullwidth
          label="Token amount"
          disabled={true}
          placeholder="0"
        />
      </InputGroupStyled>
      <WalletConnect fullwidth />
    </Main.Card>
  );
};
