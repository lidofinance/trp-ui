import { FC, PropsWithChildren } from 'react';
import {
  MainCard,
  MainColumn,
  MainDivider,
  MainWallet,
  MainRow,
} from './mainStyles';

type MainSubcomponents = {
  Wallet: typeof MainWallet;
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
Main.Card = MainCard;
Main.Row = MainRow;
Main.Column = MainColumn;
Main.Divider = MainDivider;
