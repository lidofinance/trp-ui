import { Button } from '@lidofinance/lido-ui';
import { useSnapshotDelegate, useVestingsContext } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  EtherscanLink,
  InputGroupStyled,
  validateAddressInput,
} from 'shared/ui';
import { InputAddress } from 'shared/ui/inputAddress';
import { useEncodeSnapshotCalldata } from 'features/votingAdapter';
import { Form, VestingInfo } from './snapshotFormStyles';

type SnapshotFormData = {
  delegateAddress: string;
};

const validateAddress = validateAddressInput();

export const SnapshotForm = () => {
  const { activeVesting } = useVestingsContext();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeSnapshotCalldata();
  const snapshotDelegate = useSnapshotDelegate(activeVesting?.escrow);

  const runTransaction = useCallback(
    async ({ delegateAddress }: SnapshotFormData) => {
      const callData = await encodeCalldata(delegateAddress);
      await snapshotDelegate(callData);
    },
    [encodeCalldata, snapshotDelegate],
  );

  return (
    <Form onSubmit={handleSubmit(runTransaction)}>
      <InputGroupStyled
        fullwidth
        error={errors.delegateAddress?.message?.toString()}
      >
        <InputAddress
          fullwidth
          label="Delegate to address"
          error={errors.delegateAddress != null}
          disabled={isSubmitting}
          {...register('delegateAddress', {
            validate: validateAddress,
            required: true,
          })}
        />
      </InputGroupStyled>

      <VestingInfo>
        See programm on{' '}
        <EtherscanLink address={activeVesting?.escrow}>Etherscan</EtherscanLink>
      </VestingInfo>

      <Button type="submit" disabled={!isValid} loading={isSubmitting}>
        Delegate
      </Button>
    </Form>
  );
};
