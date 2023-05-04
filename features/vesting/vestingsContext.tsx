import {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { useVestingEscrowContract } from './contracts';
import { useAccountVestings } from './hooks';
import { Vesting } from './types';

export const VestingsContext = createContext({} as VestingsValue);

export type VestingsValue = {
  setActiveVesting: (vesting: Vesting) => void;
  vestingContract: ReturnType<typeof useVestingEscrowContract>;
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

  const vestingContract = useVestingEscrowContract(activeVesting?.escrow);

  return (
    <VestingsContext.Provider
      value={{
        activeVesting,
        setActiveVesting,
        vestingContract,
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
