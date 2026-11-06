import { Block, Table, Thead, Th, Tbody, Tr } from '@lidofinance/lido-ui';
import { useVestings } from 'features/vesting';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { VestingFilter } from './adminFormStyles';
import { VestingRow } from './vestingRow';

export const AdminForm = () => {
  const [search, setSearch] = useState('');

  const { data: vestings } = useVestings();
  const searchVestings = useMemo(() => {
    const query = search.toLowerCase();
    return vestings?.filter(
      (vesting) =>
        vesting.escrow.toLowerCase().includes(query) ||
        vesting.recipient.toLowerCase().includes(query),
    );
  }, [vestings, search]);

  const handleFilterSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
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
