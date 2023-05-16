import { FC, PropsWithChildren } from 'react';
import {
  MainCard,
  MainColumn,
  MainDivider,
  MainWallet,
  MainRow,
  ErrorWallet,
} from './mainStyles';

const MainComponent: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export const Main = Object.assign(MainComponent, {
  Wallet: MainWallet,
  ErrorWallet: ErrorWallet,
  Card: MainCard,
  Row: MainRow,
  Column: MainColumn,
  Divider: MainDivider,
});
