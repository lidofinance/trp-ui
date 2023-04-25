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

export const VestingsContext = createContext({} as VestingsValue);

export type VestingsValue = {
  setEscrow: (vesting: string) => void;
  vestingContract: ReturnType<typeof useVestingEscrowContract>;
} & (
  | {
      isLoading: false;
      escrow: string | undefined;
      escrows: string[] | undefined;
    }
  | {
      isLoading: true;
      escrow: undefined;
      escrows: undefined;
    }
);

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useAccountVestings();
  const escrows = data?.map((vesting) => vesting.escrow);

  const [escrow, setEscrow] = useState<string | undefined>(undefined);

  const vestingCacheKey = `${escrow},${escrows?.join(',')}`;
  useEffect(() => {
    if (escrow == null) {
      // initial escrow is the latest one
      setEscrow(escrows?.[escrows.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vestingCacheKey]);

  const vestingContract = useVestingEscrowContract(escrow);

  return (
    <VestingsContext.Provider
      value={
        {
          escrow,
          setEscrow,
          vestingContract,
          escrows,
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
