import { Button } from '@lidofinance/lido-ui';
import {
  useAragonDelegateVP,
  useVestingDelegate,
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
  delegateTo: string;
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

  const delegateTo = watch('delegateTo');
  const encodeCalldata = useEncodeAragonDelegationVPCalldata();
  const aragonDelegateVP = useAragonDelegateVP(activeVesting?.escrow);
  const { mutate } = useVestingDelegate(activeVesting?.escrow);

  const runTransaction = useCallback(
    async ({ delegateTo }: AragonFormData) => {
      const callData = await encodeCalldata(delegateTo);
      await aragonDelegateVP(callData);
      await mutate(`delegate-${activeVesting?.escrow}`);
    },
    [encodeCalldata, aragonDelegateVP, mutate, activeVesting?.escrow],
  );

  return (
    <Form onSubmit={handleSubmit(runTransaction)}>
      <InputGroupStyled
        fullwidth
        error={errors.delegateTo?.message?.toString()}
      >
        <InputAddress
          fullwidth
          label="Delegate to"
          error={errors.delegateTo != null}
          disabled={isSubmitting}
          {...register('delegateTo', {
            validate: validateAddressInput(false),
            required: true,
          })}
        />
      </InputGroupStyled>

      <Links>
        <LinkWrapper />
        <LinkWrapper
          isHidden={Boolean(errors.delegateTo?.message || !delegateTo)}
        >
          See typed delegate on{' '}
          <EtherscanLink address={delegateTo || AddressZero}>
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
