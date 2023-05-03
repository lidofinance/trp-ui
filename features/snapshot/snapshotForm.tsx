import { Block, Button } from '@lidofinance/lido-ui';
import { useSnapshotDelegate, SelectVesting } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled } from 'shared/ui';
import { InputAddress, addressValidator } from 'shared/ui/inputAddress';
import { useEncodeSnapshotCalldata } from 'features/votingAdapter';
import { Form } from './snapshotFormStyles';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/walletModal';

type SnapshotFormData = {
  delegateAddress: string;
};

const validateAddress = addressValidator();

export const SnapshotForm = () => {
  const { active } = useWeb3();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeSnapshotCalldata();
  const snapshotDelegate = useSnapshotDelegate();

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

        {active ? (
          <Button type="submit" disabled={!isValid}>
            Delegate
          </Button>
        ) : (
          <WalletConnect fullwidth />
        )}
      </Form>
    </Block>
  );
};
