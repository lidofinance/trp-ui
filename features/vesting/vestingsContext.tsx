import {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { useAccountVestings } from './hooks';
import { Vesting } from './types';

export const VestingsContext = createContext({} as VestingsValue);

export type VestingsValue = {
  setActiveVesting: (vesting: Vesting) => void;
  isLoading: boolean;
  activeVesting?: Vesting;
  vestings?: Vesting[];
};

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: vestings, isLoading } = useAccountVestings();

  const [activeVesting, setActiveVesting] = useState<Vesting | undefined>(
    undefined,
  );
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
        vestings,
        isLoading,
      }}
    >
      {children}
    </VestingsContext.Provider>
  );
};

export const useVestingsContext = (): VestingsValue =>
  useContext(VestingsContext);
