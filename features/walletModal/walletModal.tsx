import {
  Address,
  ButtonIcon,
  Modal,
  ModalProps,
  Identicon,
  External,
  Copy,
} from '@lidofinance/lido-ui';
import { useEtherscanOpen, useSDK } from '@lido-sdk/react';
import { useConnectorInfo, useDisconnect } from 'reef-knot/web3-react';
import { useCopyToClipboard } from 'shared/ui';
import { FC, useCallback } from 'react';
import {
  WalletModalContentStyle,
  WalletModalConnectedStyle,
  WalletModalConnectorStyle,
  WalletModalDisconnectStyle,
  WalletModalAccountStyle,
  WalletModalAddressStyle,
  WalletModalActionsStyle,
} from './walletModalStyles';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';

export const WalletModal: FC<ModalProps> = (props) => {
  const { onClose } = props;
  const { account } = useSDK();
  const { providerName } = useConnectorInfo();
  const { disconnect } = useDisconnect();
  const { disconnect: wagmiDisconnect } = useDisconnectWagmi();

  const handleDisconnect = useCallback(() => {
    // disconnect wallets connected through web3-react connectors
    disconnect?.();
    // disconnect wallets connected through wagmi connectors
    wagmiDisconnect();

    onClose?.();
  }, [disconnect, wagmiDisconnect, onClose]);

  const handleCopy = useCopyToClipboard(account ?? '');
  const handleEtherscan = useEtherscanOpen(account ?? '', 'address');

  return (
    <Modal title="Account" {...props}>
      <WalletModalContentStyle>
        <WalletModalConnectedStyle>
          {providerName && (
            <WalletModalConnectorStyle>
              Connected with {providerName}
            </WalletModalConnectorStyle>
          )}

          {disconnect && (
            <WalletModalDisconnectStyle
              size="xs"
              variant="outlined"
              onClick={handleDisconnect}
            >
              Disconnect
            </WalletModalDisconnectStyle>
          )}
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
