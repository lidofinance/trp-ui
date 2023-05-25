import { Button, Loader, Td, Tr } from '@lidofinance/lido-ui';
import {
  useRevokeUnvested,
  useVestingIsRevoked,
  useVestingLocked,
} from 'features/vesting';
import { Vesting } from 'features/vesting/types';
import { FC, memo, MouseEventHandler } from 'react';

type StatusProps = {
  isRevoked?: boolean;
  isEnded?: boolean;
  isLoading: boolean;
};

const Status: FC<StatusProps> = ({ isRevoked, isEnded, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  if (isEnded) {
    return <>Ended</>;
  }
  if (isRevoked) {
    return <>Revoked</>;
  }
  return <>Active</>;
};

type ActionProps = {
  disabled?: boolean;
  isLoading: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Action: FC<ActionProps> = ({ disabled, isLoading, onClick }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Button
      onClick={onClick}
      size="xxs"
      color="error"
      variant="outlined"
      disabled={disabled}
    >
      Revoke
    </Button>
  );
};

export type VestingRowProps = {
  vesting: Vesting;
};

export const VestingRow: FC<VestingRowProps> = memo(({ vesting }) => {
  const revokeUnvested = useRevokeUnvested(vesting.escrow);
  const { data: isRevoked, isLoading: isRevokedLoading } = useVestingIsRevoked(
    vesting.escrow,
  );
  const { data: locked, isLoading: isLockedLoading } = useVestingLocked(
    vesting.escrow,
  );

  return (
    <Tr>
      <Td>{vesting.escrow}</Td>
      <Td>{vesting.recipient}</Td>
      <Td>
        <Status
          isRevoked={isRevoked}
          isEnded={locked?.isZero()}
          isLoading={isRevokedLoading}
        />
      </Td>
      <Td>
        <Action
          disabled={isRevoked || locked?.isZero()}
          isLoading={isRevokedLoading || isLockedLoading}
          onClick={revokeUnvested}
        />
      </Td>
    </Tr>
  );
});
VestingRow.displayName = 'VestingRow';
