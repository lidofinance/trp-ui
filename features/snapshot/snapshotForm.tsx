import { Block, Button } from '@lidofinance/lido-ui';
import { useVestingSnapshotDelegate } from 'features/vesting';
import { SelectVesting } from 'features/vesting/selectVesting';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { InputAddress, addressValidator } from 'shared/ui/inputAddress';
import { Form } from './snapshotFormStyles';
import { useVotingAdapter } from './useVotingAdapter';

type SnapshotFormData = {
  delegateAddress: string;
  vestingAddress: string;
};

const validateAddress = addressValidator();

export const SnapshotForm = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const vestingAddress = watch('vestingAddress');
  const { encodeCalldata } = useVotingAdapter();
  const snapshotDelegate = useVestingSnapshotDelegate(vestingAddress);

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
          <Controller
            name="vestingAddress"
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange, name } }) => (
              <SelectVesting
                name={name}
                onChange={onChange}
                error={errors.delegateAddress != null}
              />
            )}
          />
          <InputAddress
            fullwidth
            label="Delegate to address"
            error={errors.delegateAddress != null}
            {...register('delegateAddress', {
              validate: validateAddress,
              required: true,
            })}
          />
          {errors.delegateAddress?.message?.toString()}
        </InputGroupStyled>

        <Button type="submit" disabled={!isValid}>
          Delegate
        </Button>
      </Form>
    </Block>
  );
};
