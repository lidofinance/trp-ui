import { FC, PropsWithChildren, ReactNode, useRef } from 'react';
import { SelectIcon, Option } from '@lidofinance/lido-ui';
import AddressBadge from 'components/addressBadge';

import { InputGroupStyled } from '../styles';

type ClaimInputProps = PropsWithChildren<{
  error?: string | ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => unknown;
}>;

export const SelectVesting: FC<ClaimInputProps> = ({
  value,
  error,
  onChange,
  options,
  children,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <InputGroupStyled fullwidth error={error} ref={ref} style={{ zIndex: 3 }}>
      <SelectIcon
        icon={<AddressBadge address={value} symbols={0} />}
        value={value}
        onChange={onChange}
        error={!!error}
        anchorRef={ref}
      >
        {options?.map((vesting, index) => (
          <Option
            key={index}
            leftDecorator={<AddressBadge address={vesting} color="accent" />}
            value={vesting}
          >
            {`Program ${String(index + 1)}`}
          </Option>
        ))}
      </SelectIcon>
      {children}
    </InputGroupStyled>
  );
};