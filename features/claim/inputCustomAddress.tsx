import { Input, Link } from '@lidofinance/lido-ui';
import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ClaimAddressToggleStyled, InputGroupStyled } from './styles';
import { useSDK } from '@lido-sdk/react';

type ToggleLinkProps = PropsWithChildren<{ onClick: () => unknown }>;

const ToggleLink: FC<ToggleLinkProps> = ({ children, onClick }) => (
  <ClaimAddressToggleStyled>
    <div />
    <Link style={{ textAlign: 'right', cursor: 'pointer' }} onClick={onClick}>
      {children}
    </Link>
  </ClaimAddressToggleStyled>
);

export type InputCustomAddressProps = {
  error?: string | ReactNode;
  value: string;
  onChange: (value: string) => unknown;
};

export const InputCustomAddress: FC<InputCustomAddressProps> = ({
  error,
  value,
  onChange,
}) => {
  const [customizeAddress, setCustomizeAddress] = useState(false);
  const { account } = useSDK();

  useEffect(() => {
    if (account) {
      onChange(account);
    }
  }, [onChange, account]);

  const handleCustomAddressChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event?.currentTarget.value);
    },
    [onChange],
  );

  const handleUseMyAddress = useCallback(() => {
    setCustomizeAddress(false);
    if (account != null) {
      onChange(account);
    }
  }, [onChange, account]);

  const handleClaimAnotherAddress = useCallback(() => {
    setCustomizeAddress(true);
  }, []);

  if (customizeAddress) {
    return (
      <>
        <InputGroupStyled fullwidth error={error}>
          <Input
            fullwidth
            placeholder="0"
            label="Claim to address"
            value={value}
            onChange={handleCustomAddressChange}
            error={!!error}
          />
        </InputGroupStyled>
        <ToggleLink onClick={handleUseMyAddress}>Use my address</ToggleLink>
      </>
    );
  } else {
    return (
      <ToggleLink onClick={handleClaimAnotherAddress}>
        Claim to another address
      </ToggleLink>
    );
  }
};
