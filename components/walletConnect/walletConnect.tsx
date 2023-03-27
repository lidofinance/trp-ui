import { FC } from 'react';
import { Button, ButtonProps } from '@lidofinance/lido-ui';
import { useModal } from 'hooks';
import { MODAL } from 'providers';

export const WalletConnect: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { openModal } = useModal(MODAL.connect);

  return (
    <Button onClick={openModal} {...rest}>
      Connect wallet
    </Button>
  );
};
