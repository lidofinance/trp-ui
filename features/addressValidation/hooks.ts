import { useCallback } from 'react';
import { useWeb3 } from 'reef-knot/web3-react';
import { useSWRConfig } from 'swr';
import { getApiUrl } from './getApiUrl';

const ONE_MINUTE = 60_000;

type ValidationResult = { isValid: boolean };

const useSWRFetchQuery = () => {
  const { cache, mutate } = useSWRConfig();
  return useCallback(
    async <T>(key: string, fetcherFn: () => Promise<T>) => {
      const cached = cache.get(key) as
        | (T & { _ts?: number })
        | null
        | undefined;
      if (cached && cached._ts && Date.now() - cached._ts < ONE_MINUTE) {
        return cached;
      }
      const data = await mutate(
        key,
        async () => {
          const result = await fetcherFn();
          return { ...result, _ts: Date.now() };
        },
        {
          revalidate: false,
          populateCache: true,
        },
      );

      return data ?? null;
    },
    [cache, mutate],
  );
};

export const useApiAddressValidation = () => {
  const { chainId } = useWeb3();
  const fetchSWRQuery = useSWRFetchQuery();

  const validateAddressAPI = useCallback(
    async (addressToValidate: string): Promise<ValidationResult | null> => {
      if (!addressToValidate || chainId == null) return null;

      return fetchSWRQuery<ValidationResult>(
        `address-validation-api-${chainId}-${addressToValidate}`,
        async () => {
          try {
            const url = getApiUrl('api/validation', {
              address: addressToValidate,
            });
            const res = await fetch(url, {
              method: 'GET',
            });
            const data = await res.json();
            return { ...data, _ts: Date.now() };
          } catch {
            console.error({
              message: 'Address validation API request failed',
              address: addressToValidate,
              chainId,
            });
            return null;
          }
        },
      );
    },
    [chainId, fetchSWRQuery],
  );

  return validateAddressAPI;
};
