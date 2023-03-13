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
  setCurrentVesting: (vesting: string) => void;
  isClaiming: boolean;
  setIsClaiming: (value: boolean) => void;
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

const VestingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentVesting, setCurrentVesting] = useState<string>();
  const [vestings, setVestings] = useState<string[]>();
  const [isClaiming, setIsClaiming] = useState(false);

  const { data, isLoading } = useVestings();

  useEffect(() => {
    if (!data?.length) {
      return;
    }
    setCurrentVesting(data[0].escrow);
    setVestings(data.map((vesting) => vesting.escrow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.map((vesting) => vesting.escrow).join(';')]);

  const value = useMemo(
    () =>
      ({
        currentVesting,
        vestings,
        setCurrentVesting,
        isClaiming,
        setIsClaiming,
        isVestingsLoading: isLoading,
      } as VestingsValue),
    [currentVesting, isClaiming, isLoading, vestings],
  );

  return (
    <VestingsContext.Provider value={value}>
      {children}
    </VestingsContext.Provider>
  );
};

export default VestingsProvider;
