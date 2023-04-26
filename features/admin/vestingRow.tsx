import { Button, Loader, Td, Tr } from '@lidofinance/lido-ui';
import { useRevokeUnvested, useVestingIsRevoked } from 'features/vesting';
import { Vesting } from 'features/vesting/types';
import { FC, memo } from 'react';

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
        {isRevokedSWR.isLoading ? (
          <Loader />
        ) : isRevokedSWR.data ? (
          'Revoked'
        ) : (
          'Active'
        )}
      </Td>
      <Td>
        {isRevokedSWR.isLoading ? (
          <Loader />
        ) : (
          <Button
            onClick={revokeUnvested}
            size="xxs"
            color="error"
            variant="outlined"
            disabled={isRevokedSWR.data}
          >
            Revoke
          </Button>
        )}
      </Td>
    </Tr>
  );
});
VestingRow.displayName = 'VestingRow';
