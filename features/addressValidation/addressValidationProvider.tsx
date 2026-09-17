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
import { getApiUrl } from './getApiUrl';
import { dynamics } from 'config';
import { useWeb3 } from 'reef-knot/web3-react';

const fetchValidationFile = async (): Promise<AddressValidationFile> => {
  try {
    const response = await fetch(getApiUrl('api/validation-file'), {
      method: 'GET',
    });
    if (!response.ok) {
      return { addresses: [], isBroken: true };
    }
    return await response.json();
  } catch {
    return { addresses: [], isBroken: true };
  }
};

const AddressValidationContext = createContext<{
  isValidAddress: boolean;
  setIsValidAddress: (show: boolean) => void;
  validateAddress: () => Promise<boolean>;
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
}: {
  children: ReactNode;
}) => {
  const validateAddressAPI = useApiAddressValidation();
  const fetchSWRQuery = useSWRFetchQuery();
  const [isValidAddress, setIsValidAddress] = useState(true);
  const { account } = useWeb3();

  // File validation query (works independently of API settings)
  const validateAddressFile = useCallback(
    async (addressToValidate: string) => {
      const validationFile = await fetchSWRQuery<AddressValidationFile>(
        'address-validation-file',
        fetchValidationFile,
      );

      // If validation file is broken or unreachable, consider all addresses invalid
      if (!validationFile || validationFile.isBroken) {
        return { isValid: false };
      }

      return validateAddressLocally(addressToValidate, validationFile);
    },
    [fetchSWRQuery],
  );

  const validateAddress = useCallback(async () => {
    const addressToValidate = account;

    // If no address, consider valid
    if (!addressToValidate) {
      setIsValidAddress(true);

      return true;
    }

    // If API is enabled
    if (dynamics.addressApiValidationEnabled) {
      const apiResult = await validateAddressAPI(addressToValidate);

      // API responded successfully - use API result
      if (apiResult !== null && apiResult.isValid !== undefined) {
        setIsValidAddress(apiResult.isValid);

        return apiResult.isValid;
      }
    }

    // If either API is disabled or not responding, fallback to local validation
    const fileResult = await validateAddressFile(addressToValidate);

    setIsValidAddress(fileResult.isValid);
    return fileResult.isValid;
  }, [validateAddressAPI, validateAddressFile, account]);

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
