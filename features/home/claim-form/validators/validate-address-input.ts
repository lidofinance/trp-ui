import { arrayify } from '@ethersproject/bytes';
import { keccak256 } from '@ethersproject/keccak256';

export const validateAddressInput = (
  address: string,
  { allowEmpty = true } = {},
): { error: string } | { error: null; ok: true } => {
  switch (true) {
    case address === '':
      return allowEmpty
        ? { error: null, ok: true }
        : { error: 'address is empty' };
    case !/^0x[0-9A-Fa-f]*$/.test(address):
      return { error: "this doesn't look like an address" };
    case /^(0x)?[0-9a-fA-F]{41,}$/.test(address):
      return { error: 'address is too long' };
    case /^(0x)?[0-9a-fA-F]{0,39}$/.test(address):
      return { error: 'address is too short' };
    case !/^(0x)?[0-9a-fA-F]{40}$/.test(address):
      return { error: 'something is wrong with your address' };
    case /([A-F].*[a-f])|([a-f].*[A-F])/.test(address) &&
      !verifyChecksumAddress(address):
      return { error: 'address has incorrect checksum' };
    default:
      return { error: null, ok: true };
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
