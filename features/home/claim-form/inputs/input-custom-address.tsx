import { Input, Link } from '@lidofinance/lido-ui';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { InputGroupStyled } from '../styles';
import { useSDK } from '@lido-sdk/react';

type Props = {
  error?: string | ReactNode;
  value: string;
  onChange: (value: string) => unknown;
};

const ToggleLink: FC<PropsWithChildren<{ onClick: () => unknown }>> = ({
  children,
  onClick,
}) => (
  <InputGroupStyled fullwidth>
    <Link
      style={{ textAlign: 'right', width: '100%', cursor: 'pointer' }}
      onClick={onClick}
    >
      {children}
    </Link>
  </InputGroupStyled>
);

export const InputCustomAddress: FC<Props> = ({ error, value, onChange }) => {
  const [customizeAddress, setCustomizeAddress] = useState(false);
  const { account } = useSDK();

  if (customizeAddress) {
    return (
      <>
        <InputGroupStyled fullwidth error={error}>
          <Input
            fullwidth
            placeholder="0"
            label="Address"
            value={value}
            onChange={(event) => onChange(event?.currentTarget.value)}
            error={!!error}
          />
        </InputGroupStyled>
        <ToggleLink
          onClick={() => {
            setCustomizeAddress(false);
            onChange('');
          }}
        >
          Use my address
        </ToggleLink>
      </>
    );
  } else {
    return (
      <ToggleLink
        onClick={() => {
          setCustomizeAddress(true);
          if (value === '' && account) {
            onChange(account);
          }
        }}
      >
        Claim to another address
      </ToggleLink>
    );
  }
};
