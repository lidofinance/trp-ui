import { Block, Button, ToastError } from '@lidofinance/lido-ui';
import { useAragonVote } from 'features/vesting';
import { SelectVesting } from 'features/vesting/selectVesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled, InputNumber } from 'shared/ui';
import { useEncodeAragonCalldata } from 'features/votingAdapter';
import { Form } from './aragonFormStyles';
import { useGetVoting } from './useAragon';

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<AragonFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeAragonCalldata();
  const aragonVote = useAragonVote();
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
    <Block>
      <Form onSubmit={handleSubmit(runTransaction)}>
        <InputGroupStyled fullwidth error={errors.voteId?.message?.toString()}>
          <SelectVesting error={errors.voteId != null} />
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

        <InputGroupStyled fullwidth>
          {/* this prevents form being submitted by Enter keypress on the input */}
          <Button type="submit" disabled style={{ display: 'none' }} />
          <Button
            type="submit"
            disabled={!isValid}
            color="success"
            fullwidth
            onClick={handleYesButton}
          >
            Yes
          </Button>
          <Button
            type="submit"
            disabled={!isValid}
            color="error"
            fullwidth
            onClick={handleNoButton}
          >
            No
          </Button>
          {/* need to register success form value */}
          <input type="hidden" {...register('success')} />
        </InputGroupStyled>
      </Form>
    </Block>
  );
};
