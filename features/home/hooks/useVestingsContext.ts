import { useContext } from 'react';
import {
  VestingsContext,
  VestingsValue,
} from 'features/home/providers/vestings-provider';

export const useVestingsContext = (): VestingsValue => {
  return useContext(VestingsContext);
};
