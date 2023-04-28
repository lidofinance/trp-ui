import { ContainerProps } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren } from 'react';
import { MainStyle } from './mainStyles';

export const Main: FC<PropsWithChildren<ContainerProps>> = (props) => {
  return <MainStyle size="tight" forwardedAs="main" {...props} />;
};
