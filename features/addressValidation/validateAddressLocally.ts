export interface AddressValidationFile {
  addresses: string[];
  isBroken?: boolean;
}

export const validateAddressLocally = (
  address: string,
  validationFile: AddressValidationFile,
): { isValid: boolean } => {
  if (!address) return { isValid: true };

  const normalizedAddress = address.toLowerCase();

  const isNotValid = validationFile.addresses.some(
    (addr) => addr.toLowerCase() === normalizedAddress,
  );

  return {
    isValid: !isNotValid,
  };
};
