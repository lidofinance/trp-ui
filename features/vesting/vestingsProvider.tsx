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
  setCurrentVesting: (vesting: string) => void;
  vestingContract: ReturnType<typeof useVestingContract>;
} & (
  | {
      isLoading: false;
      currentVesting: string | undefined;
      vestings: string[] | undefined;
    }
  | {
      isLoading: true;
      currentVesting: undefined;
      vestings: undefined;
    }
);

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { vestings, isLoading } = useVestings();

  const [currentVesting, setCurrentVesting] = useState<string | undefined>(
    undefined,
  );

  const vestingCacheKey = `${currentVesting},${vestings?.join(',')}`;
  useEffect(() => {
    if (currentVesting == null) {
      setCurrentVesting(vestings?.[vestings.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vestingCacheKey]);

  const vestingContract = useVestingContract(currentVesting);

  return (
    <VestingsContext.Provider
      value={
        {
          currentVesting,
          setCurrentVesting,
          vestingContract,
          vestings,
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
