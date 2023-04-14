import { Block, Button, Input } from '@lidofinance/lido-ui';
import { useVestingsContext } from 'features/vesting';
import { SelectVesting } from 'features/vesting/selectVesting';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { InputGroupStyled } from 'shared/ui';
import { Form } from './snapshotFormStyles';
import { useVotingAdapter } from './useVotingAdapter';

export const SnapshotForm = () => {
  const { vestingAddress } = useVestingsContext();
  const { encodeCalldata } = useVotingAdapter(vestingAddress);

  const [delegateAddress, setDelegateAddress] = useState<string>('');

  const handleAddressChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDelegateAddress(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      console.log({ delegateAddress, vestingAddress });
      encodeCalldata(delegateAddress);
    },
    [delegateAddress, encodeCalldata, vestingAddress],
  );

  return (
    <Block>
      <Form onSubmit={handleSubmit}>
        <InputGroupStyled fullwidth>
          <SelectVesting />
          <Input
            fullwidth
            placeholder="0x0"
            label="Delegate to address"
            onChange={handleAddressChange}
          />
        </InputGroupStyled>

        <Button type="submit">Delegate</Button>
      </Form>
    </Block>
  );
};
