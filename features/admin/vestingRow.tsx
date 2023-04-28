import { Button, Loader, Td, Tr } from '@lidofinance/lido-ui';
import { useRevokeUnvested, useVestingIsRevoked } from 'features/vesting';
import { Vesting } from 'features/vesting/types';
import { FC, memo, MouseEventHandler } from 'react';

type StatusProps = {
  data?: boolean;
  isLoading: boolean;
};

const Status: FC<StatusProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  return data ? <>Revoked</> : <>Active</>;
};

type ActionProps = {
  data?: boolean;
  isLoading: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Action: FC<ActionProps> = ({ data, isLoading, onClick }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Button
      onClick={onClick}
      size="xxs"
      color="error"
      variant="outlined"
      disabled={data}
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
  const isRevokedSWR = useVestingIsRevoked(vesting.escrow);

  return (
    <Tr>
      <Td>{vesting.escrow}</Td>
      <Td>{vesting.recipient}</Td>
      <Td>
        <Status data={isRevokedSWR.data} isLoading={isRevokedSWR.isLoading} />
      </Td>
      <Td>
        <Action
          data={isRevokedSWR.data}
          isLoading={isRevokedSWR.isLoading}
          onClick={revokeUnvested}
        />
      </Td>
    </Tr>
  );
});
VestingRow.displayName = 'VestingRow';
