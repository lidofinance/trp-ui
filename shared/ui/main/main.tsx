import { FC, PropsWithChildren } from 'react';
import { MainStyle } from './mainStyles';

export const Main: FC<PropsWithChildren> = (props) => {
  return <MainStyle size="tight" forwardedAs="main" {...props} />;
};
