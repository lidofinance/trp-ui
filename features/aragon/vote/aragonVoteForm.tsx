import { Button, ToastError } from '@lidofinance/lido-ui';
import { useAragonVote, useVestingsContext } from 'features/vesting';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { InputGroupStyled, InputNumber } from 'shared/ui';
import { useEncodeAragonCalldata } from 'features/votingAdapter';
import { ButtonsGroup, Form, Links, LinkWrapper } from '../aragonFormStyles';
import { useGetVoting } from '../useAragon';
import { VotingLink } from './votingLink';

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

export const AragonVoteForm = () => {
  const { activeVesting } = useVestingsContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors, isSubmitting },
  } = useForm<AragonFormData>({ mode: 'onChange' });

  const voteId = watch('voteId');
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
      /*
       * Search for VotePhase on
       * https://etherscan.io/address/0x72fb5253ad16307b9e773d2a78cac58e309d5ba4#code
       */
      if (success && vote?.phase === 1) {
        ToastError('Voting is in objection phase');
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
          disabled={isSubmitting}
          {...register('voteId', {
            validate: validateVoteId,
            required: true,
          })}
        />
      </InputGroupStyled>

      <Links>
        <LinkWrapper />
        <LinkWrapper isHidden={Boolean(errors.voteId?.message || !voteId)}>
          <VotingLink voteId={voteId}>Check voting info</VotingLink>
        </LinkWrapper>
      </Links>

      <ButtonsGroup>
        {/* this prevents form being submitted by Enter keypress on the input */}
        <Button type="submit" disabled style={{ display: 'none' }} />
        <Button
          type="submit"
          disabled={!isValid}
          color="primary"
          fullwidth
          loading={isSubmitting}
          onClick={handleYesButton}
        >
          Yes
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          color="secondary"
          fullwidth
          loading={isSubmitting}
          onClick={handleNoButton}
        >
          No
        </Button>
        {/* need to register success form value */}
        <input type="hidden" {...register('success')} />
      </ButtonsGroup>
    </Form>
  );
};
