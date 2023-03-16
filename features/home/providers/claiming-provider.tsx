import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type ClaimingContextType = {
  isClaiming: boolean;
  setIsClaiming: Dispatch<SetStateAction<boolean>>;
};

export const ClaimingContext = createContext<ClaimingContextType>(
  {} as ClaimingContextType,
);

export const ClaimingProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isClaiming, setIsClaiming] = useState(false);

  return (
    <ClaimingContext.Provider
      value={{
        isClaiming,
        setIsClaiming,
      }}
    >
      {children}
    </ClaimingContext.Provider>
  );
};

export const useClaimingContext = () => useContext(ClaimingContext);
