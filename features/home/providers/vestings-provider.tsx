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

import { useVestings } from 'hooks';
import { useWeb3 } from 'reef-knot';

export const VestingsContext = createContext({} as VestingsValue);

export const iconsMap = {
  [TOKENS.WSTETH]: <Wsteth />,
  [TOKENS.STETH]: <Steth />,
};

export type VestingsValue = {
  setCurrentVesting: (vesting: string) => void;
} & (
  | {
      isVestingsLoading: false;
      currentVesting: string;
      vestings: string[];
    }
  | {
      isVestingsLoading: false;
      currentVesting: undefined;
      vestings: [];
    }
  | {
      isVestingsLoading: true;
      currentVesting: undefined;
      vestings: undefined;
    }
);

export const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentVesting, setCurrentVesting] = useState<string>();
  const [vestings, setVestings] = useState<string[]>();
  const [isVestingsLoading, setIsVestingsLoading] = useState<boolean>(true);
  const { active } = useWeb3();

  const { data, isLoading, isValidating, error } = useVestings();

  useEffect(() => {
    if (isLoading) {
      setIsVestingsLoading(true);
      setCurrentVesting(undefined);
      setVestings(undefined);
      return;
    }

    if (!active || !data?.length) {
      setIsVestingsLoading(false);
      setCurrentVesting(undefined);
      setVestings([]);
      return;
    }
    setIsVestingsLoading(false);
    setCurrentVesting(data[0].escrow);
    setVestings(data.map((vesting) => vesting.escrow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    active,
    isLoading,
    isValidating,
    error,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    data?.map((vesting) => vesting.escrow).join(';'),
  ]);

  const value = {
    isVestingsLoading,
    currentVesting,
    setCurrentVesting,
    vestings,
  };

  return (
    <VestingsContext.Provider value={value as VestingsValue}>
      {children}
    </VestingsContext.Provider>
  );
};

export const useVestingsContext = (): VestingsValue =>
  useContext(VestingsContext);
