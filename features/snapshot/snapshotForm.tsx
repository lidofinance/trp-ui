import { Block, Button } from '@lidofinance/lido-ui';
import { useVestingSnapshotDelegate, SelectVesting } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { InputAddress, addressValidator } from 'shared/ui/inputAddress';
import { Form } from './snapshotFormStyles';
import { useVotingEncodeSnapshotCalldata } from './useVotingAdapter';

type SnapshotFormData = {
  delegateAddress: string;
};

const validateAddress = addressValidator();

export const SnapshotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const encodeCalldata = useVotingEncodeSnapshotCalldata();
  const snapshotDelegate = useVestingSnapshotDelegate();

  const runTransaction = useCallback(
    async (data: SnapshotFormData) => {
      const { delegateAddress } = data;
      const callData = await encodeCalldata(delegateAddress);
      await snapshotDelegate(callData);
    },
    [encodeCalldata, snapshotDelegate],
  );

  return (
    <Block>
      <Form onSubmit={handleSubmit(runTransaction)}>
        <InputGroupStyled
          fullwidth
          error={errors.delegateAddress?.message?.toString()}
        >
          <SelectVesting error={errors.delegateAddress != null} />
          <InputAddress
            fullwidth
            label="Delegate to address"
            error={errors.delegateAddress != null}
            {...register('delegateAddress', {
              validate: validateAddress,
              required: true,
            })}
          />
        </InputGroupStyled>

        <Button type="submit" disabled={!isValid}>
          Delegate
        </Button>
      </Form>
    </Block>
  );
};
