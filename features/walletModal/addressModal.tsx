import {
  Address,
  ButtonIcon,
  Modal,
  ModalProps,
  Identicon,
  External,
  Copy,
} from '@lidofinance/lido-ui';
import { useEtherscanOpen } from '@lido-sdk/react';
import { useCopyToClipboard } from 'shared/ui';
import { FC } from 'react';
import {
  WalletModalContentStyle,
  WalletModalAccountStyle,
  WalletModalAddressStyle,
  WalletModalActionsStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
} from './walletModalStyles';

export const AddressModal: FC<ModalProps> = (props) => {
  const { account } = props;

  const handleCopy = useCopyToClipboard(account ?? '');
  const handleEtherscan = useEtherscanOpen(account ?? '', 'address');

  return (
    <Modal title="Address" {...props}>
      <WalletModalContentStyle>
        <WalletModalConnectedStyle>
          <WalletModalConnectorStyle>
            For more information about address
          </WalletModalConnectorStyle>
        </WalletModalConnectedStyle>

        <WalletModalAccountStyle>
          <Identicon address={account ?? ''} />
          <WalletModalAddressStyle>
            <Address address={account ?? ''} symbols={6} />
          </WalletModalAddressStyle>
        </WalletModalAccountStyle>

        <WalletModalActionsStyle>
          <ButtonIcon
            onClick={handleCopy}
            icon={<Copy />}
            size="xs"
            variant="ghost"
          >
            Copy address
          </ButtonIcon>
          <ButtonIcon
            onClick={handleEtherscan}
            icon={<External />}
            size="xs"
            variant="ghost"
          >
            View on Etherscan
          </ButtonIcon>
        </WalletModalActionsStyle>
      </WalletModalContentStyle>
    </Modal>
  );
};
