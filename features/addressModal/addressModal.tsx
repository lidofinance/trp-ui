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
} from './addressModalStyles';
import { useENS } from './hooks';

export const encodeAddress = (address?: string, type?: 'trp' | 'delegate') =>
  address ? `${address}:${type}` : '';
export const decodeAddress = (string: string) => `${string || ''}`.split(':');

const titles: Record<string, string> = {
  trp: 'TRP program',
  delegate: 'Your Delegate',
};

const info: Record<string, string> = {
  trp: 'program',
};

export const AddressModal: FC<ModalProps> = (props) => {
  const { account } = props;

  const [address, type] = decodeAddress(account);

  const handleCopy = useCopyToClipboard(address ?? '');
  const handleEtherscan = useEtherscanOpen(address ?? '', 'address');

  const { data: ensName, isLoading } = useENS(address);

  return (
    <Modal title={titles[type] || 'Address'} {...props}>
      <div>
        <AddressModalAccountStyle>
          <Identicon address={address ?? ''} />
          <AddressModalAddressStyle>
            {isLoading ? (
              <InlineLoader />
            ) : ensName ? (
              <AddressModalAddressStyle>{ensName}</AddressModalAddressStyle>
            ) : (
              <Address address={(address ?? '').toLowerCase()} symbols={22} />
            )}
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
            View {info[type] ? `${info[type]} ` : ''}on Etherscan
          </ButtonIcon>
        </AddressModalActionsStyle>
      </div>
    </Modal>
  );
};
