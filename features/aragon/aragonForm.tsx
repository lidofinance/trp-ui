import { Block, Button, ToastError } from '@lidofinance/lido-ui';
import { useAragonVote } from 'features/vesting';
import { SelectVesting } from 'features/vesting/selectVesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled, InputNumber } from 'shared/ui';
import { useEncodeAragonCalldata } from 'features/votingAdapter';
import { Form } from './aragonFormStyles';
import { stringToBoolean, stringToNumber } from 'shared/lib';
import { useGetVoting } from './useAragon';

type AragonFormData = {
  voteId: string;
  success: string;
};

const validateVoteId = (value: string) => {
  const number = Number(value);
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
    formState: { isValid, errors },
  } = useForm<AragonFormData>({ mode: 'onChange' });

  const encodeCalldata = useEncodeAragonCalldata();
  const aragonVote = useAragonVote();
  const getVoting = useGetVoting();

  const runTransaction = useCallback(
    async (data: AragonFormData) => {
      const { voteId, success } = data;

      const vote = await getVoting(stringToNumber(voteId));
      if (vote?.open === false) {
        ToastError('Voting is closed');
        return;
      }

      const callData = await encodeCalldata(
        stringToNumber(voteId),
        stringToBoolean(success),
      );
      await aragonVote(callData);
    },
    [getVoting, encodeCalldata, aragonVote],
  );

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
          <Button
            type="submit"
            value="true"
            disabled={!isValid}
            color="success"
            fullwidth
            {...register('success')}
          >
            Yes
          </Button>
          <Button
            type="submit"
            value="false"
            disabled={!isValid}
            color="error"
            fullwidth
            {...register('success')}
          >
            No
          </Button>
        </InputGroupStyled>
      </Form>
    </Block>
  );
};
