import { Button, ToastError } from '@lidofinance/lido-ui';
import {
  useAragonDelegate,
  useAragonDelegateAddress,
  useVestingsContext,
} from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  EtherscanLink,
  InputGroupStyled,
  validateAddressInput,
  InputAddress,
} from 'shared/ui';
import { useEncodeAragonDelegationVPCalldata } from 'features/votingAdapter';
import { Form, Links, LinkWrapper } from '../aragonFormStyles';
import { AddressZero } from '@ethersproject/constants';

type AragonFormData = {
  delegateAddress: string;
  success: boolean;
};

export const AragonDelegateForm = () => {
  const { activeVesting } = useVestingsContext();
  const {
    watch,
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<AragonFormData>({ mode: 'onChange' });

  const delegateAddress = watch('delegateAddress');
  const encodeCalldata = useEncodeAragonDelegationVPCalldata();
  const aragonDelegateVP = useAragonDelegate(activeVesting?.escrow);
  const {
    data: delegate,
    isLoading: delegateIsLoading,
    mutate,
  } = useAragonDelegateAddress(activeVesting?.escrow);

  const runTransaction = useCallback(
    async ({ delegateAddress }: AragonFormData) => {
      try {
        const callData = await encodeCalldata(delegateAddress);
        await aragonDelegateVP(callData);
        await mutate(`delegate-${activeVesting?.escrow}`);
      } catch (err) {
        ToastError('Transaction error');
      }
    },
    [encodeCalldata, aragonDelegateVP, mutate, activeVesting?.escrow],
  );

  return (
    <Form onSubmit={handleSubmit(runTransaction)}>
      <InputGroupStyled
        fullwidth
        error={errors.delegateAddress?.message?.toString()}
      >
        <InputAddress
          fullwidth
          label="Delegate to"
          error={errors.delegateAddress != null}
          loading={delegateIsLoading}
          disabled={isSubmitting}
          {...register('delegateAddress', {
            validate: (address) => {
              if (`${address}`.toLowerCase() === `${delegate}`.toLowerCase()) {
                return `You are trying delegate to the current delegate address`;
              }
              return validateAddressInput(false)(address);
            },
            required: true,
          })}
        />
      </InputGroupStyled>

      <Links>
        <div />
        <LinkWrapper
          isHidden={Boolean(
            errors.delegateAddress?.message || !delegateAddress,
          )}
        >
          See input address on{' '}
          <EtherscanLink address={delegateAddress || AddressZero}>
            Etherscan
          </EtherscanLink>
        </LinkWrapper>
      </Links>

      <Button
        type="submit"
        disabled={!isValid}
        fullwidth
        loading={isSubmitting}
      >
        Delegate
      </Button>
    </Form>
  );
};
