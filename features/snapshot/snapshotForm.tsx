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
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/walletModal';

type SnapshotFormData = {
  delegateAddress: string;
};

const validateAddress = validateAddressInput();

export const SnapshotForm = () => {
  const { active } = useWeb3();
  const { activeVesting } = useVestingsContext();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SnapshotFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeSnapshotCalldata();
  const snapshotDelegate = useSnapshotDelegate(activeVesting?.escrow);

  const runTransaction = useCallback(
    async (data: SnapshotFormData) => {
      const { delegateAddress } = data;
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
          {...register('delegateAddress', {
            validate: validateAddress,
            required: true,
          })}
        />
      </InputGroupStyled>

      {activeVesting != null && (
        <VestingInfo>
          See programm on{' '}
          <EtherscanLink address={activeVesting.escrow}>
            Etherscan
          </EtherscanLink>
        </VestingInfo>
      )}

      {active ? (
        <Button type="submit" disabled={!isValid}>
          Delegate
        </Button>
      ) : (
        <WalletConnect fullwidth />
      )}
    </Form>
  );
};
