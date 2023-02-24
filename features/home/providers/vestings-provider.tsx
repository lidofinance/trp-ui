import {
  FC,
  createContext,
  useMemo,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Steth, Wsteth } from '@lidofinance/lido-ui';
import { TOKENS } from '@lido-sdk/constants';

import { useVestings } from 'hooks';

export const VestingsContext = createContext({} as VestingsValue);

export const iconsMap = {
  [TOKENS.WSTETH]: <Wsteth />,
  [TOKENS.STETH]: <Steth />,
};

export type VestingsValue = {
  currentVesting?: string;
  vestings?: string[];
  setCurrentVesting: (vesting: string) => void;
  isClaiming: boolean;
  setIsClaiming: (value: boolean) => void;
  isVestingsLoading: boolean;
};

const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentVesting, setCurrentVesting] = useState<string>();
  const [vestings, setVestings] = useState<string[]>();
  const [isClaiming, setIsClaiming] = useState(false);

  const { data, isValidating } = useVestings();

  useEffect(() => {
    if (data && data.length) {
      setCurrentVesting(data[0].escrow);

      const vestings = data.map((vesting) => vesting.escrow);
      setVestings(vestings);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      currentVesting,
      vestings,
      setCurrentVesting,
      isClaiming,
      setIsClaiming,
      isVestingsLoading: isValidating,
    }),
    [currentVesting, isClaiming, isValidating, vestings],
  );

  return (
    <VestingsContext.Provider value={value}>
      {children}
    </VestingsContext.Provider>
  );
};

export default VestingsProvider;
