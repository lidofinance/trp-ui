import { Input, InputProps } from '@lidofinance/lido-ui';
import { forwardRef } from 'react';

export type InputAddressProps = InputProps;

export const InputAddress = forwardRef<HTMLInputElement, InputAddressProps>(
  ({ ...rest }, ref) => {
    return <Input ref={ref} placeholder="0x0" {...rest} />;
  },
);
InputAddress.displayName = 'InputAddress';
