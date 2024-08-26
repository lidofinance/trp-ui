import { InputGroupStyled, InputNumber, Main } from 'shared/ui';
import { Button } from '@lidofinance/lido-ui';
import { FC } from 'react';

export const AragonVoteFormError: FC<{ text?: string }> = ({ text }) => {
  return (
    <Main.Card>
      <InputGroupStyled fullwidth>
        <InputNumber fullwidth label="Vote ID" disabled />
      </InputGroupStyled>

      <Button fullwidth type="submit" disabled={true}>
        {text ?? 'Error'}
      </Button>
    </Main.Card>
  );
};
