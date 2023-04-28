import { InputProps } from '@lidofinance/lido-ui';
import { forwardRef } from 'react';
import { InputStyled } from './style';

export type InputNumberProps = InputProps;

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref) => {
    return <InputStyled ref={ref} placeholder="0" type="number" {...props} />;
  },
);
InputNumber.displayName = 'InputNumber';
