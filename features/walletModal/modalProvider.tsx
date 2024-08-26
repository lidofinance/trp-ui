import {
  createContext,
  useMemo,
  useCallback,
  memo,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import { useThemeToggle } from '@lidofinance/lido-ui';
import { WalletsModalForEth } from 'reef-knot/connect-wallet-modal';
import { WalletModal } from './walletModal';
import { AddressModal } from '../addressModal';

export type ModalContextValue = {
  openModal: (modal: MODAL | string) => void;
  closeModal: () => void;
};

export enum MODAL {
  connect,
  wallet,
}

export const ModalContext = createContext({} as ModalContextValue);

export const ModalProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const [active, setActive] = useState<MODAL | string | null>(null);
  const { themeName } = useThemeToggle();

  const openModal = useCallback((modal: MODAL | string) => {
    setActive(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActive(null);
  }, []);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  const common = {
    onClose: closeModal,
    shouldInvertWalletIcon: themeName === 'dark',
  };
  return (
    <ModalContext.Provider value={value}>
      {children}
      <AddressModal
        open={`${active}`?.includes?.('0x')}
        account={active}
        {...common}
      />
      <WalletModal open={active === MODAL.wallet} {...common} />
      <WalletsModalForEth open={active === MODAL.connect} {...common} />
    </ModalContext.Provider>
  );
});
ModalProvider.displayName = 'ModalProvider';
