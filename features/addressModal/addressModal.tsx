import {
  Address,
  ButtonIcon,
  Copy,
  External,
  Identicon,
  InlineLoader,
  Modal,
  ModalProps,
} from '@lidofinance/lido-ui';
import { useEtherscanOpen } from '@lido-sdk/react';
import { useCopyToClipboard } from 'shared/ui';
import { FC } from 'react';
import {
  AddressModalAccountStyle,
  AddressModalActionsStyle,
  AddressModalAddressStyle,
  AddressModalConnectedStyle,
  AddressModalConnectorStyle,
  AddressModalContentStyle,
  AddressModalENSNameStyle,
} from './addressModalStyles';
import { useENS } from './hooks';

export const AddressModal: FC<ModalProps> = (props) => {
  const { account } = props;

  const handleCopy = useCopyToClipboard(account ?? '');
  const handleEtherscan = useEtherscanOpen(account ?? '', 'address');

  const { data: ensName, isLoading } = useENS(account);

  const prefix = ensName ? `ENS name is` : 'No ENS name';
  return (
    <Modal title="" {...props}>
      <div>
        <AddressModalContentStyle>
          <AddressModalConnectedStyle>
            <AddressModalConnectorStyle>
              {isLoading ? <InlineLoader /> : prefix}
              {ensName && (
                <AddressModalENSNameStyle>{ensName}</AddressModalENSNameStyle>
              )}
            </AddressModalConnectorStyle>
          </AddressModalConnectedStyle>

          <AddressModalAccountStyle>
            <Identicon address={account ?? ''} />
            <AddressModalAddressStyle>
              <Address address={account ?? ''} symbols={22} />
            </AddressModalAddressStyle>
          </AddressModalAccountStyle>

          <AddressModalActionsStyle>
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
          </AddressModalActionsStyle>
        </AddressModalContentStyle>
      </div>
    </Modal>
  );
};
