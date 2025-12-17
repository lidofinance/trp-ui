import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

import invariant from 'tiny-invariant';
import {
  AddressValidationFile,
  validateAddressLocally,
} from './validateAddressLocally';
import { useApiAddressValidation, useSWRFetchQuery } from './hooks';
import { dynamics } from 'config';

const AddressValidationContext = createContext<{
  isValidAddress: boolean;
  setIsValidAddress: (show: boolean) => void;
  validateAddress: (address?: string) => Promise<boolean>;
}>({
  isValidAddress: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsValidAddress: () => {},
  validateAddress: async () => {
    return true;
  },
});
AddressValidationContext.displayName = 'AddressValidationContext';

export const useAddressValidation = () => {
  const value = useContext(AddressValidationContext);
  invariant(
    value !== null,
    'useAddressValidation was used used outside of AddressValidationProvider',
  );
  return value;
};

export const AddressValidationProvider = ({
  children,
  validationFile,
}: {
  children: ReactNode;
  validationFile?: AddressValidationFile;
}) => {
  const validateAddressAPI = useApiAddressValidation();
  const fetchSWRQuery = useSWRFetchQuery();
  const [isValidAddress, setIsValidAddress] = useState(true);

  // File validation query (works independently of API settings)
  const validateAddressFile = useCallback(
    async (addressToValidate: string) => {
      if (!validationFile) {
        return { isValid: true };
      }

      const result = await fetchSWRQuery<{ isValid: boolean }>(
        `address-validation-file-${addressToValidate}-${validationFile?.addresses?.length}-${validationFile?.isBroken}`,
        async () => {
          // If validation file is broken, consider all addresses invalid
          if (validationFile.isBroken) return { isValid: false };

          return validateAddressLocally(addressToValidate, validationFile);
        },
      );

      if (!result) {
        return { isValid: true };
      }

      return result;
    },
    [fetchSWRQuery, validationFile],
  );

  const validateAddress = useCallback(
    async (addressToValidate?: string) => {
      // If no address, consider valid
      if (!addressToValidate) {
        setIsValidAddress(true);

        return true;
      }

      // Case 1: API is enabled
      if (dynamics.addressApiValidationEnabled) {
        const apiResult = await validateAddressAPI(addressToValidate);

        // API responded successfully - use API result
        if (apiResult !== null && apiResult.isValid !== undefined) {
          setIsValidAddress(apiResult.isValid);

          return apiResult.isValid;
        }

        // API failed - fallback to file validation
        if (apiResult === null && validationFile) {
          const fileResult = await validateAddressFile(addressToValidate);
          setIsValidAddress(fileResult.isValid);

          return fileResult.isValid;
        }
      } else if (validationFile) {
        // Case 2: API is disabled - use file validation when available
        const fileResult = await validateAddressFile(addressToValidate);
        setIsValidAddress(fileResult.isValid);

        return fileResult.isValid;
      }

      // Default to valid if no validation data available
      setIsValidAddress(true);
      return true;
    },
    [validateAddressAPI, validateAddressFile, validationFile],
  );

  return (
    <AddressValidationContext.Provider
      value={{
        isValidAddress,
        setIsValidAddress,
        validateAddress,
      }}
    >
      {children}
    </AddressValidationContext.Provider>
  );
};
