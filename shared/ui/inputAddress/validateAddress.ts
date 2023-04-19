import { arrayify } from '@ethersproject/bytes';
import { keccak256 } from '@ethersproject/keccak256';

export const addressValidator =
  (allowEmpty?: boolean) =>
  (address: string): true | string => {
    switch (true) {
      case address === '':
        return allowEmpty ? true : 'Address is empty';
      case !/^0x[0-9A-Fa-f]*$/.test(address):
        return "This doesn't look like an address";
      case /^(0x)?[0-9a-fA-F]{41,}$/.test(address):
        return 'Address is too long';
      case /^(0x)?[0-9a-fA-F]{0,39}$/.test(address):
        return 'Address is too short';
      case !/^(0x)?[0-9a-fA-F]{40}$/.test(address):
        return 'Something is wrong with your address';
      case /([A-F].*[a-f])|([a-f].*[A-F])/.test(address) &&
        !verifyChecksumAddress(address):
        return 'Address has incorrect checksum';
      default:
        return true;
    }
  };

const verifyChecksumAddress = (addressInput: string): boolean => {
  const address = addressInput.startsWith('0x')
    ? addressInput
    : `0x${addressInput}`;
  const chars = address.toLowerCase().substring(2).split('');

  const expanded = new Uint8Array(40);
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0);
  }

  const hashed = arrayify(keccak256(expanded));

  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }

  return `0x${chars.join('')}` === address;
};
