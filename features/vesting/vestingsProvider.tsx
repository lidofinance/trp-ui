import {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useContext,
} from 'react';
import { Steth, Wsteth } from '@lidofinance/lido-ui';
import { TOKENS } from '@lido-sdk/constants';
import { useVestings } from 'features/vesting';
import { useWeb3 } from 'reef-knot';

export const VestingsContext = createContext({} as VestingsValue);

export const iconsMap = {
  [TOKENS.WSTETH]: <Wsteth />,
  [TOKENS.STETH]: <Steth />,
};

export type VestingsValue = {
  setVestingAddress: (vesting: string) => void;
} & (
  | {
      isLoading: false;
      vestingAddress: string;
      vestingsList: string[];
    }
  | {
      isLoading: false;
      vestingAddress: undefined;
      vestingsList: [];
    }
  | {
      isLoading: true;
      vestingAddress: undefined;
      vestingsList: undefined;
    }
);

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [vestingAddress, setVestingAddress] = useState<string>();
  const [vestingsList, setVestingsList] = useState<string[]>();
  const { active } = useWeb3();

  const { data, isLoading, error } = useVestings();

  useEffect(() => {
    if (isLoading) {
      setVestingAddress(undefined);
      setVestingsList(undefined);
      return;
    }

    if (!active || !data?.length) {
      setVestingAddress(undefined);
      setVestingsList([]);
      return;
    }
    setVestingAddress(data[data.length - 1].escrow);
    setVestingsList(data.map((vesting) => vesting.escrow));
  }, [active, isLoading, error, data]);

  const value = {
    isLoading,
    vestingAddress,
    setVestingAddress,
    vestingsList,
  };

  return (
    <VestingsContext.Provider value={value as VestingsValue}>
      {children}
    </VestingsContext.Provider>
  );
};

export const useVestingsContext = (): VestingsValue =>
  useContext(VestingsContext);
