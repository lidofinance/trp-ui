import { Button, Input } from '@lidofinance/lido-ui';
import { FC } from 'react';
import { InputGroupStyled, Main } from 'shared/ui';

export const ClaimFormError: FC<{ text?: string }> = ({ text }) => {
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
      <Button fullwidth disabled={true}>
        {text ?? 'Error'}
      </Button>
    </Main.Card>
  );
};
