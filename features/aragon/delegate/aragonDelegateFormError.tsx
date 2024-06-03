import { InputGroupStyled, Main, InputAddress } from 'shared/ui';
import { Button } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const AragonDelegateFormError: FC<{ text?: string }> = ({ text }) => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputAddress fullwidth label="Delegate to" disabled />
      </InputGroupStyled>

      <Button fullwidth type="submit" disabled={true}>
        {text ?? 'Error'}
      </Button>
    </Main.Card>
  );
};
