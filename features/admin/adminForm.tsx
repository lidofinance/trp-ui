import { Block, Table, Thead, Th, Tbody, Tr } from '@lidofinance/lido-ui';
import { useVestings } from 'features/vesting';
import { VestingEscrowCreatedEventObject } from 'generated/VestingEscrowFactory';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { VestingFilter } from './adminFormStyles';
import { VestingRow } from './vestingRow';

export const AdminForm = () => {
  const [searchVestings, setSearchVestings] = useState<
    VestingEscrowCreatedEventObject[] | undefined
  >();

  const { data: vestings } = useVestings();
  useEffect(() => {
    setSearchVestings(vestings);
  }, [vestings]);

  const handleFilterSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value.toLowerCase();
      const matchedVestings = vestings?.filter(
        (vesting) =>
          vesting.escrow.toLowerCase().includes(search) ||
          vesting.recipient.toLowerCase().includes(search),
      );
      setSearchVestings(matchedVestings);
    },
    [vestings],
  );

  return (
    <Block>
      <VestingFilter
        fullwidth
        placeholder="0x0"
        label="Escrow or recipient address"
        onChange={handleFilterSearch}
      />
      <div style={{ overflowX: 'scroll' }}>
        <Table style={{ width: '100%' }}>
          <Thead>
            <Tr>
              <Th>Escrow</Th>
              <Th>Recipient</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchVestings?.map((vesting) => (
              <VestingRow key={vesting.escrow} vesting={vesting} />
            ))}
          </Tbody>
        </Table>
      </div>
    </Block>
  );
};
