import {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { useVestingContract, useVestings } from 'features/vesting';

export const VestingsContext = createContext({} as VestingsValue);

export type VestingsValue = {
  setVestingAddress: (vesting: string) => void;
  vestingContract: ReturnType<typeof useVestingContract>;
} & (
  | {
      isLoading: false;
      vestingAddress: string | undefined;
      vestingsList: string[] | undefined;
    }
  | {
      isLoading: true;
      vestingAddress: undefined;
      vestingsList: undefined;
    }
);

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { vestings, isLoading } = useVestings();

  const [vestingAddress, setVestingAddress] = useState<string | undefined>(
    undefined,
  );

  const vestingCacheKey = `${vestingAddress},${vestings?.join(',')}`;
  useEffect(() => {
    if (vestingAddress == null) {
      setVestingAddress(vestings?.[vestings.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vestingCacheKey]);

  const vestingContract = useVestingContract(vestingAddress);

  return (
    <VestingsContext.Provider
      value={
        {
          vestingAddress,
          setVestingAddress,
          vestingContract,
          vestingsList: vestings,
          isLoading,
        } as VestingsValue
      }
    >
      {children}
    </VestingsContext.Provider>
  );
};

export const useVestingsContext = (): VestingsValue =>
  useContext(VestingsContext);
