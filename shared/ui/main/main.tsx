import { FC, PropsWithChildren } from 'react';
import {
  MainCard,
  MainColumn,
  MainDivider,
  MainWallet,
  MainRow,
  ErrorWallet,
} from './mainStyles';

type MainSubcomponents = {
  Wallet: typeof MainWallet;
  ErrorWallet: typeof ErrorWallet;
  Card: typeof MainCard;
  Row: typeof MainRow;
  Column: typeof MainColumn;
  Divider: typeof MainDivider;
};

export const Main: FC<PropsWithChildren> & MainSubcomponents = ({
  children,
}) => {
  return <>{children}</>;
};

Main.Wallet = MainWallet;
Main.ErrorWallet = ErrorWallet;
Main.Card = MainCard;
Main.Row = MainRow;
Main.Column = MainColumn;
Main.Divider = MainDivider;
