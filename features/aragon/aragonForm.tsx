import { Button, ToastError } from '@lidofinance/lido-ui';
import { useAragonVote, useVestingsContext } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { EtherscanLink, InputGroupStyled, InputNumber } from 'shared/ui';
import { useEncodeAragonCalldata } from 'features/votingAdapter';
import { ButtonsGroup, Form, VestingInfo } from './aragonFormStyles';
import { useGetVoting } from './useAragon';
import { useWeb3 } from 'reef-knot';
import { WalletConnect } from 'features/walletModal';

type AragonFormData = {
  voteId: string;
  success: boolean;
};

const validateVoteId = (value: string) => {
  const number = parseInt(value);
  if (number.toString() !== value) {
    return 'Must be a number';
  }
  if (number < 0) {
    return 'Must be greater than zero';
  }
  return true;
};

export const AragonForm = () => {
  const { active } = useWeb3();
  const { activeVesting } = useVestingsContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<AragonFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeAragonCalldata();
  const aragonVote = useAragonVote(activeVesting?.escrow);
  const getVoting = useGetVoting();

  const runTransaction = useCallback(
    async ({ voteId, success }: AragonFormData) => {
      const vote = await getVoting(parseInt(voteId));
      if (vote == null) {
        ToastError(`Voting doesn't exists`);
        return;
      }
      if (vote?.open === false) {
        ToastError('Voting is closed');
        return;
      }

      const callData = await encodeCalldata(parseInt(voteId), success);
      await aragonVote(callData);
    },
    [getVoting, encodeCalldata, aragonVote],
  );

  const handleYesButton = useCallback(() => {
    setValue('success', true);
  }, [setValue]);

  const handleNoButton = useCallback(() => {
    setValue('success', false);
  }, [setValue]);

  return (
    <Form onSubmit={handleSubmit(runTransaction)}>
      <InputGroupStyled fullwidth error={errors.voteId?.message?.toString()}>
        <InputNumber
          fullwidth
          label="Vote ID"
          error={errors.voteId != null}
          {...register('voteId', {
            validate: validateVoteId,
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
        <ButtonsGroup>
          {/* this prevents form being submitted by Enter keypress on the input */}
          <Button type="submit" disabled style={{ display: 'none' }} />
          <Button
            type="submit"
            disabled={!isValid}
            color="primary"
            fullwidth
            onClick={handleYesButton}
          >
            For
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            color="secondary"
            fullwidth
            onClick={handleNoButton}
          >
            Against
          </Button>
          {/* need to register success form value */}
          <input type="hidden" {...register('success')} />
        </ButtonsGroup>
      ) : (
        <WalletConnect fullwidth />
      )}
    </Form>
  );
};
