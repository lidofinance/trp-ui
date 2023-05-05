import {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
  useReducer,
} from 'react';
import { useAccountVestings } from './hooks';
import { Vesting } from './types';

export const VestingsContext = createContext({} as VestingsValue);

export type VestingsValue = {
  activeVesting?: Vesting;
  setActiveVesting: (vesting: Vesting) => void;
  cacheIndex: number;
  resetCache: () => unknown;
};

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: vestings } = useAccountVestings();
  const [activeVesting, setActiveVesting] = useState<Vesting | undefined>(
    undefined,
  );
  const [cacheIndex, resetCache] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (activeVesting == null) {
      setActiveVesting(vestings?.at(-1));
    }
  }, [activeVesting, vestings]);

  return (
    <VestingsContext.Provider
      value={{
        activeVesting,
        setActiveVesting,
        cacheIndex,
        resetCache,
      }}
    >
      {children}
    </VestingsContext.Provider>
  );
};

export const useVestingsContext = (): VestingsValue =>
  useContext(VestingsContext);
