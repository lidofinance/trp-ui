import { ContainerProps as _ContainerProps } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren } from 'react';
import { ContainerStyle } from './containerStyles';

export type ContainerProps = _ContainerProps;

export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
  return <ContainerStyle size="tight" forwardedAs="main" {...props} />;
};
